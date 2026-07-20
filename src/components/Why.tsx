import { useReveal } from '../lib/useReveal';

const REASONS = [
  'Small batch size — every student is seen',
  'Weekly performance reports for parents',
  'Mentors from Mukherjee Nagar, not screen readers',
  'Offline classrooms + live online streams',
  'Concept-first, trick-second methodology',
  '3 free demo classes before admission',
  'Doubt-clearing windows every single day',
  'Career counselling built into the journey',
  'Study material authored in-house',
  'Admission guidance until you get the seat',
];

export default function Why() {
  const { ref, visible } = useReveal();
  return (
    <section id="why" className="py-24 sm:py-32 bg-theme-surface/40 border-y border-theme-border/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-12 gap-12">
        <div
          ref={ref}
          className={`reveal ${visible ? 'is-visible' : ''} lg:col-span-5 lg:sticky lg:top-28 self-start`}
        >
          <p className="text-xs uppercase tracking-widest text-theme-primary font-semibold mb-3">
            Why MMT
          </p>
          <h2 className="font-display text-4xl sm:text-5xl leading-tight mb-6">
            Built for real outcomes, not just lectures.
          </h2>
          <p className="text-theme-muted text-lg leading-relaxed">
            Ten reasons students and parents choose MMT over the rest — and
            stay for the results.
          </p>
          <div className="mt-8 flex items-baseline gap-3">
            <span className="font-display text-6xl text-theme-primary">94</span>
            <span className="text-theme-muted">selection rate, 2025 batch</span>
          </div>
        </div>

        <div className="lg:col-span-7 grid sm:grid-cols-2 gap-3">
          {REASONS.map((r, i) => (
            <div
              key={r}
              className="group flex items-start gap-4 p-5 rounded-2xl border border-theme-border/10 hover:border-theme-primary/30 hover:bg-theme-bg transition-all"
            >
              <span className="font-display text-2xl text-theme-primary/70 group-hover:text-theme-primary transition-colors w-8">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="text-sm leading-relaxed pt-1">{r}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
