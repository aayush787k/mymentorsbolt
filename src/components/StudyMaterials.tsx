import { useEffect, useState } from 'react';
import { FileText, Video, Upload, Trash2, Loader2, Lock, Download } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../lib/auth';
import { useReveal } from '../lib/useReveal';

type Material = {
  id: string;
  title: string;
  description: string | null;
  kind: 'pdf' | 'video';
  file_path: string;
  file_url: string | null;
  created_at: string;
};

export default function StudyMaterials() {
  const { ref, visible } = useReveal();
  const { user } = useAuth();
  const [items, setItems] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // upload form state
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [kind, setKind] = useState<'pdf' | 'video'>('pdf');
  const [file, setFile] = useState<File | null>(null);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('study_materials')
      .select('id, title, description, kind, file_path, file_url, created_at')
      .order('created_at', { ascending: false });
    setItems((data as Material[]) || []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const urlFor = (path: string) =>
    supabase.storage.from('study-materials').getPublicUrl(path).data.publicUrl;

  const upload = async () => {
    if (!user) return;
    if (!title.trim() || !file) return;
    setUploading(true);
    const ext = file.name.split('.').pop() || 'bin';
    const safeTitle = title.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const path = `${user.id}/${Date.now()}-${safeTitle}.${ext}`;
    const { error: upErr } = await supabase.storage
      .from('study-materials')
      .upload(path, file);
    if (upErr) {
      setUploading(false);
      return;
    }
    const { error: dbErr } = await supabase.from('study_materials').insert({
      title: title.trim(),
      description: desc.trim() || null,
      kind,
      file_path: path,
      file_url: urlFor(path),
      uploaded_by: user.id,
    });
    setUploading(false);
    if (dbErr) return;
    setTitle('');
    setDesc('');
    setFile(null);
    setShowForm(false);
    load();
  };

  const remove = async (m: Material) => {
    await supabase.storage.from('study-materials').remove([m.file_path]);
    await supabase.from('study_materials').delete().eq('id', m.id);
    load();
  };

  return (
    <section id="materials" className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div
          ref={ref}
          className={`reveal ${visible ? 'is-visible' : ''} flex flex-wrap items-end justify-between gap-6 mb-12`}
        >
          <div className="max-w-xl">
            <p className="text-xs uppercase tracking-widest text-theme-primary font-semibold mb-3">
              Study Materials
            </p>
            <h2 className="font-display text-4xl sm:text-5xl leading-tight">
              Notes, PDFs & lecture videos — in one place.
            </h2>
            <p className="text-theme-muted mt-4">
              Uploaded by your mentors. Download or stream anytime.
            </p>
          </div>
          {user && (
            <button
              onClick={() => setShowForm((v) => !v)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-theme-primary text-theme-bg font-semibold hover:scale-105 active:scale-95 transition-transform"
            >
              <Upload className="w-4.5 h-4.5" />
              Upload material
            </button>
          )}
        </div>

        {/* Owner upload form */}
        {user && showForm && (
          <div className="mb-8 p-6 rounded-3xl bg-theme-surface border border-theme-border/10">
            <div className="grid sm:grid-cols-2 gap-4">
              <label className="block">
                <span className="block text-xs uppercase tracking-widest text-theme-muted mb-1.5">
                  Title
                </span>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="input"
                  placeholder="e.g. Algebra — Chapter 5"
                />
              </label>
              <label className="block">
                <span className="block text-xs uppercase tracking-widest text-theme-muted mb-1.5">
                  Type
                </span>
                <select
                  value={kind}
                  onChange={(e) => setKind(e.target.value as 'pdf' | 'video')}
                  className="input"
                >
                  <option value="pdf">PDF</option>
                  <option value="video">Video</option>
                </select>
              </label>
              <label className="block sm:col-span-2">
                <span className="block text-xs uppercase tracking-widest text-theme-muted mb-1.5">
                  Description (optional)
                </span>
                <input
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  className="input"
                  placeholder="Short description"
                />
              </label>
              <label className="block sm:col-span-2">
                <span className="block text-xs uppercase tracking-widest text-theme-muted mb-1.5">
                  File {kind === 'pdf' ? '(PDF)' : '(MP4 / WebM)'}
                </span>
                <input
                  type="file"
                  accept={kind === 'pdf' ? 'application/pdf' : 'video/*'}
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="input file:mr-3 file:px-3 file:py-1.5 file:rounded-lg file:border-0 file:bg-theme-primary file:text-theme-bg file:font-semibold file:cursor-pointer"
                />
              </label>
            </div>
            <div className="flex items-center gap-3 mt-5">
              <button
                onClick={upload}
                disabled={uploading || !title.trim() || !file}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-theme-primary text-theme-bg font-semibold disabled:opacity-50 hover:scale-105 active:scale-95 transition-transform"
              >
                {uploading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Upload className="w-4 h-4" />
                )}
                {uploading ? 'Uploading…' : 'Publish'}
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="px-5 py-3 rounded-full border border-theme-border/20 font-medium hover:bg-theme-bg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Locked state for guests */}
        {!user && items.length === 0 && !loading && (
          <div className="p-10 rounded-3xl border border-dashed border-theme-border/20 text-center">
            <Lock className="w-8 h-8 text-theme-muted mx-auto mb-3" />
            <p className="font-display text-2xl mb-1">Sign in to access materials</p>
            <p className="text-theme-muted">
              Students can log in with their mobile number to view and download.
            </p>
          </div>
        )}

        {/* Grid */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-44 rounded-3xl bg-theme-surface border border-theme-border/10 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {items.map((m) => (
              <article
                key={m.id}
                className="group relative p-6 rounded-3xl bg-theme-surface border border-theme-border/10 hover:border-theme-primary/40 hover:-translate-y-1.5 transition-all overflow-hidden"
              >
                <div
                  className={`w-12 h-12 rounded-2xl grid place-items-center mb-5 ${
                    m.kind === 'pdf'
                      ? 'bg-theme-primary-soft text-theme-primary'
                      : 'bg-theme-accent/15 text-theme-accent'
                  }`}
                >
                  {m.kind === 'pdf' ? (
                    <FileText className="w-6 h-6" />
                  ) : (
                    <Video className="w-6 h-6" />
                  )}
                </div>
                <span className="text-xs uppercase tracking-widest text-theme-muted">
                  {m.kind === 'pdf' ? 'PDF Document' : 'Video Lecture'}
                </span>
                <h3 className="font-display text-xl mt-1.5 mb-2 leading-snug">
                  {m.title}
                </h3>
                {m.description && (
                  <p className="text-sm text-theme-muted leading-relaxed mb-5">
                    {m.description}
                  </p>
                )}
                <div className="flex items-center justify-between mt-4">
                  {m.kind === 'pdf' ? (
                    <a
                      href={m.file_url || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-theme-primary"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </a>
                  ) : (
                    <a
                      href={m.file_url || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-theme-primary"
                    >
                      <Video className="w-4 h-4" />
                      Watch
                    </a>
                  )}
                  {user && (
                    <button
                      onClick={() => remove(m)}
                      className="grid place-items-center w-8 h-8 rounded-full text-theme-muted hover:bg-red-500/10 hover:text-red-500 transition-colors"
                      aria-label="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}

        <style>{`
          .input {
            width: 100%;
            padding: 0.75rem 1rem;
            border-radius: 0.75rem;
            background: rgb(var(--c-surface) / 0.7);
            border: 1px solid rgb(var(--c-border) / 0.15);
            color: rgb(var(--c-text));
            font-size: 0.95rem;
            transition: border-color 0.2s, box-shadow 0.2s;
          }
          .input:focus {
            outline: none;
            border-color: rgb(var(--c-primary));
            box-shadow: 0 0 0 3px rgb(var(--c-primary) / 0.15);
          }
        `}</style>
      </div>
    </section>
  );
}
