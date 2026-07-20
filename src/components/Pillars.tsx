import { BookOpen, Target, Compass, ArrowUpRight } from 'lucide-react';
import { useReveal } from '../lib/useReveal';

const PILLARS = [
  {
    icon: BookOpen,
    tag: 'Foundation',
    title: 'Class 6th to 12th',
    desc: 'CBSE · ICSE · State Board. Concept-first teaching with weekly tests and personalised reports.',
    accent: 'bg-theme-primary',
  },
  {
    icon: Target,
    tag: 'Competition',
    title: 'SSC · Bank · Teaching · Defence',
    desc: 'Complete preparation under expert faculty. Concept + trick, small batches, daily practice.',
    accent: 'bg-theme-accent',
  },
  {
    icon: Compass,
    tag: 'Admission',
    title: 'Online MBA · B.Ed · BCA & more',
    desc: 'Career counselling and university admission guidance — end-to-end, zero stress.',
    accent: 'bg-theme-primary',
  },
];

export default function Pillars() {
  const { ref, visible } = useReveal();
  return (
    <section id="pillars" className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div
          ref={ref}
          className={`reveal ${visible ? 'is-visible' : ''} max-w-2xl mb-14`}
        >
          <p className="text-xs uppercase tracking-widest text-theme-primary font-semibold mb-3">
            What we do
          </p>
          <h2 className="font-display text-4xl sm:text-5xl leading-tight">
            From foundation to selection to admission — everything under one
            roof.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {PILLARS.map((p, i) => (
            <article
              key={p.tag}
              className="group relative p-7 rounded-3xl bg-theme-surface border border-theme-border/10 hover:border-theme-primary/40 transition-all duration-500 hover:-translate-y-1.5 overflow-hidden"
            >
              <div
                className={`absolute -top-12 -right-12 w-40 h-40 rounded-full ${p.accent} opacity-10 group-hover:opacity-20 group-hover:scale-125 transition-all duration-700`}
              />
              <div
                className={`relative w-12 h-12 rounded-2xl ${p.accent} text-theme-bg grid place-items-center mb-6 group-hover:rotate-6 transition-transform`}
              >
                <p.icon className="w-6 h-6" strokeWidth={2.2} />
              </div>
              <p className="text-xs uppercase tracking-widest text-theme-muted mb-2">
                {p.tag}
              </p>
              <h3 className="font-display text-2xl mb-3 leading-tight">
                {p.title}
              </h3>
              <p className="text-theme-muted leading-relaxed mb-6">{p.desc}</p>
              <div className="flex items-center gap-1.5 text-sm font-semibold text-theme-primary">
                Learn more
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
              <span className="absolute bottom-4 right-5 font-display text-6xl text-theme-border/5 select-none">
                0{i + 1}
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
