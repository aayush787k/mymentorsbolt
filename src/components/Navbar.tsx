import { useEffect, useState } from 'react';
import { Menu, X, GraduationCap, Check, Palette, ArrowRight } from 'lucide-react';
import { useTheme, THEMES, type ThemeName } from '../lib/theme';

const NAV = [
  { label: 'Pillars', href: '#pillars' },
  { label: 'Why MMT', href: '#why' },
  { label: 'Batches', href: '#batches' },
  { label: 'Mentors', href: '#mentors' },
  { label: 'Results', href: '#results' },
  { label: 'Study Materials', href: '#materials' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({
  onApply,
  onBookDemo,
  onPortal,
}: {
  onApply: () => void;
  onBookDemo: () => void;
  onPortal: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [logoOk, setLogoOk] = useState(true);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-theme-bg/80 backdrop-blur-xl border-b border-theme-border/10'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          {/* Brand logo slot — top-left, with fallback */}
          <a href="#top" className="flex items-center gap-2.5 group">
            {logoOk ? (
              <img
                src="/mymentors-logo.png"
                alt="MYMENTORS logo"
                onError={() => setLogoOk(false)}
                className="h-9 w-auto rounded-lg object-contain"
              />
            ) : (
              <span className="grid place-items-center w-9 h-9 rounded-xl bg-theme-primary text-theme-bg transition-transform group-hover:rotate-6">
                <GraduationCap className="w-5 h-5" strokeWidth={2.4} />
              </span>
            )}
            <span className="font-display text-lg tracking-tight">
              MY<span className="text-theme-primary">MENTORS</span>
            </span>
          </a>

          <ul className="hidden lg:flex items-center gap-8 text-sm font-medium text-theme-muted">
            {NAV.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  className="relative hover:text-theme-text transition-colors after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-px after:bg-theme-primary after:transition-all hover:after:w-full"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={onBookDemo}
              className="px-4 py-2.5 rounded-full border border-theme-border/20 text-sm font-medium hover:bg-theme-surface transition-colors"
            >
              Book Demo
            </button>
            <button
              onClick={onPortal}
              className="px-4 py-2.5 rounded-full border border-theme-border/20 text-sm font-medium hover:bg-theme-surface transition-colors"
            >
              Student Login
            </button>
            <button
              onClick={onApply}
              className="px-5 py-2.5 rounded-full bg-theme-primary text-theme-bg text-sm font-semibold hover:scale-105 active:scale-95 transition-transform"
            >
              Apply Now
            </button>
          </div>

          {/* Top-right hamburger — always visible */}
          <button
            onClick={() => setOpen(true)}
            className="grid place-items-center w-10 h-10 rounded-xl border border-theme-border/15 hover:bg-theme-surface transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </nav>
      </header>

      {/* Responsive sidebar */}
      <div
        className={`fixed inset-0 z-[60] transition-opacity duration-300 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
        <aside
          className={`absolute top-0 right-0 h-full w-[20rem] max-w-[85vw] bg-theme-bg border-l border-theme-border/15 shadow-2xl flex flex-col transition-transform duration-500 ${
            open ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-theme-border/10">
            <span className="font-display text-lg">Menu</span>
            <button
              onClick={() => setOpen(false)}
              className="grid place-items-center w-9 h-9 rounded-full border border-theme-border/15 hover:bg-theme-surface transition-colors"
              aria-label="Close"
            >
              <X className="w-4.5 h-4.5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto no-scrollbar">
            {/* Layout theme customiser container — top of sidebar */}
            <div className="p-5 border-b border-theme-border/10">
              <div className="flex items-center gap-2 mb-3">
                <Palette className="w-4 h-4 text-theme-primary" />
                <p className="text-xs uppercase tracking-widest text-theme-muted font-semibold">
                  Layout Theme
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                {THEMES.map((t) => {
                  const active = theme === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setTheme(t.id as ThemeName)}
                      className={`relative flex items-center gap-2.5 p-3 rounded-2xl border text-left transition-all ${
                        active
                          ? 'border-theme-primary bg-theme-primary-soft'
                          : 'border-theme-border/15 hover:border-theme-primary/40'
                      }`}
                    >
                      <span
                        className="w-7 h-7 rounded-full shrink-0 ring-2 ring-offset-2 ring-offset-theme-bg"
                        style={{
                          backgroundColor: t.swatch,
                          '--tw-ring-color': t.ring,
                        } as React.CSSProperties}
                      />
                      <span className="min-w-0">
                        <span className="block text-xs font-semibold truncate">
                          {t.label}
                        </span>
                        <span className="block text-[10px] text-theme-muted truncate">
                          {t.sub}
                        </span>
                      </span>
                      {active && (
                        <Check className="absolute top-1.5 right-1.5 w-3.5 h-3.5 text-theme-primary" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Nav links */}
            <nav className="p-3">
              {NAV.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="group flex items-center justify-between py-3.5 px-3 rounded-xl text-lg font-medium hover:bg-theme-primary-soft transition-colors"
                >
                  {n.label}
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </a>
              ))}
            </nav>
          </div>

          {/* Footer CTAs */}
          <div className="p-5 border-t border-theme-border/10 space-y-2.5">
            <button
              onClick={() => {
                setOpen(false);
                onPortal();
              }}
              className="w-full py-3 rounded-full border border-theme-border/20 font-semibold hover:bg-theme-surface transition-colors"
            >
              Student Login
            </button>
            <button
              onClick={() => {
                setOpen(false);
                onBookDemo();
              }}
              className="w-full py-3 rounded-full border border-theme-border/20 font-semibold hover:bg-theme-surface transition-colors"
            >
              Book Demo Now
            </button>
            <button
              onClick={() => {
                setOpen(false);
                onApply();
              }}
              className="w-full py-3 rounded-full bg-theme-primary text-theme-bg font-semibold hover:scale-[1.02] active:scale-95 transition-transform"
            >
              Apply Now
            </button>
          </div>
        </aside>
      </div>
    </>
  );
}
