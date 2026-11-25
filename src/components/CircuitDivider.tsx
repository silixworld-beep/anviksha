export interface CircuitDividerProps {
  /** Monospace section index, e.g. "01" */
  index?: string;
  /** Section label displayed in tracked uppercase monospace */
  label: string;
  /** Optional alignment of the label along the trace */
  align?: 'left' | 'center';
  className?: string;
}

/**
 * Architectural 1px sage hairline divider with hollow circular via nodes
 * and a monospace section index, echoing the trace-and-node geometry
 * of the Anviksha mark.
 */
export function CircuitDivider({
  index,
  label,
  align = 'left',
  className = '',
}: CircuitDividerProps) {
  const formattedLabel = index ? `${index} / ${label}` : label;

  return (
    <div
      className={`flex w-full items-center gap-3 select-none ${className}`}
      role="separator"
      aria-label={formattedLabel}
    >
      {/* Left trace + via node */}
      <div
        className={`flex items-center ${
          align === 'center' ? 'flex-1' : 'w-6 sm:w-10 shrink-0'
        }`}
      >
        <span
          className="h-[5px] w-[5px] shrink-0 rounded-full border-[1.5px] border-[#047A48] bg-[#F7F9F5]"
          aria-hidden="true"
        />
        <span className="h-px flex-1 bg-[#D4E1D1]" aria-hidden="true" />
        <span
          className="h-[5px] w-[5px] shrink-0 rounded-full border-[1.5px] border-[#047A48] bg-[#F7F9F5]"
          aria-hidden="true"
        />
      </div>

      {/* Monospace section index label */}
      <span className="font-mono text-[11px] font-medium tracking-[0.14em] uppercase text-[#47584E] whitespace-nowrap">
        {formattedLabel}
      </span>

      {/* Right extending trace + terminal via node */}
      <div className="flex flex-1 items-center">
        <span
          className="h-[5px] w-[5px] shrink-0 rounded-full border-[1.5px] border-[#047A48] bg-[#F7F9F5]"
          aria-hidden="true"
        />
        <span className="h-px flex-1 bg-[#D4E1D1]" aria-hidden="true" />
        <span
          className="h-[5px] w-[5px] shrink-0 rounded-full border-[1.5px] border-[#047A48] bg-[#F7F9F5]"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
