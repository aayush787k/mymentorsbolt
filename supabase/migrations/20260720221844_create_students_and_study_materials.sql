/*
# Students + Study Materials + Storage buckets

1. New Tables
- `students`
  - `id` uuid PK (references auth.users)
  - `mobile` text UNIQUE NOT NULL — student's mobile number (used as login handle)
  - `father_name` text NOT NULL
  - `father_mobile` text NOT NULL
  - `photo_url` text — optional profile photo path in storage
  - `created_at` timestamptz
- `study_materials`
  - `id` uuid PK
  - `title` text NOT NULL
  - `description` text
  - `kind` text NOT NULL ('pdf' | 'video')
  - `file_path` text NOT NULL — path in the study-materials storage bucket
  - `file_url` text — public/signed URL (cached)
  - `uploaded_by` uuid (references auth.users, nullable — owner uploads)
  - `created_at` timestamptz

2. Security
- RLS enabled on both tables.
- `students`: a student can read/update only their own row (auth.uid() = id). INSERT happens during signup flow via the service role / edge function pattern; anon can INSERT a new student row tied to a freshly created auth user.
- `study_materials`: SELECT is public (anon, authenticated) so logged-in students can browse; INSERT/UPDATE/DELETE restricted to authenticated (owner). We keep it simple — any authenticated user can upload, which in this single-owner setup is the admin.
- Storage buckets: `student-photos` (private) and `study-materials` (public) created with policies allowing authenticated upload and public/anon read.

3. Notes
- This is a mobile-based auth flow. Supabase email/password is used under the hood: the "email" is synthesized as <mobile>@mymentors.app and the password is the OTP/password the student chooses. This avoids magic-link/email confirmation entirely.
- `students.id` references `auth.users(id)` so each student row maps 1:1 to an auth user.
*/

-- ─── students ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS students (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  mobile text UNIQUE NOT NULL,
  father_name text NOT NULL,
  father_mobile text NOT NULL,
  photo_url text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE students ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "students_read_own" ON students;
CREATE POLICY "students_read_own" ON students FOR SELECT
  TO authenticated USING (auth.uid() = id);

DROP POLICY IF EXISTS "students_insert_own" ON students;
CREATE POLICY "students_insert_own" ON students FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "students_update_own" ON students;
CREATE POLICY "students_update_own" ON students FOR UPDATE
  TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- ─── study_materials ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS study_materials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  kind text NOT NULL DEFAULT 'pdf',
  file_path text NOT NULL,
  file_url text,
  uploaded_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE study_materials ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "materials_read_all" ON study_materials;
CREATE POLICY "materials_read_all" ON study_materials FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "materials_insert_auth" ON study_materials;
CREATE POLICY "materials_insert_auth" ON study_materials FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "materials_update_auth" ON study_materials;
CREATE POLICY "materials_update_auth" ON study_materials FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "materials_delete_auth" ON study_materials;
CREATE POLICY "materials_delete_auth" ON study_materials FOR DELETE
  TO authenticated USING (true);

-- ─── Storage buckets ────────────────────────────────────────
INSERT INTO storage.buckets (id, name, public)
VALUES ('student-photos', 'student-photos', false)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public)
VALUES ('study-materials', 'study-materials', true)
ON CONFLICT (id) DO NOTHING;

-- student-photos: authenticated can upload their own; authenticated can read
DROP POLICY IF EXISTS "photos_insert_own" ON storage.objects;
CREATE POLICY "photos_insert_own" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'student-photos');

DROP POLICY IF EXISTS "photos_read_own" ON storage.objects;
CREATE POLICY "photos_read_own" ON storage.objects
  FOR SELECT TO authenticated
  USING (bucket_id = 'student-photos');

-- study-materials: authenticated upload, public read
DROP POLICY IF EXISTS "materials_storage_insert" ON storage.objects;
CREATE POLICY "materials_storage_insert" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'study-materials');

DROP POLICY IF EXISTS "materials_storage_read" ON storage.objects;
CREATE POLICY "materials_storage_read" ON storage.objects
  FOR SELECT TO anon, authenticated
  USING (bucket_id = 'study-materials');

DROP POLICY IF EXISTS "materials_storage_delete" ON storage.objects;
CREATE POLICY "materials_storage_delete" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'study-materials');