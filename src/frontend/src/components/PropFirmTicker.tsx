import { PROP_FIRMS } from '@/constants/propFirms';

export default function PropFirmTicker() {
  // Duplicate the firms array to create seamless loop
  const duplicatedFirms = [...PROP_FIRMS, ...PROP_FIRMS];

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border-y border-border py-4">
      <div className="ticker-wrapper">
        <div className="ticker-content">
          {duplicatedFirms.map((firm, index) => (
            <div
              key={`${firm}-${index}`}
              className="ticker-item inline-flex items-center justify-center px-6 py-2 mx-2 bg-card border border-primary/20 rounded-full shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300"
            >
              <span className="text-sm font-semibold text-foreground whitespace-nowrap">
                {firm}
              </span>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .ticker-wrapper {
          width: 100%;
          overflow: hidden;
        }
        
        .ticker-content {
          display: inline-flex;
          animation: scroll 60s linear infinite;
          will-change: transform;
        }
        
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .ticker-content:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
