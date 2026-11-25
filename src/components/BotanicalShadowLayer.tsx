import { useId } from 'react';

export interface BotanicalShadowLayerProps {
  /**
   * Controls canopy silhouette placement.
   * - `hero`: Asymmetric upper-right and lower-left greenhouse gobo shadows
   * - `section`: Subtle corner canopy cast for mid-page sections
   * - `corner`: Single upper-right leaf-cluster shadow
   */
  variant?: 'hero' | 'section' | 'corner';
  /** Deep-green cast opacity between 0.05 and 0.08 (default 0.06) */
  opacity?: number;
  className?: string;
}

/**
 * Renders soft-blurred organic leaf-canopy cast shadows (gobo effect)
 * simulating filtered greenhouse sunlight on an alabaster drafting surface.
 */
export function BotanicalShadowLayer({
  variant = 'hero',
  opacity = 0.06,
  className = '',
}: BotanicalShadowLayerProps) {
  const filterId = useId();
  const clampedOpacity = Math.min(0.08, Math.max(0.05, opacity));
  const fill = `rgba(4, 57, 34, ${clampedOpacity})`;
  const secondaryFill = `rgba(4, 57, 34, ${(clampedOpacity * 0.78).toFixed(4)})`;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden select-none mix-blend-multiply ${className}`}
    >
      {/* Primary upper-right canopy cluster with generous blur margin */}
      <svg
        viewBox="0 0 800 700"
        fill="none"
        className="botanical-drift-primary absolute -top-28 -right-28 h-[460px] w-[540px] sm:h-[600px] sm:w-[700px]"
      >
        <defs>
          <filter id={`${filterId}-blur-lg`} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="26" />
          </filter>
        </defs>
        <g filter={`url(#${filterId}-blur-lg)`}>
          {/* Elongated primary botanical leaf */}
          <path
            d="M540 90 C618 136, 680 230, 648 334 C612 444, 488 502, 412 464 C354 434, 366 314, 422 222 C464 150, 502 110, 540 90 Z"
            fill={fill}
          />
          {/* Secondary overlapping lanceolate leaf */}
          <path
            d="M386 68 C456 96, 498 188, 466 274 C436 356, 340 402, 282 372 C232 344, 244 240, 294 162 C328 108, 356 80, 386 68 Z"
            fill={secondaryFill}
          />
          {/* Slender stem-side frond */}
          <path
            d="M668 250 C712 296, 720 380, 666 450 C614 516, 514 536, 476 498 C446 468, 480 390, 540 328 C588 280, 636 254, 668 250 Z"
            fill={secondaryFill}
          />
        </g>
      </svg>

      {/* Secondary lower-left canopy shadow (rendered for hero & section variants) */}
      {variant !== 'corner' && (
        <svg
          viewBox="0 0 640 560"
          fill="none"
          className="botanical-drift-secondary absolute -bottom-28 -left-28 h-[360px] w-[440px] sm:h-[460px] sm:w-[540px]"
        >
          <defs>
            <filter id={`${filterId}-blur-sm`} x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="22" />
            </filter>
          </defs>
          <g filter={`url(#${filterId}-blur-sm)`}>
            <path
              d="M140 440 C86 384, 74 282, 128 206 C184 128, 300 102, 358 148 C406 186, 378 290, 316 364 C262 428, 186 464, 140 440 Z"
              fill={secondaryFill}
            />
            <path
              d="M266 476 C232 436, 240 356, 294 298 C348 240, 436 226, 472 264 C504 296, 472 378, 416 430 C366 476, 298 494, 266 476 Z"
              fill={fill}
            />
          </g>
        </svg>
      )}
    </div>
  );
}
