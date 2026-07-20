import { Quote } from 'lucide-react';
import { useReveal } from '../lib/useReveal';

const MENTORS = [
  {
    name: 'Vivek Singh',
    role: 'Founder · MMT',
    bio: 'A decade in Mukherjee Nagar classrooms. Built MMT to make mentorship personal again.',
    photo: '/vivek-singh.png',
  },
  {
    name: 'Sunny Dayal',
    role: 'Senior Faculty · Quant',
    bio: 'Concept + trick methodology. Has guided 1,000+ SSC selections.',
    photo: '',
  },
];

export default function Mentors() {
  const { ref, visible } = useReveal();
  return (
    <section
      id="mentors"
      className="py-24 sm:py-32 bg-theme-surface/40 border-y border-theme-border/10"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div
          ref={ref}
          className={`reveal ${visible ? 'is-visible' : ''} max-w-2xl mb-14`}
        >
          <p className="text-xs uppercase tracking-widest text-theme-primary font-semibold mb-3">
            The people
          </p>
          <h2 className="font-display text-4xl sm:text-5xl leading-tight">
            Learn from people who actually care.
          </h2>
          <p className="text-theme-muted text-lg mt-4">
            Real mentors, real classrooms, real results.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {MENTORS.map((m) => (
            <article
              key={m.name}
              className="group relative p-8 rounded-3xl bg-theme-bg border border-theme-border/10 hover:border-theme-primary/30 transition-all overflow-hidden"
            >
              <div className="flex items-start gap-5">
                {/* Founder avatar — real photo with object-cover fallback */}
                <div className="relative w-24 h-24 rounded-2xl overflow-hidden shrink-0 bg-gradient-to-br from-theme-primary to-theme-accent grid place-items-center text-theme-bg font-display text-2xl">
                  {m.photo ? (
                    <img
                      src={m.photo}
                      alt={m.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display =
                          'none';
                      }}
                    />
                  ) : null}
                  {!m.photo && (
                    <span>
                      {m.name
                        .split(' ')
                        .map((w) => w[0])
                        .join('')}
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="font-display text-2xl">{m.name}</h3>
                  <p className="text-sm text-theme-primary font-medium mb-3">
                    {m.role}
                  </p>
                  <p className="text-theme-muted leading-relaxed">{m.bio}</p>
                </div>
              </div>
              <Quote className="absolute bottom-5 right-6 w-10 h-10 text-theme-border/10 group-hover:text-theme-primary/20 transition-colors" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
