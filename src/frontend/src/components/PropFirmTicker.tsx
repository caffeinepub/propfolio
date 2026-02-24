import { PROP_FIRMS } from '@/constants/propFirms';

export default function PropFirmTicker() {
  // Duplicate the firms array to create seamless loop
  const duplicatedFirms = [...PROP_FIRMS, ...PROP_FIRMS];

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 border-y border-border/50 py-6 shadow-lg animate-fade-in">
      <div className="ticker-wrapper">
        <div className="ticker-content">
          {duplicatedFirms.map((firm, index) => (
            <div
              key={`${firm}-${index}`}
              className="ticker-item inline-flex items-center justify-center px-8 py-3 mx-3 bg-gradient-to-br from-card to-card/80 border-2 border-primary/30 rounded-2xl shadow-lg hover:shadow-glow hover:border-primary/60 hover:scale-110 hover:-translate-y-1 transition-all duration-300 backdrop-blur-sm"
            >
              <span className="text-sm font-bold text-gradient-vibrant whitespace-nowrap">
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
