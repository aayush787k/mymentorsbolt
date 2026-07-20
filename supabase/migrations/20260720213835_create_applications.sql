/*
# Create applications table (single-tenant, no auth)

1. New Tables
- `applications`
  - `id` (uuid, primary key)
  - `name` (text, not null) — student full name
  - `phone` (text, not null) — contact number
  - `email` (text) — optional email
  - `goal` (text) — selected course/exam goal
  - `message` (text) — optional notes
  - `status` (text, default 'new') — lead status
  - `created_at` (timestamptz, default now())

2. Security
- Enable RLS on `applications`.
- Allow anon + authenticated CRUD: this is a public lead-capture form with no sign-in, so the anon-key client must be able to insert. SELECT/UPDATE/DELETE are also opened for an admin-style single-tenant setup.
*/

CREATE TABLE IF NOT EXISTS applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  email text,
  goal text,
  message text,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_applications" ON applications;
CREATE POLICY "anon_select_applications" ON applications FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_applications" ON applications;
CREATE POLICY "anon_insert_applications" ON applications FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_applications" ON applications;
CREATE POLICY "anon_update_applications" ON applications FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_applications" ON applications;
CREATE POLICY "anon_delete_applications" ON applications FOR DELETE
  TO anon, authenticated USING (true);