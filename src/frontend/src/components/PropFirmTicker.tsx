import { PROP_FIRMS } from '@/constants/propFirms';

export default function PropFirmTicker() {
  const duplicatedFirms = [...PROP_FIRMS, ...PROP_FIRMS];

  return (
    <div className="relative w-full overflow-hidden bg-[#0a192f] border-y border-teal-500/20 py-6">
      <div className="ticker-wrapper">
        <div className="ticker-content">
          {duplicatedFirms.map((firm, index) => (
            <span
              key={index}
              className="ticker-item text-teal-400 font-semibold text-lg px-8"
            >
              {firm}
            </span>
          ))}
        </div>
      </div>
      <style>{`
        .ticker-wrapper {
          width: 100%;
          overflow: hidden;
        }
        .ticker-content {
          display: flex;
          animation: scroll 60s linear infinite;
          width: fit-content;
        }
        .ticker-item {
          white-space: nowrap;
        }
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
