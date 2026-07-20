import { useEffect, useRef, useState } from 'react';
import {
  X,
  LogIn,
  UserPlus,
  Loader2,
  AlertCircle,
  Camera,
  LogOut,
} from 'lucide-react';
import { useAuth } from '../lib/auth';

type Mode = 'login' | 'signup';

export default function StudentPortal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { user, profile, loading, signUp, signIn, signOut } = useAuth();
  const [mode, setMode] = useState<Mode>('login');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [fatherMobile, setFatherMobile] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

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
        setMode('login');
        setMobile('');
        setPassword('');
        setFatherName('');
        setFatherMobile('');
        setPhoto(null);
        setPhotoPreview(null);
        setError('');
      }, 300);
      return () => clearTimeout(t);
    }
  }, [open]);

  if (!open) return null;

  const onPickPhoto = (f?: File) => {
    if (!f) return;
    setPhoto(f);
    const reader = new FileReader();
    reader.onload = () => setPhotoPreview(reader.result as string);
    reader.readAsDataURL(f);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    if (mode === 'login') {
      const { error } = await signIn({ mobile, password });
      if (error) setError(error);
    } else {
      if (!fatherName.trim() || !fatherMobile.trim()) {
        setError("Father's name and mobile number are required.");
        setBusy(false);
        return;
      }
      const { error } = await signUp({
        mobile,
        password,
        fatherName: fatherName.trim(),
        fatherMobile: fatherMobile.trim(),
        photoFile: photo,
      });
      if (error) setError(error);
    }
    setBusy(false);
  };

  const photoUrl = profile?.photo_url
    ? supabaseUrlFor(profile.photo_url)
    : null;

  function supabaseUrlFor(path: string) {
    // private bucket — use a signed-ish public path fallback; for display we
    // fall back to initials if the URL isn't publicly accessible.
    return `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/student-photos/${path}`;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Shattering shards */}
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
            {/* Logged-in state */}
            {loading ? (
              <div className="py-16 text-center">
                <Loader2 className="w-8 h-8 animate-spin text-theme-primary mx-auto" />
              </div>
            ) : user ? (
              <div className="text-center py-6">
                <div className="w-20 h-20 rounded-full mx-auto mb-4 overflow-hidden bg-gradient-to-br from-theme-primary to-theme-accent grid place-items-center text-theme-bg font-display text-2xl">
                  {photoUrl ? (
                    <img
                      src={photoUrl}
                      alt="You"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display =
                          'none';
                      }}
                    />
                  ) : (
                    <span>
                      {(profile?.mobile || 'S').slice(-2)}
                    </span>
                  )}
                </div>
                <h3 className="font-display text-2xl mb-1">Welcome back!</h3>
                <p className="text-theme-muted mb-1">
                  Mobile: +{profile?.mobile}
                </p>
                <p className="text-theme-muted text-sm mb-6">
                  Father: {profile?.father_name} · +{profile?.father_mobile}
                </p>
                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={onClose}
                    className="px-6 py-3 rounded-full bg-theme-primary text-theme-bg font-semibold hover:scale-105 active:scale-95 transition-transform"
                  >
                    Browse materials
                  </button>
                  <button
                    onClick={async () => {
                      await signOut();
                      onClose();
                    }}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-theme-border/20 font-medium hover:bg-theme-surface transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign out
                  </button>
                </div>
              </div>
            ) : (
              <>
                <p className="text-xs uppercase tracking-widest text-theme-primary font-semibold mb-2">
                  Student Portal
                </p>
                <h3 className="font-display text-3xl leading-tight mb-1">
                  {mode === 'login' ? 'Welcome back.' : 'Create your account.'}
                </h3>
                <p className="text-theme-muted text-sm mb-6">
                  {mode === 'login'
                    ? 'Sign in with your mobile number and password.'
                    : 'Sign up with your mobile number to access materials.'}
                </p>

                {/* Tabs */}
                <div className="grid grid-cols-2 gap-1 p-1 rounded-full bg-theme-surface border border-theme-border/10 mb-6">
                  {(['login', 'signup'] as Mode[]).map((m) => (
                    <button
                      key={m}
                      onClick={() => {
                        setMode(m);
                        setError('');
                      }}
                      className={`flex items-center justify-center gap-1.5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                        mode === m
                          ? 'bg-theme-primary text-theme-bg'
                          : 'text-theme-muted hover:text-theme-text'
                      }`}
                    >
                      {m === 'login' ? (
                        <LogIn className="w-4 h-4" />
                      ) : (
                        <UserPlus className="w-4 h-4" />
                      )}
                      {m === 'login' ? 'Login' : 'Sign Up'}
                    </button>
                  ))}
                </div>

                <form onSubmit={submit} className="space-y-4">
                  {/* Photo upload (signup only, optional) */}
                  {mode === 'signup' && (
                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        onClick={() => fileRef.current?.click()}
                        className="relative w-16 h-16 rounded-full overflow-hidden bg-theme-surface border border-theme-border/20 grid place-items-center hover:border-theme-primary transition-colors shrink-0"
                      >
                        {photoPreview ? (
                          <img
                            src={photoPreview}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Camera className="w-6 h-6 text-theme-muted" />
                        )}
                      </button>
                      <div>
                        <p className="text-sm font-medium">Profile photo</p>
                        <p className="text-xs text-theme-muted">
                          Optional — drop a square or portrait photo.
                        </p>
                      </div>
                      <input
                        ref={fileRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => onPickPhoto(e.target.files?.[0])}
                      />
                    </div>
                  )}

                  <Field label="Mobile number">
                    <input
                      required
                      type="tel"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      className="input"
                      placeholder="+91 7XXXXXXXXX"
                      inputMode="tel"
                    />
                  </Field>

                  {mode === 'signup' && (
                    <>
                      <Field label="Father's name">
                        <input
                          required
                          value={fatherName}
                          onChange={(e) => setFatherName(e.target.value)}
                          className="input"
                          placeholder="Father's full name"
                        />
                      </Field>
                      <Field label="Father's mobile number">
                        <input
                          required
                          type="tel"
                          value={fatherMobile}
                          onChange={(e) => setFatherMobile(e.target.value)}
                          className="input"
                          placeholder="+91 7XXXXXXXXX"
                          inputMode="tel"
                        />
                      </Field>
                    </>
                  )}

                  <Field label={mode === 'login' ? 'Password' : 'Choose a password'}>
                    <input
                      required
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="input"
                      placeholder="••••••••"
                    />
                  </Field>

                  {error && (
                    <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={busy}
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-full bg-theme-primary text-theme-bg font-semibold hover:scale-[1.02] active:scale-95 transition-transform disabled:opacity-60"
                  >
                    {busy ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : mode === 'login' ? (
                      <LogIn className="w-5 h-5" />
                    ) : (
                      <UserPlus className="w-5 h-5" />
                    )}
                    {busy
                      ? 'Please wait…'
                      : mode === 'login'
                      ? 'Login'
                      : 'Create account'}
                  </button>
                </form>

                <p className="text-center text-xs text-theme-muted mt-4">
                  {mode === 'login' ? (
                    <>
                      No account?{' '}
                      <button
                        onClick={() => {
                          setMode('signup');
                          setError('');
                        }}
                        className="text-theme-primary font-semibold"
                      >
                        Sign up
                      </button>
                    </>
                  ) : (
                    <>
                      Already a student?{' '}
                      <button
                        onClick={() => {
                          setMode('login');
                          setError('');
                        }}
                        className="text-theme-primary font-semibold"
                      >
                        Login
                      </button>
                    </>
                  )}
                </p>
              </>
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

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-widest text-theme-muted mb-1.5">
        {label}
      </span>
      {children}
    </label>
  );
}
