import { useState } from 'react';

interface BrandLogoProps {
  className?: string;
}

/**
 * Renders `/images/anviksha-logo.png` when present in `public/images/`,
 * or a crisp inline botanical-circuit SVG emblem + Fraunces wordmark
 * matching the design system without triggering 404 network errors.
 */
export function BrandLogo({ className = 'h-9 sm:h-10' }: BrandLogoProps) {
  const [imgFailed, setImgFailed] = useState(false);

  if (__HAS_ANVIKSHA_LOGO__ && !imgFailed) {
    return (
      <img
        src="/images/anviksha-logo.png"
        alt="Anviksha Technologies"
        className={`${className} w-auto object-contain`}
        onError={() => setImgFailed(true)}
      />
    );
  }

  return (
    <span className="inline-flex items-center gap-2.5 select-none">
      {/* Botanical Leaf + Circuit Node Emblem matching design-system.md */}
      <svg
        viewBox="0 0 36 36"
        className="h-8 w-8 shrink-0"
        aria-hidden="true"
      >
        {/* Deep Leaf Base (#047A48) */}
        <path
          d="M 6 30 C 5 17, 13 6, 30 5 C 29 21, 19 30, 6 30 Z"
          fill="#047A48"
        />
        {/* Living Upper Leaf Accent (#4CC13B) */}
        <path
          d="M 14 21 C 15 12, 21 7, 30 5 C 28 13, 22 19, 14 21 Z"
          fill="#4CC13B"
        />
        {/* White Circuit Trace & Via Nodes */}
        <path
          d="M 9 27 L 17 19 L 23 13 M 17 19 H 24"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <circle cx="17" cy="19" r="2" fill="#047A48" stroke="#FFFFFF" strokeWidth="1.3" />
        <circle cx="24" cy="19" r="1.8" fill="#047A48" stroke="#FFFFFF" strokeWidth="1.2" />
        <circle cx="23" cy="13" r="1.8" fill="#4CC13B" stroke="#FFFFFF" strokeWidth="1.2" />
      </svg>

      <span className="flex flex-col leading-none">
        <span className="font-display text-[21px] font-medium tracking-[-0.025em] text-[#132219]">
          anviksha
        </span>
        <span className="mt-0.5 font-mono text-[8.5px] font-medium tracking-[0.22em] uppercase text-[#3A3D3B]">
          TECHNOLOGIES
        </span>
      </span>
    </span>
  );
}
