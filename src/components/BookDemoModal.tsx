import { useEffect, useState, type FormEvent } from 'react';
import { X, CalendarDays, Send, AlertCircle, CheckCircle2 } from 'lucide-react';

const WHATSAPP_NUMBER = '917290900023'; // +91 7290900023

function formatDate(d: Date): string {
  return d.toLocaleDateString('en-US', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export default function BookDemoModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  const today = new Date().toISOString().split('T')[0];

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
        setName('');
        setDate('');
        setError('');
        setDone(false);
      }, 300);
      return () => clearTimeout(t);
    }
  }, [open]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!date) {
      setError('Please pick a preferred session date.');
      return;
    }
    const picked = new Date(date + 'T00:00:00');
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    if (picked < now) {
      setError('Please choose today or a future date.');
      return;
    }

    const pretty = formatDate(picked);
    const text = `Hi, I want to book a demo for ${pretty}${name ? ` — ${name}` : ''}`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

    setDone(true);
    // Open WhatsApp in a new tab
    window.open(url, '_blank', 'noopener,noreferrer');
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
      <div className="relative w-full max-w-lg rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl animate-shatter-in overflow-hidden">
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
              Book Demo Now
            </p>
            <h3 className="font-display text-3xl leading-tight mb-1">
              Get 3 free demo classes.
            </h3>
            <p className="text-theme-muted text-sm mb-7">
              Pick a date and we'll confirm your session on WhatsApp.
            </p>

            {done ? (
              <div className="py-10 text-center">
                <CheckCircle2 className="w-14 h-14 text-theme-primary mx-auto mb-4" />
                <h4 className="font-display text-2xl mb-2">Opening WhatsApp…</h4>
                <p className="text-theme-muted mb-6">
                  We've pre-filled your demo request. Just hit send there to
                  confirm.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-3 rounded-full bg-theme-primary text-theme-bg font-semibold hover:scale-105 active:scale-95 transition-transform"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-5">
                <label className="block">
                  <span className="block text-xs uppercase tracking-widest text-theme-muted mb-1.5">
                    Your name (optional)
                  </span>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input"
                    placeholder="Your name"
                  />
                </label>

                <label className="block">
                  <span className="block text-xs uppercase tracking-widest text-theme-muted mb-1.5">
                    Preferred session date
                  </span>
                  <div className="relative">
                    <CalendarDays className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-theme-primary pointer-events-none" />
                    <input
                      type="date"
                      min={today}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="input pl-11"
                    />
                  </div>
                </label>

                {error && (
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-full bg-theme-primary text-theme-bg font-semibold hover:scale-[1.02] active:scale-95 transition-transform"
                >
                  Submit & open WhatsApp
                  <Send className="w-4 h-4" />
                </button>
                <p className="text-center text-xs text-theme-muted">
                  You'll be redirected to WhatsApp with a pre-filled message.
                </p>
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
