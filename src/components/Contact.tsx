import { Phone, MessageCircle, Mail, MapPin, Clock } from 'lucide-react';
import { useReveal } from '../lib/useReveal';

export default function Contact() {
  const { ref, visible } = useReveal();
  return (
    <section id="contact" className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-12">
        <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''}`}>
          <p className="text-xs uppercase tracking-widest text-theme-primary font-semibold mb-3">
            Let's talk
          </p>
          <h2 className="font-display text-4xl sm:text-5xl leading-tight mb-6">
            Let's talk about your future.
          </h2>
          <p className="text-theme-muted text-lg leading-relaxed mb-10">
            Reach out on WhatsApp, call us directly, or drop your details — we'll
            reply within 30 minutes.
          </p>

          <div className="space-y-4">
            {[
              { icon: Phone, label: 'Call', value: '+91 98XXX XXXXX' },
              { icon: MessageCircle, label: 'WhatsApp', value: 'Chat instantly' },
              { icon: Mail, label: 'Email', value: 'hello@mymentors.in' },
              { icon: MapPin, label: 'Visit', value: 'Mukherjee Nagar, Delhi' },
              { icon: Clock, label: 'Hours', value: 'Mon–Sat · 7am–9pm' },
            ].map((c) => (
              <div
                key={c.label}
                className="flex items-center gap-4 p-4 rounded-2xl bg-theme-surface border border-theme-border/10 hover:border-theme-primary/30 transition-colors"
              >
                <div className="w-11 h-11 rounded-xl bg-theme-primary-soft text-theme-primary grid place-items-center shrink-0">
                  <c.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-theme-muted">
                    {c.label}
                  </p>
                  <p className="font-medium">{c.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative rounded-3xl overflow-hidden border border-theme-border/10 min-h-[24rem] bg-gradient-to-br from-theme-primary/20 via-theme-accent/15 to-theme-primary/10">
          <div className="absolute inset-0 grid place-items-center p-8 text-center">
            <div>
              <div className="font-display text-3xl mb-3">Mukherjee Nagar</div>
              <p className="text-theme-muted max-w-xs mx-auto">
                The heart of India's coaching ecosystem. Walk in any day for a
                free demo.
              </p>
            </div>
          </div>
          <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-theme-bg/80 backdrop-blur-sm text-xs font-medium">
            Delhi · 110009
          </div>
        </div>
      </div>
    </section>
  );
}
