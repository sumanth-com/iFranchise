/** Desktop-only city labels + connection lines + floating stats around the hero globe. */

/* Positions mapped to India on the hero globe */
const CITIES = [
  { id: 'delhi', label: 'Delhi', x: 50, y: 26 },
  { id: 'mumbai', label: 'Mumbai', x: 42, y: 46 },
  { id: 'hyderabad', label: 'Hyderabad', x: 56, y: 56 },
  { id: 'bangalore', label: 'Bangalore', x: 48, y: 68 },
];

const CONNECTIONS = [
  ['delhi', 'mumbai'],
  ['delhi', 'hyderabad'],
  ['mumbai', 'bangalore'],
  ['hyderabad', 'bangalore'],
  ['mumbai', 'hyderabad'],
];

/** Floating proof pills around the globe */
const FLOAT_PILLS = [
  { id: 'states', label: '17+ states covered', place: 'top' },
  { id: 'cities', label: '37+ Cities Active', place: 'top-mid' },
  { id: 'expansion', label: 'Expansion Score 98%', place: 'top-right' },
  { id: 'match', label: 'Brand ↔ Investor 96% Match', place: 'right' },
  { id: 'brands', label: '100+ franchise brands covered', place: 'bottom-right' },
];

function cityMap() {
  return Object.fromEntries(CITIES.map((c) => [c.id, c]));
}

/**
 * @param {{ isLight?: boolean }} props
 */
export default function HeroNationwidePins({ isLight = false }) {
  const byId = cityMap();

  return (
    <div
      className={`hero-nation-pins pointer-events-none absolute inset-0 z-[4] hidden xl:block ${
        isLight ? 'hero-nation-pins--light' : 'hero-nation-pins--dark'
      }`}
      aria-hidden
    >
      {FLOAT_PILLS.map((pill, i) => (
        <span
          key={pill.id}
          className={`hero-nation-pins__float hero-nation-pins__float--${pill.place}`}
          style={{ animationDelay: `${0.45 + i * 0.2}s` }}
        >
          {pill.label}
        </span>
      ))}

      <div className="hero-nation-pins__stage">
        <svg
          className="hero-nation-pins__svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid meet"
          role="presentation"
        >
          <defs>
            <linearGradient id="hero-nation-line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(196,181,253,0.15)" />
              <stop offset="50%" stopColor="rgba(167,139,250,0.95)" />
              <stop offset="100%" stopColor="rgba(196,181,253,0.15)" />
            </linearGradient>
            <filter id="hero-nation-glow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="1.2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {CONNECTIONS.map(([from, to], i) => {
            const a = byId[from];
            const b = byId[to];
            if (!a || !b) return null;
            return (
              <line
                key={`${from}-${to}`}
                className="hero-nation-pins__line"
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                style={{ animationDelay: `${0.35 + i * 0.12}s` }}
              />
            );
          })}
        </svg>

        {CITIES.map((city, i) => (
          <div
            key={city.id}
            className="hero-nation-pins__city"
            style={{
              left: `${city.x}%`,
              top: `${city.y}%`,
              animationDelay: `${0.2 + i * 0.18}s`,
            }}
          >
            <span className="hero-nation-pins__label">{city.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
