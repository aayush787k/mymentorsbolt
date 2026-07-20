/**
 * Metallic badge — "Don't Fikar, Hai Na MYMENTORS"
 * A brushed-metal effect built purely with CSS gradients + shadows,
 * so it reads on any theme background.
 */
export default function MetalBadge({
  className = '',
}: {
  className?: string;
}) {
  return (
    <div className={`relative inline-flex ${className}`}>
      {/* Outer metallic ring */}
      <div
        className="relative rounded-full px-6 py-2.5 select-none"
        style={{
          background:
            'linear-gradient(145deg, #e8e8ec 0%, #b8b8c0 22%, #6e6e78 48%, #cfcfd6 52%, #8a8a94 78%, #e8e8ec 100%)',
          boxShadow:
            'inset 0 1px 1px rgba(255,255,255,0.9), inset 0 -2px 3px rgba(0,0,0,0.35), 0 6px 18px rgba(0,0,0,0.28), 0 1px 2px rgba(0,0,0,0.4)',
          border: '1px solid rgba(255,255,255,0.35)',
        }}
      >
        {/* Inner embossed plate */}
        <div
          className="rounded-full px-5 py-1.5 flex items-center gap-2"
          style={{
            background:
              'linear-gradient(160deg, #3a3a42 0%, #1c1c22 45%, #2c2c34 55%, #42424c 100%)',
            boxShadow:
              'inset 0 2px 4px rgba(0,0,0,0.7), inset 0 -1px 1px rgba(255,255,255,0.15), inset 0 0 0 1px rgba(255,255,255,0.06)',
          }}
        >
          {/* Brushed-metal sheen sweep */}
          <span
            className="absolute inset-0 rounded-full opacity-40 pointer-events-none mix-blend-overlay"
            style={{
              background:
                'repeating-linear-gradient(95deg, rgba(255,255,255,0) 0px, rgba(255,255,255,0.5) 1px, rgba(255,255,255,0) 2px, rgba(0,0,0,0.15) 3px)',
            }}
          />
          <span
            className="font-display text-sm sm:text-base tracking-wide whitespace-nowrap"
            style={{
              background:
                'linear-gradient(180deg, #ffffff 0%, #d8d8e0 45%, #8a8a92 55%, #f0f0f4 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              textShadow: '0 1px 1px rgba(0,0,0,0.5)',
            }}
          >
            Don't Fikar, Hai Na{' '}
            <span
              style={{
                background:
                  'linear-gradient(180deg, #ffd966 0%, #f59e0b 45%, #b45309 55%, #fbbf24 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              MYMENTORS
            </span>
          </span>
        </div>
      </div>

      {/* Rivets */}
      <span className="absolute -left-0.5 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gradient-to-br from-gray-200 to-gray-700 shadow-inner" />
      <span className="absolute -right-0.5 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gradient-to-br from-gray-200 to-gray-700 shadow-inner" />
    </div>
  );
}
