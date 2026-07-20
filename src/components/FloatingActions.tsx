import { useState } from 'react';
import { MessageCircle, Phone, CalendarPlus, Sparkles } from 'lucide-react';

export default function FloatingActions({
  onBookDemo,
}: {
  onBookDemo: () => void;
}) {
  const [cracking, setCracking] = useState(false);

  const handleBookDemo = () => {
    setCracking(true);
    window.setTimeout(() => {
      setCracking(false);
      onBookDemo();
    }, 380);
  };

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-40 flex flex-col items-end gap-3">
      {/* WhatsApp — official green, opens new tab */}
      <a
        href="https://wa.me/917290900023"
        target="_blank"
        rel="noopener noreferrer"
        className="relative grid place-items-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 hover:scale-110 active:scale-95 transition-transform"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7" strokeWidth={2} />
        <span className="absolute inset-0 rounded-full border-2 border-[#25D366] animate-ping opacity-20" />
      </a>

      {/* Call Now — triggers native dialer */}
      <a
        href="tel:+917290900023"
        className="grid place-items-center w-14 h-14 rounded-full bg-theme-accent text-white shadow-lg shadow-theme-accent/30 hover:scale-110 active:scale-95 transition-transform"
        aria-label="Call now"
      >
        <Phone className="w-6 h-6" strokeWidth={2} />
      </a>

      {/* Book Demo Now — opens modal with crack animation */}
      <button
        onClick={handleBookDemo}
        className={`group relative grid place-items-center h-14 px-6 rounded-full bg-theme-primary text-theme-bg font-semibold shadow-lg shadow-theme-primary/30 hover:scale-105 active:scale-95 transition-transform overflow-hidden ${
          cracking ? 'animate-crack-out' : ''
        }`}
      >
        <span className="flex items-center gap-2">
          {cracking ? (
            <Sparkles className="w-5 h-5" />
          ) : (
            <CalendarPlus className="w-5 h-5" />
          )}
          Book Demo Now
        </span>
      </button>
    </div>
  );
}
