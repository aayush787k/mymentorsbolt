import { useReveal } from '../lib/useReveal';

const TESTIMONIALS = [
  {
    quote:
      'The weekly reports and small batch size changed how my daughter studies. Best decision.',
    author: 'Parent · Class 10',
  },
  {
    quote:
      "MMT's SSC batch is next level. Faculty explains concepts + tricks together.",
    author: 'SSC CGL 2025',
  },
  {
    quote:
      'Got my Online MBA admission sorted end-to-end. Zero stress, full support.',
    author: 'Online MBA',
  },
];

export default function Results() {
  const { ref, visible } = useReveal();
  return (
    <section id="results" className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div
          ref={ref}
          className={`reveal ${visible ? 'is-visible' : ''} max-w-2xl mb-14`}
        >
          <p className="text-xs uppercase tracking-widest text-theme-primary font-semibold mb-3">
            Results
          </p>
          <h2 className="font-display text-4xl sm:text-5xl leading-tight">
            Results speak. Loudly.
          </h2>
          <p className="text-theme-muted text-lg mt-4">
            A live snapshot of what our students are achieving this season.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <figure
              key={i}
              className="p-7 rounded-3xl bg-theme-surface border border-theme-border/10 flex flex-col gap-6 hover:-translate-y-1.5 transition-transform"
            >
              <div className="flex gap-0.5 text-theme-primary">
                {'★★★★★'.split('').map((s, k) => (
                  <span key={k}>{s}</span>
                ))}
              </div>
              <blockquote className="text-lg leading-relaxed flex-1">
                "{t.quote}"
              </blockquote>
              <figcaption className="text-sm text-theme-muted font-medium">
                {t.author}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
