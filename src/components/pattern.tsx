import { cn } from "@/lib/utils";

/**
 * Geometrijski motivi: osmokraka zvijezda (khatem) izvedena iz dva
 * preklopljena kvadrata — klasični motiv islamske umjetnosti.
 * Sva "slikovna" grafika na stranici generisana je iz ovih primitiva.
 */

type StarProps = {
  cx: number;
  cy: number;
  size: number;
  rotate?: number;
};

/** Puna osmokraka zvijezda kao <g> element (za upotrebu unutar <svg>). */
export function KhatamFill({ cx, cy, size, rotate = 0 }: StarProps) {
  const half = size / 2;
  return (
    <g transform={`translate(${cx} ${cy}) rotate(${rotate})`}>
      <rect x={-half} y={-half} width={size} height={size} />
      <rect x={-half} y={-half} width={size} height={size} transform="rotate(45)" />
    </g>
  );
}

/** Konturna (isprepletena) osmokraka zvijezda kao <g> element. */
export function KhatamStroke({
  cx,
  cy,
  size,
  rotate = 0,
  strokeWidth = 2,
  opacity = 1,
}: StarProps & { strokeWidth?: number; opacity?: number }) {
  const half = size / 2;
  return (
    <g
      transform={`translate(${cx} ${cy}) rotate(${rotate})`}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      opacity={opacity}
    >
      <rect x={-half} y={-half} width={size} height={size} />
      <rect x={-half} y={-half} width={size} height={size} transform="rotate(45)" />
    </g>
  );
}

/** Mala ukrasna zvijezda za kickere, ornamente i prazna stanja. */
export function StarGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="-12 -12 24 24" aria-hidden className={cn("inline-block", className)} fill="currentColor">
      <rect x="-7.6" y="-7.6" width="15.2" height="15.2" />
      <rect x="-7.6" y="-7.6" width="15.2" height="15.2" transform="rotate(45)" />
    </svg>
  );
}

/**
 * Beskonačna popluna od zvijezda — koristi se kao suptilna tekstura pozadina.
 * Boja dolazi iz `currentColor`, intenzitet preko Tailwind `opacity-*` klase.
 */
export function GeoPattern({
  id,
  className,
  tile = 96,
  starSize = 40,
}: {
  id: string;
  className?: string;
  tile?: number;
  starSize?: number;
}) {
  const half = tile / 2;
  const corners: Array<[number, number]> = [
    [half, half],
    [0, 0],
    [tile, 0],
    [0, tile],
    [tile, tile],
  ];
  return (
    <svg aria-hidden className={cn("pointer-events-none h-full w-full", className)}>
      <defs>
        <pattern id={id} width={tile} height={tile} patternUnits="userSpaceOnUse">
          <g fill="currentColor">
            {corners.map(([x, y]) => (
              <KhatamFill key={`${x}-${y}`} cx={x} cy={y} size={starSize} />
            ))}
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

const ARCH_PATH = "M 28 560 L 28 216 C 28 118 96 62 200 30 C 304 62 372 118 372 216 L 372 560 Z";

/**
 * Dekorativni luk (portal) s geometrijskom ispunom — "slika" herojske sekcije.
 * Zamjenjiv stvarnom fotografijom/kaligrafijom u produkciji.
 */
export function ArchFrame({ className, id = "arch" }: { className?: string; id?: string }) {
  return (
    <svg viewBox="0 0 400 560" className={className} aria-hidden>
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0e4534" />
          <stop offset="100%" stopColor="#05231a" />
        </linearGradient>
        <radialGradient id={`${id}-glow`} cx="50%" cy="28%" r="65%">
          <stop offset="0%" stopColor="#2a8a67" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#2a8a67" stopOpacity="0" />
        </radialGradient>
        <pattern id={`${id}-pat`} width="72" height="72" patternUnits="userSpaceOnUse">
          <g fill="#e0c77e">
            <KhatamFill cx={36} cy={36} size={30} />
            <KhatamFill cx={0} cy={0} size={30} />
            <KhatamFill cx={72} cy={0} size={30} />
            <KhatamFill cx={0} cy={72} size={30} />
            <KhatamFill cx={72} cy={72} size={30} />
          </g>
        </pattern>
        <clipPath id={`${id}-clip`}>
          <path d={ARCH_PATH} />
        </clipPath>
      </defs>

      <path d={ARCH_PATH} fill={`url(#${id}-bg)`} />
      <g clipPath={`url(#${id}-clip)`}>
        <rect width="400" height="560" fill={`url(#${id}-pat)`} opacity="0.06" />
        <rect width="400" height="560" fill={`url(#${id}-glow)`} />
        <g className="text-gold-400" style={{ color: "#cfac55" }}>
          <KhatamStroke cx={200} cy={250} size={150} strokeWidth={1.5} opacity={0.5} />
          <KhatamStroke cx={200} cy={250} size={96} strokeWidth={1.2} opacity={0.32} rotate={22.5} />
        </g>
        <g fill="#cfac55" opacity="0.92">
          <KhatamFill cx={200} cy={250} size={26} />
        </g>
      </g>
      <path d={ARCH_PATH} fill="none" stroke="#cfac55" strokeOpacity="0.65" strokeWidth="2" />
      <path
        d={ARCH_PATH}
        fill="none"
        stroke="#e0c77e"
        strokeOpacity="0.3"
        strokeWidth="1"
        transform="translate(200 295) scale(0.945) translate(-200 -295)"
      />
    </svg>
  );
}

/** Ornamentalni razdjelnik: crta — zvijezda — crta. */
export function OrnamentDivider({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("flex items-center justify-center gap-3", className)}>
      <span className="h-px w-12 bg-line" />
      <StarGlyph className="size-3 text-gold-500" />
      <span className="h-px w-12 bg-line" />
    </div>
  );
}
