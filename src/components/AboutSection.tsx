import { BotanicalShadowLayer } from './BotanicalShadowLayer';
import { CircuitDivider } from './CircuitDivider';

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative overflow-hidden border-t border-[#D4E1D1] bg-[#F7F9F5] py-20 sm:py-28 lg:py-32"
    >
      <BotanicalShadowLayer variant="corner" opacity={0.05} />

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-10">
        <CircuitDivider index="05" label="ABOUT ANVIKSHA" />

        <div className="mx-auto mt-12 max-w-3xl lg:ml-[16.666667%]">
          <p className="font-mono text-[11px] font-medium tracking-[0.14em] uppercase text-[#047A48]">
            ETYMOLOGY &amp; ARCHITECTURAL THESIS
          </p>

          <h2 className="mt-4 font-display text-3xl leading-[1.15] font-normal tracking-[-0.025em] text-[#132219] sm:text-4xl">
            <em>Anviksha</em> &mdash; systematic inquiry and keen observation.
          </h2>

          <div className="mt-7 space-y-5 text-base leading-[1.72] text-[#47584E] sm:text-[17px]">
            <p>
              Precision agriculture cannot be solved by bolting generic hobbyist breakout
              sensors onto power-hungry microcontrollers and streaming noisy telemetry to
              distant cloud dashboards. Living crops operate on electrochemical, thermal,
              and optical timescales that demand instrumentation built specifically for
              plant biophysics.
            </p>
            <p>
              Anviksha Technologies was founded to own the complete signal chain from the
              22nm FD-SOI transistor up to the agronomic API. By co-designing the{' '}
              <span className="font-mono text-[14.5px] text-[#132219]">ANV-S1</span>{' '}
              mixed-signal front-end, the{' '}
              <span className="font-mono text-[14.5px] text-[#132219]">PhytoNPU</span>{' '}
              edge inference engine, and the weather-sealed{' '}
              <span className="font-mono text-[14.5px] text-[#132219]">LeafNode N1</span>{' '}
              enclosure, we replace fragile multi-board assemblies with a single autonomous
              instrument that listens to crop physiology continuously for five years.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-6 border-t border-[#D4E1D1] pt-6 font-mono text-[11px] tracking-[0.1em] uppercase text-[#3A3D3B]">
            <span>22NM FD-SOI SILICON</span>
            <span className="text-[#D4E1D1]" aria-hidden="true">
              /
            </span>
            <span>IP67 FIELD HARDWARE</span>
            <span className="text-[#D4E1D1]" aria-hidden="true">
              /
            </span>
            <span>ON-CHIP BOTANICAL AI</span>
          </div>
        </div>
      </div>
    </section>
  );
}
