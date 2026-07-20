import { GraduationCap } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-theme-border/10 py-14">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <span className="grid place-items-center w-10 h-10 rounded-xl bg-theme-primary text-theme-bg">
              <GraduationCap className="w-5 h-5" strokeWidth={2.4} />
            </span>
            <div>
              <p className="font-display text-lg">
                MY<span className="text-theme-primary">MENTORS</span>
              </p>
              <p className="text-xs text-theme-muted">
                Don't Fikar, Hai Na MYMENTORS.
              </p>
            </div>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-theme-muted">
            {['Pillars', 'Batches', 'Mentors', 'Results', 'Contact'].map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} className="hover:text-theme-text transition-colors">
                {l}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-10 pt-6 border-t border-theme-border/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-theme-muted">
          <p>© {new Date().getFullYear()} MYMENTORS (MMT). Foundation · Competition · Admission Guidance.</p>
          <p className="italic">In loving memory of Late Capt. R.S. Rathore.</p>
        </div>
      </div>
    </footer>
  );
}
