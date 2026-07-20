import { useReveal } from '../lib/useReveal';

const STEPS = [
  { n: '01', t: 'Enquire', d: 'Drop your details or message us on WhatsApp.' },
  { n: '02', t: 'Demo', d: 'Attend 3 free demo classes — no commitment.' },
  { n: '03', t: 'Counsel', d: 'Get a personalised plan from a mentor.' },
  { n: '04', t: 'Enroll', d: 'Join the batch that fits your goal.' },
];

export default function Process({ onApply }: { onApply: () => void }) {
  const { ref, visible } = useReveal();
  return (
    <section className="py-24 sm:py-32 bg-theme-primary text-theme-bg relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-theme-bg blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-theme-accent blur-[100px]" />
      </div>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative">
        <div
          ref={ref}
          className={`reveal ${visible ? 'is-visible' : ''} max-w-2xl mb-14`}
        >
          <p className="text-xs uppercase tracking-widest opacity-70 font-semibold mb-3">
            How it works
          </p>
          <h2 className="font-display text-4xl sm:text-5xl leading-tight">
            From enquiry to enrollment in 4 steps.
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {STEPS.map((s) => (
            <div
              key={s.n}
              className="p-7 rounded-3xl bg-theme-bg/10 backdrop-blur-sm border border-theme-bg/20 hover:bg-theme-bg/20 transition-colors"
            >
              <span className="font-display text-5xl opacity-50">{s.n}</span>
              <h3 className="font-display text-2xl mt-4">{s.t}</h3>
              <p className="opacity-80 mt-2 leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>

        <button
          onClick={onApply}
          className="mt-12 inline-flex items-center gap-2 px-7 py-4 rounded-full bg-theme-bg text-theme-primary font-semibold hover:scale-105 active:scale-95 transition-transform"
        >
          Start with 3 free demo classes
        </button>
      </div>
    </section>
  );
}
