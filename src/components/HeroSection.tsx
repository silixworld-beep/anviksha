import { BotanicalShadowLayer } from './BotanicalShadowLayer';
import { HeroTelemetryShowcase } from './HeroTelemetryShowcase';

const HERO_METRICS = [
  { value: '1.6 µA', label: 'Deep Sleep' },
  { value: '0.8 TOPS', label: 'On-Chip NPU' },
  { value: '48–72h', label: 'Early Stress Detection' },
  { value: '5-Yr', label: 'Autonomous Field Life' },
] as const;

export function HeroSection() {
  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-[#D4E1D1] bg-[#F7F9F5]"
    >
      {/* Faint architectural drafting grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            'linear-gradient(to right, #D4E1D1 1px, transparent 1px), linear-gradient(to bottom, #D4E1D1 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage:
            'radial-gradient(ellipse 85% 75% at 50% 35%, rgba(0,0,0,0.65) 0%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 85% 75% at 50% 35%, rgba(0,0,0,0.65) 0%, transparent 100%)',
        }}
      />

      {/* Organic sunlit leaf-canopy cast shadows from top-right corner */}
      <BotanicalShadowLayer variant="corner" opacity={0.07} />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-14 pb-20 sm:px-10 sm:pt-20 sm:pb-24 lg:pt-24 lg:pb-28">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Left 7 Columns: Editorial Typography & Actions */}
          <div className="lg:col-span-7">
            <p className="font-mono text-[11px] font-medium tracking-[0.14em] uppercase text-[#047A48] sm:text-xs">
              ANV-S1 SILICON &middot; AUTONOMOUS FIELD HARDWARE &middot; ON-CHIP AI
            </p>

            <h1 className="mt-5 font-display text-4xl leading-[1.06] font-normal tracking-[-0.025em] text-[#132219] sm:text-5xl lg:text-[3.5rem]">
              Silicon engineered to listen to living crops.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-[1.65] text-[#47584E] sm:text-[17px]">
              Anviksha combines our 22nm FD-SOI ANV-S1 plant-sensing SoC, solar-harvesting
              LeafNode N1 field units, and quantized edge neural inference into a single
              autonomous instrument. By measuring root-zone impedance and canopy physiology
              directly at the leaf, it flags stress 48–72 hours before symptoms become visible.
            </p>

            {/* Primary & Secondary Actions */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#silicon"
                className="inline-flex items-center justify-center rounded-sm bg-[#047A48] px-5 py-3 text-sm font-medium text-[#FFFFFF] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:bg-[#03663C] hover:shadow-[0_6px_16px_rgba(4,57,34,0.12),0_16px_32px_-8px_rgba(4,122,72,0.24)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#047A48] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F7F9F5]"
              >
                Explore ANV-S1 Architecture
              </a>

              <a
                href="#datasheet"
                className="inline-flex items-center justify-center rounded-sm border border-[#132219]/30 bg-transparent px-5 py-3 text-sm font-medium text-[#132219] transition-colors duration-200 hover:border-[#132219] hover:bg-[#EDF3EB]/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#132219]"
              >
                Read Technical Brief
              </a>
            </div>

            {/* Compact Horizontal Metric Strip with Hairline Dividers */}
            <div className="mt-12 border-t border-b border-[#D4E1D1] py-4">
              <dl className="grid grid-cols-2 gap-y-4 sm:flex sm:flex-wrap sm:items-center sm:gap-y-2">
                {HERO_METRICS.map((metric, idx) => (
                  <div
                    key={metric.label}
                    className={`flex items-baseline gap-2 ${
                      idx > 0
                        ? 'sm:border-l sm:border-[#D4E1D1] sm:pl-5'
                        : ''
                    } ${idx < HERO_METRICS.length - 1 ? 'sm:pr-5' : ''}`}
                  >
                    <dt className="sr-only">{metric.label}</dt>
                    <dd className="font-mono text-sm font-medium tabular-nums text-[#132219]">
                      {metric.value}
                    </dd>
                    <span className="font-mono text-[11px] text-[#47584E]">
                      {metric.label}
                    </span>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* Right 5 Columns: Hardware & Interactive Telemetry Showcase */}
          <div className="lg:col-span-5">
            <HeroTelemetryShowcase />
          </div>
        </div>
      </div>
    </section>
  );
}
