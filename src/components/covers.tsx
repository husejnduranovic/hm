import { cn, hashString } from "@/lib/utils";
import { KhatamFill, KhatamStroke } from "@/components/pattern";

/**
 * Generisane naslovne "slike" — deterministična geometrijska kompozicija
 * izvedena iz sluga teksta i boje tematske cjeline. U produkciji ih po
 * želji mijenja stvarna fotografija (dovoljno je zamijeniti ovu komponentu).
 */

function CoverPattern({ id }: { id: string }) {
  return (
    <pattern id={id} width="84" height="84" patternUnits="userSpaceOnUse">
      <g fill="#f7eed3">
        <KhatamFill cx={42} cy={42} size={34} />
        <KhatamFill cx={0} cy={0} size={34} />
        <KhatamFill cx={84} cy={0} size={34} />
        <KhatamFill cx={0} cy={84} size={34} />
        <KhatamFill cx={84} cy={84} size={34} />
      </g>
    </pattern>
  );
}

export function ArticleCover({
  seed,
  color,
  colorDeep,
  className,
}: {
  seed: string;
  color: string;
  colorDeep: string;
  className?: string;
}) {
  const h = hashString(seed);
  const rotate = (h % 61) - 30;
  const starX = 540 + (h % 180);
  const starY = 120 + (h % 160);
  const starSize = 210 + (h % 100);
  const patId = `cov-${seed}`;

  return (
    <svg
      viewBox="0 0 800 500"
      preserveAspectRatio="xMidYMid slice"
      className={cn("h-full w-full", className)}
      aria-hidden
    >
      <defs>
        <linearGradient id={`${patId}-g`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor={colorDeep} />
        </linearGradient>
        <CoverPattern id={`${patId}-p`} />
      </defs>
      <rect width="800" height="500" fill={`url(#${patId}-g)`} />
      <rect width="800" height="500" fill={`url(#${patId}-p)`} opacity="0.09" />
      <circle cx={150 + (h % 120)} cy="430" r="250" fill="#ffffff" opacity="0.05" />
      <g style={{ color: "#f7eed3" }}>
        <KhatamStroke cx={starX} cy={starY} size={starSize} rotate={rotate} strokeWidth={2.5} opacity={0.3} />
        <KhatamStroke
          cx={starX}
          cy={starY}
          size={starSize * 0.62}
          rotate={rotate + 22.5}
          strokeWidth={2}
          opacity={0.18}
        />
      </g>
      <g fill="#f7eed3" opacity="0.4">
        <KhatamFill cx={110 + (h % 80)} cy={100 + (h % 60)} size={24} rotate={rotate} />
      </g>
    </svg>
  );
}

export function VideoCover({ seed, className }: { seed: string; className?: string }) {
  const h = hashString(seed);
  const rotate = (h % 45) - 22;
  const patId = `vid-${seed}`;

  return (
    <svg
      viewBox="0 0 800 450"
      preserveAspectRatio="xMidYMid slice"
      className={cn("h-full w-full", className)}
      aria-hidden
    >
      <defs>
        <linearGradient id={`${patId}-g`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0e4534" />
          <stop offset="100%" stopColor="#05231a" />
        </linearGradient>
        <CoverPattern id={`${patId}-p`} />
        <radialGradient id={`${patId}-glow`} cx="50%" cy="42%" r="70%">
          <stop offset="0%" stopColor="#2a8a67" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#2a8a67" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="450" fill={`url(#${patId}-g)`} />
      <rect width="800" height="450" fill={`url(#${patId}-p)`} opacity="0.07" />
      <rect width="800" height="450" fill={`url(#${patId}-glow)`} />
      <g style={{ color: "#cfac55" }}>
        <KhatamStroke cx={620 + (h % 90)} cy={110 + (h % 90)} size={230} rotate={rotate} strokeWidth={2} opacity={0.35} />
        <KhatamStroke cx={140 - (h % 60)} cy={360} size={160} rotate={rotate + 22.5} strokeWidth={1.5} opacity={0.2} />
      </g>
    </svg>
  );
}
