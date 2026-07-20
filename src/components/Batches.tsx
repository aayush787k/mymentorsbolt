import { useState } from 'react';
import { Clock, Users, Wifi, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { useReveal } from '../lib/useReveal';

const BATCHES = [
  { name: 'Class 10 CBSE — All Subjects', mode: 'Offline', slots: 8, starts: 'Apr' },
  { name: 'Class 12 Science PCM', mode: 'Offline', slots: 6, starts: 'Apr' },
  { name: 'SSC CGL 2026 Complete', mode: 'Hybrid', slots: 14, starts: 'May' },
  { name: 'IBPS Bank PO / Clerk', mode: 'Online', slots: 20, starts: 'Jun' },
  { name: 'CTET / HTET / UPTET Combo', mode: 'Hybrid', slots: 11, starts: 'Jul' },
  { name: 'Online MBA Admission Support', mode: 'Online', slots: 9, starts: 'Rolling' },
  { name: 'B.Ed Distance Admission', mode: 'Online', slots: 5, starts: 'Rolling' },
  { name: 'Spoken English & Personality', mode: 'Offline', slots: 12, starts: 'May' },
];

export default function Batches({ onApply }: { onApply: () => void }) {
  const { ref, visible } = useReveal();
  const [idx, setIdx] = useState(0);
  const perView = 3;
  const max = Math.max(0, BATCHES.length - perView);

  return (
    <section id="batches" className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div
          ref={ref}
          className={`reveal ${visible ? 'is-visible' : ''} flex flex-wrap items-end justify-between gap-6 mb-12`}
        >
          <div className="max-w-xl">
            <p className="text-xs uppercase tracking-widest text-theme-primary font-semibold mb-3">
              Active batches
            </p>
            <h2 className="font-display text-4xl sm:text-5xl leading-tight">
              Enroll in a batch that fits your goal.
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIdx((v) => Math.max(0, v - 1))}
              disabled={idx === 0}
              className="grid place-items-center w-11 h-11 rounded-full border border-theme-border/20 disabled:opacity-30 hover:bg-theme-primary hover:text-theme-bg hover:border-theme-primary transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIdx((v) => Math.min(max, v + 1))}
              disabled={idx === max}
              className="grid place-items-center w-11 h-11 rounded-full border border-theme-border/20 disabled:opacity-30 hover:bg-theme-primary hover:text-theme-bg hover:border-theme-primary transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="overflow-hidden">
          <div
            className="flex gap-5 transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${idx * (100 / perView)}%)` }}
          >
            {BATCHES.map((b) => (
              <div
                key={b.name}
                className="min-w-[calc(33.333%-1.333rem)] sm:min-w-[calc(33.333%-1.333rem)] min-w-[85%] sm:min-w-[calc(33.333%-1.333rem)] group relative p-7 rounded-3xl bg-theme-surface border border-theme-border/10 hover:border-theme-primary/40 transition-all overflow-hidden"
                style={{ minWidth: 'calc(33.333% - 1.333rem)' }}
              >
                <div className="flex items-center justify-between mb-6">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                      b.mode === 'Offline'
                        ? 'bg-theme-primary-soft text-theme-primary'
                        : b.mode === 'Online'
                        ? 'bg-theme-accent/15 text-theme-accent'
                        : 'bg-theme-text/10 text-theme-text'
                    }`}
                  >
                    {b.mode === 'Online' ? (
                      <Wifi className="w-3 h-3" />
                    ) : b.mode === 'Offline' ? (
                      <MapPin className="w-3 h-3" />
                    ) : (
                      <Users className="w-3 h-3" />
                    )}
                    {b.mode}
                  </span>
                  <span className="text-xs text-theme-muted flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {b.starts}
                  </span>
                </div>
                <h3 className="font-display text-xl leading-snug mb-8 min-h-[3.5rem]">
                  {b.name}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-theme-muted">
                    {b.slots} seats left
                  </span>
                  <button
                    onClick={onApply}
                    className="px-4 py-2 rounded-full bg-theme-bg border border-theme-border/20 text-sm font-semibold hover:bg-theme-primary hover:text-theme-bg hover:border-theme-primary transition-colors"
                  >
                    Enroll
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
