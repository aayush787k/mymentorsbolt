import { ArrowUpRight, Sparkles, Star, CalendarPlus } from 'lucide-react';
import MetalBadge from './MetalBadge';

export default function Hero({
  onApply,
  onBookDemo,
}: {
  onApply: () => void;
  onBookDemo: () => void;
}) {
  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden"
    >
      {/* Ambient gradient blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-20 -left-20 w-[36rem] h-[36rem] rounded-full bg-theme-primary/20 blur-[120px] animate-float-up" />
        <div
          className="absolute top-40 -right-32 w-[32rem] h-[32rem] rounded-full bg-theme-accent/20 blur-[120px] animate-float-up"
          style={{ animationDelay: '2s' }}
        />
        <div
          className="absolute bottom-0 left-1/3 w-[28rem] h-[28rem] rounded-full bg-theme-primary/10 blur-[100px] animate-float-up"
          style={{ animationDelay: '4s' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 w-full grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7 space-y-7">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-theme-border/15 bg-theme-surface/60 backdrop-blur-sm text-xs font-medium text-theme-muted">
            <Sparkles className="w-3.5 h-3.5 text-theme-primary" />
            India's growing learning platform
            <span className="w-1 h-1 rounded-full bg-theme-primary" />
            Est. Mukherjee Nagar
          </div>

          <h1 className="font-display text-5xl sm:text-7xl lg:text-[5.5rem] leading-[0.95] tracking-tight">
            Three pillars.
            <br />
            <span className="text-theme-primary">One</span> platform.
            <br />
            Every <em className="not-italic relative">
              student
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 200 12"
                fill="none"
              >
                <path
                  d="M2 9C40 3 160 3 198 9"
                  stroke="currentColor"
                  strokeWidth="3"
                  className="text-theme-accent"
                  strokeLinecap="round"
                />
              </svg>
            </em>
            .
          </h1>

          <p className="text-lg text-theme-muted max-w-xl leading-relaxed">
            Foundation, competition and admission guidance — from Class 6 to
            university. Built by mentors who actually care, in classrooms that
            actually work.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onApply}
              className="group inline-flex items-center gap-2 px-7 py-4 rounded-full bg-theme-primary text-theme-bg font-semibold hover:scale-[1.03] active:scale-95 transition-transform"
            >
              Apply Now
              <ArrowUpRight className="w-4.5 h-4.5 group-hover:rotate-45 transition-transform" />
            </button>
            <button
              onClick={onBookDemo}
              className="group inline-flex items-center gap-2 px-7 py-4 rounded-full border border-theme-border/20 font-medium hover:bg-theme-surface transition-colors"
            >
              <CalendarPlus className="w-4.5 h-4.5" />
              Book Demo
            </button>
            <a
              href="#pillars"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full border border-theme-border/20 font-medium hover:bg-theme-surface transition-colors"
            >
              Explore pillars
            </a>
          </div>

          <div className="flex items-center gap-6 pt-4">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-9 h-9 rounded-full border-2 border-theme-bg bg-theme-primary-soft grid place-items-center text-xs font-bold text-theme-primary"
                >
                  {['A', 'R', 'S', 'M'][i - 1]}
                </div>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-0.5 text-theme-primary">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <p className="text-xs text-theme-muted mt-0.5">
                2,400+ students guided this year
              </p>
            </div>
          </div>

          <MetalBadge className="pt-2" />
        </div>

        {/* Right visual — stacked editorial cards */}
        <div className="lg:col-span-5 relative h-[30rem] sm:h-[34rem] hidden lg:block">
          <div className="absolute top-0 right-8 w-64 h-72 rounded-3xl bg-theme-primary text-theme-bg p-6 flex flex-col justify-between shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
            <span className="text-xs uppercase tracking-widest opacity-80">
              Foundation
            </span>
            <div>
              <p className="font-display text-3xl leading-tight">Class 6–12</p>
              <p className="text-sm opacity-80 mt-1">CBSE · ICSE · State</p>
            </div>
          </div>

          <div
            className="absolute top-24 left-0 w-64 h-72 rounded-3xl bg-theme-surface border border-theme-border/15 p-6 flex flex-col justify-between shadow-xl -rotate-3 hover:rotate-0 transition-transform duration-500"
            style={{ animationDelay: '0.2s' }}
          >
            <span className="text-xs uppercase tracking-widest text-theme-muted">
              Competition
            </span>
            <div>
              <p className="font-display text-3xl leading-tight">SSC · Bank</p>
              <p className="text-sm text-theme-muted mt-1">
                Teaching · Defence
              </p>
            </div>
          </div>

          <div className="absolute bottom-0 right-0 w-64 h-64 rounded-3xl bg-theme-accent text-white p-6 flex flex-col justify-between shadow-2xl rotate-6 hover:rotate-0 transition-transform duration-500">
            <span className="text-xs uppercase tracking-widest opacity-80">
              Admission
            </span>
            <div>
              <p className="font-display text-3xl leading-tight">MBA · B.Ed</p>
              <p className="text-sm opacity-80 mt-1">University guidance</p>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee strip */}
      <div className="absolute bottom-0 inset-x-0 border-y border-theme-border/10 bg-theme-surface/40 backdrop-blur-sm py-3 overflow-hidden">
        <div className="flex gap-10 animate-marquee whitespace-nowrap text-sm font-medium text-theme-muted">
          {[...Array(2)].map((_, k) => (
            <div key={k} className="flex gap-10">
              {[
                'CBSE',
                'ICSE',
                'State Board',
                'SSC CGL',
                'IBPS PO',
                'CTET',
                'HTET',
                'UPTET',
                'Online MBA',
                'B.Ed',
                'BCA',
                'Spoken English',
                'Defence',
              ].map((t) => (
                <span key={t} className="flex items-center gap-3">
                  {t}
                  <span className="w-1.5 h-1.5 rounded-full bg-theme-primary/60" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
