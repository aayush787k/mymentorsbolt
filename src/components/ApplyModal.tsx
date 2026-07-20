import { useEffect, useState, type FormEvent } from 'react';
import { X, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

const GOALS = [
  'Class 6–12 (CBSE/ICSE/State)',
  'SSC CGL',
  'IBPS Bank PO / Clerk',
  'CTET / HTET / UPTET',
  'Defence',
  'Online MBA',
  'B.Ed Distance',
  'BCA / BBA',
  'Spoken English & Personality',
  'Not sure — need counselling',
];

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function ApplyModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [form, setForm] = useState({ name: '', phone: '', email: '', goal: GOALS[0], message: '' });

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      const t = setTimeout(() => {
        setStatus('idle');
        setForm({ name: '', phone: '', email: '', goal: GOALS[0], message: '' });
      }, 300);
      return () => clearTimeout(t);
    }
  }, [open]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');
    const { error } = await supabase.from('applications').insert({
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim() || null,
      goal: form.goal,
      message: form.message.trim() || null,
    });
    if (error) {
      setStatus('error');
      setErrorMsg(error.message);
    } else {
      setStatus('success');
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Shattering shards overlay */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="relative w-full max-w-lg h-80">
          {[...Array(12)].map((_, i) => {
            const angle = (i / 12) * Math.PI * 2;
            const dist = 200 + Math.random() * 120;
            return (
              <div
                key={i}
                className="absolute top-1/2 left-1/2 w-8 h-8 bg-theme-primary/30 rounded-sm animate-shard-fly"
                style={{
                  '--tx': `${Math.cos(angle) * dist}px`,
                  '--ty': `${Math.sin(angle) * dist}px`,
                  '--tr': `${Math.random() * 720 - 360}deg`,
                  animationDelay: `${i * 0.02}s`,
                } as React.CSSProperties}
              />
            );
          })}
        </div>
      </div>

      {/* Glass modal */}
      <div
        className="relative w-full max-w-lg rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl animate-shatter-in overflow-hidden"
        style={{ color: 'rgb(var(--c-text))' }}
      >
        {/* Inner surface for readability */}
        <div className="relative bg-theme-bg/85 backdrop-blur-xl rounded-3xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 grid place-items-center w-9 h-9 rounded-full bg-theme-border/10 hover:bg-theme-primary hover:text-theme-bg transition-colors"
            aria-label="Close"
          >
            <X className="w-4.5 h-4.5" />
          </button>

          <div className="p-7 sm:p-9">
            <p className="text-xs uppercase tracking-widest text-theme-primary font-semibold mb-2">
              Student Application
            </p>
            <h3 className="font-display text-3xl leading-tight mb-1">
              Begin your journey.
            </h3>
            <p className="text-theme-muted text-sm mb-7">
              Fill this in and a mentor will reach out within 30 minutes.
            </p>

            {status === 'success' ? (
              <div className="py-10 text-center">
                <CheckCircle2 className="w-14 h-14 text-theme-primary mx-auto mb-4" />
                <h4 className="font-display text-2xl mb-2">Application received!</h4>
                <p className="text-theme-muted mb-6">
                  We've got your details. A mentor will call you shortly.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-3 rounded-full bg-theme-primary text-theme-bg font-semibold hover:scale-105 active:scale-95 transition-transform"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-4">
                <Field label="Full name">
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="input"
                    placeholder="Your name"
                  />
                </Field>

                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Phone">
                    <input
                      required
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="input"
                      placeholder="+91 ..."
                    />
                  </Field>
                  <Field label="Email (optional)">
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="input"
                      placeholder="you@email.com"
                    />
                  </Field>
                </div>

                <Field label="I'm interested in">
                  <select
                    value={form.goal}
                    onChange={(e) => setForm({ ...form, goal: e.target.value })}
                    className="input"
                  >
                    {GOALS.map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </Field>

                <Field label="Anything else? (optional)">
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="input resize-none"
                    rows={3}
                    placeholder="Tell us about your goal..."
                  />
                </Field>

                {status === 'error' && (
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {errorMsg || 'Something went wrong. Please try again.'}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-full bg-theme-primary text-theme-bg font-semibold hover:scale-[1.02] active:scale-95 transition-transform disabled:opacity-60"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit application
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

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
        .input::placeholder { color: rgb(var(--c-muted) / 0.7); }
      `}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-widest text-theme-muted mb-1.5">
        {label}
      </span>
      {children}
    </label>
  );
}
