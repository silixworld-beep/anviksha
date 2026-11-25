import { useState } from 'react';
import { CircuitDivider } from './CircuitDivider';

const PIPELINE_STAGES = [
  {
    step: '01',
    title: 'Sense',
    tag: '24-BIT AFE',
    detail:
      'Continuous analog sampling of dual-depth root-zone EIS impedance, sap thermal pulse, and 8-channel canopy reflectance.',
  },
  {
    step: '02',
    title: 'Infer on Silicon',
    tag: 'PHYTONPU · 14 MS',
    detail:
      'PhytoNPU executes quantized INT8 temporal models locally on the ANV-S1 die—zero cloud round-trip required.',
  },
  {
    step: '03',
    title: 'Compress & Transmit',
    tag: '48-BYTE VECTOR · -84% RF',
    detail:
      'Transmits compact 48-byte physiological state vectors over Sub-GHz only when baselines shift, cutting RF power by 84%.',
  },
  {
    step: '04',
    title: 'Actuate',
    tag: 'OPEN MQTT / REST',
    detail:
      'Triggers automated drip/fertigation manifolds and greenhouse climate schedules via open MQTT and REST APIs.',
  },
] as const;

interface TimelineCheckpoint {
  id: string;
  timeLabel: string;
  xPos: number;
  anvikshaIndex: number;
  visualIndex: number;
  headline: string;
  detail: string;
  payloadState: string;
}

const TIMELINE_CHECKPOINTS: TimelineCheckpoint[] = [
  {
    id: 't-72',
    timeLabel: 'T-72h',
    xPos: 48,
    anvikshaIndex: 94,
    visualIndex: 96,
    headline: 'Baseline Equilibrium',
    detail:
      'Morning transpiration and root-zone impedance remain within nominal cultivar envelope. Sub-GHz radio stays silent.',
    payloadState: 'PhytoNPU: Nominal · 0.4% duty',
  },
  {
    id: 't-60',
    timeLabel: 'T-60h',
    xPos: 152,
    anvikshaIndex: 68,
    visualIndex: 95,
    headline: 'Anviksha Early Stress Detection (-60h Lead)',
    detail:
      'Stomatal conductance drops 26% and root-zone EIS phase angle shifts. PhytoNPU flags pre-symptomatic water deficit 60 hours before visible chlorosis.',
    payloadState: 'ALERT: 48-byte deficit vector TX',
  },
  {
    id: 't-24',
    timeLabel: 'T-24h',
    xPos: 360,
    anvikshaIndex: 42,
    visualIndex: 89,
    headline: 'Automated Drip Manifold Actuation',
    detail:
      'Closed-loop MQTT trigger schedules a targeted 18-minute pulse irrigation cycle, restoring root-zone water potential before cellular damage.',
    payloadState: 'ACTUATE: Fertigation Zone B2',
  },
  {
    id: 't-0',
    timeLabel: 'T-0h',
    xPos: 498,
    anvikshaIndex: 31,
    visualIndex: 44,
    headline: 'Visible Leaf Chlorosis / Manual Scouting',
    detail:
      'Without edge intervention, leaf yellowing and turgor loss become visible to manual scouting—after yield-limiting stomatal closure has occurred.',
    payloadState: 'CONVENTIONAL DETECTION POINT',
  },
];

export function EdgeIntelligenceSection() {
  const [activeCheckpointId, setActiveCheckpointId] = useState<string>('t-60');
  const activePoint =
    TIMELINE_CHECKPOINTS.find((cp) => cp.id === activeCheckpointId) ?? TIMELINE_CHECKPOINTS[1];

  return (
    <section
      id="edge-ai"
      className="relative border-t border-[#D4E1D1] bg-[#F7F9F5] py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <CircuitDivider index="03" label="EDGE INTELLIGENCE" />

        {/* Editorial Header */}
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="font-mono text-[11px] font-medium tracking-[0.14em] uppercase text-[#047A48]">
              PHYTOOS &amp; ON-CHIP AGRONOMIC AI
            </p>
            <h2 className="mt-3 font-display text-3xl leading-[1.12] font-normal tracking-[-0.025em] text-[#132219] sm:text-4xl">
              From raw impedance to irrigation actuation in 14 milliseconds on silicon.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-sm leading-[1.65] text-[#47584E] sm:text-[15px]">
              PhytoOS runs quantized temporal inference at the sensor node, transmitting
              meaningful physiological state vectors rather than streaming raw noise.
            </p>
          </div>
        </div>

        {/* 1. Horizontal 4-Stage Signal-to-Decision Pipeline */}
        <div
          className="mt-12 overflow-hidden rounded-sm border border-[#D9E4D7] bg-[#FFFFFF]"
          style={{ boxShadow: 'var(--anv-shadow-ambient)' }}
        >
          {/* Top Continuous Circuit-Vein Trace Header */}
          <div className="relative hidden border-b border-[#D4E1D1] bg-[#EDF3EB]/50 md:grid md:grid-cols-4">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 right-7 left-7 h-px -translate-y-1/2 bg-[#D4E1D1]"
            />
            {PIPELINE_STAGES.map((stage) => (
              <div key={stage.step} className="relative z-10 flex items-center gap-2 px-6 py-4 sm:px-7">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-sm border border-[#047A48] bg-[#FFFFFF] font-mono text-[11px] font-medium tabular-nums text-[#047A48]">
                  {stage.step}
                </span>
                <span
                  className="h-[7px] w-[7px] shrink-0 rounded-full border-[1.5px] border-[#047A48] bg-[#4CC13B]"
                  aria-hidden="true"
                />
                <span className="bg-[#EDF3EB] px-1.5 font-mono text-[10px] font-medium tracking-[0.11em] uppercase text-[#047A48]">
                  {stage.tag}
                </span>
              </div>
            ))}
          </div>

          {/* 4-Stage Rail Columns Separated by 1px Hairline Rules */}
          <div className="grid grid-cols-1 divide-y divide-[#D4E1D1] md:grid-cols-4 md:divide-x md:divide-y-0">
            {PIPELINE_STAGES.map((stage) => (
              <div key={stage.step} className="p-6 sm:p-7">
                <div className="flex items-center gap-2 md:hidden">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-sm border border-[#047A48] bg-[#EDF3EB] font-mono text-[11px] font-medium tabular-nums text-[#047A48]">
                    {stage.step}
                  </span>
                  <span className="font-mono text-[10px] font-medium tracking-[0.12em] uppercase text-[#047A48]">
                    {stage.tag}
                  </span>
                </div>
                <h3 className="mt-3 font-display text-xl font-medium text-[#132219] md:mt-0">
                  {stage.step} {stage.title}
                </h3>
                <p className="mt-2.5 text-[13.5px] leading-[1.65] text-[#47584E]">
                  {stage.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Interactive "Visible Stress vs. Anviksha Edge Detection" Timeline Chart */}
        <div
          className="mt-12 rounded-sm border border-[#D9E4D7] bg-[#FFFFFF] p-5 sm:p-7"
          style={{ boxShadow: 'var(--anv-shadow-ambient)' }}
        >
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#D4E1D1] pb-4">
            <div>
              <span className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-[#047A48]">
                FIG 3.1 &mdash; TEMPORAL DETECTION LEAD WINDOW
              </span>
              <h3 className="mt-1 font-display text-2xl font-normal text-[#132219]">
                Visible Stress vs. Anviksha Edge Detection
              </h3>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center gap-5 font-mono text-[11px] text-[#47584E]">
              <span className="inline-flex items-center gap-2">
                <span className="h-0.5 w-5 bg-[#047A48]" aria-hidden="true" />
                Anviksha Physiological Index
              </span>
              <span className="inline-flex items-center gap-2">
                <span
                  className="h-0.5 w-5 border-t-2 border-dashed border-[#47584E]/60"
                  aria-hidden="true"
                />
                Visual Chlorosis / Scouting
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
            {/* SVG Timeline Chart (8 cols) */}
            <div className="lg:col-span-8">
              <div className="rounded-sm border border-[#D4E1D1] bg-[#F7F9F5] p-3 sm:p-4">
                <svg
                  viewBox="0 0 600 240"
                  className="h-auto w-full select-none"
                  role="img"
                  aria-label="Timeline chart comparing Anviksha 60-hour early edge detection against visible leaf chlorosis"
                >
                  {/* 48-72h Early Detection Lead Window Shading */}
                  <rect
                    x="130"
                    y="22"
                    width="368"
                    height="172"
                    fill="#4CC13B"
                    fillOpacity="0.07"
                  />
                  <text
                    x="314"
                    y="38"
                    textAnchor="middle"
                    fill="#047A48"
                    fontSize="9"
                    fontFamily="IBM Plex Mono, monospace"
                    fontWeight="500"
                  >
                    60-HOUR EARLY INTERVENTION LEAD
                  </text>

                  {/* Horizontal Reference Grid Lines */}
                  {[48, 96, 144, 192].map((y) => (
                    <line
                      key={y}
                      x1="38"
                      y1={y}
                      x2="572"
                      y2={y}
                      stroke="#D4E1D1"
                      strokeWidth="0.8"
                    />
                  ))}

                  {/* Y-axis labels */}
                  <text
                    x="32"
                    y="51"
                    textAnchor="end"
                    fill="#47584E"
                    fontSize="8.5"
                    fontFamily="IBM Plex Mono, monospace"
                  >
                    100%
                  </text>
                  <text
                    x="32"
                    y="99"
                    textAnchor="end"
                    fill="#47584E"
                    fontSize="8.5"
                    fontFamily="IBM Plex Mono, monospace"
                  >
                    70%
                  </text>
                  <text
                    x="32"
                    y="147"
                    textAnchor="end"
                    fill="#47584E"
                    fontSize="8.5"
                    fontFamily="IBM Plex Mono, monospace"
                  >
                    40%
                  </text>
                  <text
                    x="32"
                    y="195"
                    textAnchor="end"
                    fill="#47584E"
                    fontSize="8.5"
                    fontFamily="IBM Plex Mono, monospace"
                  >
                    10%
                  </text>

                  {/* Visual Leaf Chlorosis Curve (Muted Slate Dashed) */}
                  <path
                    d="M 48 52 C 150 53, 280 54, 360 64 C 425 72, 468 102, 498 138 C 522 166, 548 178, 566 184"
                    fill="none"
                    stroke="#47584E"
                    strokeOpacity="0.55"
                    strokeWidth="2"
                    strokeDasharray="5 4"
                  />

                  {/* Anviksha Physiological Index Curve (#047A48 Solid) */}
                  <path
                    d="M 48 56 C 95 58, 124 72, 152 98 C 210 116, 285 128, 360 142 C 420 152, 464 156, 498 160 L 566 164"
                    fill="none"
                    stroke="#047A48"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />

                  {/* Active Vertical Scrubber Line */}
                  <line
                    x1={activePoint.xPos}
                    y1="22"
                    x2={activePoint.xPos}
                    y2="194"
                    stroke="#4CC13B"
                    strokeWidth="1.25"
                    strokeDasharray="3 3"
                  />

                  {/* Interactive Checkpoints */}
                  {TIMELINE_CHECKPOINTS.map((cp) => {
                    const isSelected = cp.id === activeCheckpointId;
                    const yAnviksha = 192 - ((cp.anvikshaIndex - 10) / 90) * 144;
                    return (
                      <g
                        key={cp.id}
                        role="button"
                        tabIndex={0}
                        aria-label={`Inspect ${cp.timeLabel}: ${cp.headline}`}
                        onClick={() => setActiveCheckpointId(cp.id)}
                        onMouseEnter={() => setActiveCheckpointId(cp.id)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            setActiveCheckpointId(cp.id);
                          }
                        }}
                        className="cursor-pointer focus:outline-none"
                      >
                        {isSelected && (
                          <circle
                            cx={cp.xPos}
                            cy={yAnviksha}
                            r="11"
                            fill="#4CC13B"
                            fillOpacity="0.22"
                          />
                        )}
                        <circle
                          cx={cp.xPos}
                          cy={yAnviksha}
                          r={isSelected ? '5.5' : '4'}
                          fill={isSelected ? '#4CC13B' : '#FFFFFF'}
                          stroke="#047A48"
                          strokeWidth="1.75"
                        />
                        <text
                          x={cp.xPos}
                          y="214"
                          textAnchor="middle"
                          fill={isSelected ? '#047A48' : '#47584E'}
                          fontSize="9.5"
                          fontFamily="IBM Plex Mono, monospace"
                          fontWeight={isSelected ? '500' : '400'}
                        >
                          {cp.timeLabel}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>

            {/* Checkpoint Inspector Panel (4 cols) */}
            <div className="flex flex-col justify-between lg:col-span-4">
              <div>
                <div className="flex flex-wrap gap-1.5">
                  {TIMELINE_CHECKPOINTS.map((cp) => (
                    <button
                      key={cp.id}
                      type="button"
                      onClick={() => setActiveCheckpointId(cp.id)}
                      className={`rounded-sm px-2.5 py-1 font-mono text-[11px] transition-colors ${
                        activeCheckpointId === cp.id
                          ? 'bg-[#047A48] font-medium text-[#FFFFFF]'
                          : 'border border-[#D4E1D1] bg-[#F7F9F5] text-[#47584E] hover:border-[#047A48]'
                      }`}
                    >
                      {cp.timeLabel}
                    </button>
                  ))}
                </div>

                <h4 className="mt-4 font-display text-xl font-medium text-[#132219]">
                  {activePoint.headline}
                </h4>
                <p className="mt-2 text-sm leading-[1.6] text-[#47584E]">
                  {activePoint.detail}
                </p>

                <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-[#D4E1D1] pt-4">
                  <div className="rounded-sm bg-[#EDF3EB] px-3 py-2.5">
                    <dt className="font-mono text-[10px] tracking-[0.08em] uppercase text-[#47584E]">
                      Stomatal / EIS
                    </dt>
                    <dd className="mt-0.5 font-mono text-base font-medium text-[#047A48]">
                      {activePoint.anvikshaIndex}%
                    </dd>
                  </div>
                  <div className="rounded-sm bg-[#F7F9F5] px-3 py-2.5 border border-[#D4E1D1]">
                    <dt className="font-mono text-[10px] tracking-[0.08em] uppercase text-[#47584E]">
                      Visual Canopy
                    </dt>
                    <dd className="mt-0.5 font-mono text-base font-medium text-[#47584E]">
                      {activePoint.visualIndex}%
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="mt-4 flex items-center gap-2 rounded-sm border border-[#D4E1D1] bg-[#F7F9F5] px-3.5 py-2.5">
                <span className="h-2 w-2 shrink-0 rounded-full bg-[#4CC13B]" aria-hidden="true" />
                <span className="font-mono text-[11px] font-medium text-[#132219]">
                  {activePoint.payloadState}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
