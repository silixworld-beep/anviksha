import { useState } from 'react';
import { BotanicalShadowLayer } from './BotanicalShadowLayer';
import { CircuitDivider } from './CircuitDivider';

type PinNumber = 1 | 2 | 3 | 4;

interface CalloutPin {
  id: PinNumber;
  title: string;
  material: string;
  sensingSpec: string;
  detail: string;
}

const CALLOUT_PINS: CalloutPin[] = [
  {
    id: 1,
    title: 'Monocrystalline Solar Bezel',
    material: 'Tempered low-iron glass · 18° self-cleaning bevel',
    sensingSpec: '1.2 Wp peak · 380 mV cold-start to ANV-S1 MPPT PMIC',
    detail:
      'Flush-mounted top bezel harvests diffuse canopy light to sustain 5-year autonomous field operation without battery swaps.',
  },
  {
    id: 2,
    title: 'Optical Canopy Reflectance Head',
    material: 'Sapphire-coated optical window · hydrophobic seal',
    sensingSpec: '8-channel PAR / NDVI / NIR (415–940 nm) + ambient VPD',
    detail:
      'Non-invasive downward and upward spectral photodiodes track chlorophyll index and stomatal conductance shifts continuously.',
  },
  {
    id: 3,
    title: 'IP67 Matte-Sage Aluminum Core',
    material: 'Anodized 6061-T6 aluminum + UV-stabilized polymer collar',
    sensingSpec: 'Houses ANV-S1 SoC · Sub-GHz LoRa/FSK + BLE 5.4 antenna',
    detail:
      'Hermetically gasketed chassis protects the ANV-S1 die from fertigation spray, dust ingress, and -20 °C to +65 °C thermal cycling.',
  },
  {
    id: 4,
    title: 'Dual-Depth Root-Zone EIS Probe',
    material: '316L passivated stainless electrodes · fiberglass-epoxy shaft',
    sensingSpec: '100 Hz – 100 kHz EIS · dual-depth (-15 cm / -45 cm) moisture & EC',
    detail:
      'Measures complex root-zone impedance and ion-proxy drift across active feeder roots and deeper percolation strata.',
  },
];

const FIELD_HIGHLIGHTS = [
  {
    code: 'ZERO-TRENCH',
    title: 'Single-auger deployment in under 4 minutes',
    copy: 'No buried conduits, external solar masts, or weatherproof junction boxes. Push or auger-seat the root-zone probe directly into the crop row.',
  },
  {
    code: 'BLE 5.4 TAP',
    title: 'Zero-touch mobile commissioning',
    copy: 'Tap any LeafNode N1 to load crop-specific PhytoOS calibration coefficients, verify probe contact impedance, and bind GPS block coordinates.',
  },
  {
    code: '40+ HECTARES',
    title: 'Autonomous Sub-GHz mesh routing',
    copy: 'Self-forming Sub-GHz LoRa/FSK links bridge dense orchard canopies and multi-block farms, forwarding 48-byte state vectors to your gateway.',
  },
] as const;

export function FieldHardwareSection() {
  const [activePin, setActivePin] = useState<PinNumber>(3);
  const selected = CALLOUT_PINS.find((p) => p.id === activePin) ?? CALLOUT_PINS[2];

  return (
    <section
      id="leafnode"
      className="relative overflow-hidden border-t border-[#D4E1D1] bg-[#F7F9F5] py-20 sm:py-24 lg:py-28"
    >
      {/* Subtle cast leaf shadows in the background margin */}
      <BotanicalShadowLayer variant="section" opacity={0.055} />

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-10">
        <CircuitDivider index="02" label="FIELD HARDWARE" />

        <div className="mt-12 grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Industrial-Design Technical Elevation Drafting Card */}
          <div className="lg:col-span-6">
            <div
              className="rounded-sm border border-[#D9E4D7] bg-[#FFFFFF] p-5 sm:p-6"
              style={{ boxShadow: 'var(--anv-shadow-hardware)' }}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#D4E1D1] pb-3">
                <span className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-[#132219]">
                  FIG 2.1 &mdash; LEAFNODE N1 ELEVATION
                </span>
                <span className="font-mono text-[10.5px] tracking-[0.08em] uppercase text-[#47584E]">
                  IP67 &middot; ANODIZED AL-6061
                </span>
              </div>

              {/* Technical Blueprint SVG */}
              <div className="mt-4 rounded-sm border border-[#D4E1D1] bg-[#F7F9F5] p-3 sm:p-4">
                <svg
                  viewBox="0 0 460 410"
                  className="h-auto w-full select-none"
                  role="img"
                  aria-label="LeafNode N1 technical elevation drawing with interactive callout pins 1 through 4"
                >
                  <defs>
                    <pattern
                      id="leafnode-draft-grid"
                      width="20"
                      height="20"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M 20 0 L 0 0 0 20"
                        fill="none"
                        stroke="#D4E1D1"
                        strokeWidth="0.55"
                        strokeOpacity="0.6"
                      />
                    </pattern>
                  </defs>

                  <rect x="0" y="0" width="460" height="410" fill="url(#leafnode-draft-grid)" />

                  {/* Vertical Centerline Axis */}
                  <line
                    x1="210"
                    y1="18"
                    x2="210"
                    y2="394"
                    stroke="#047A48"
                    strokeOpacity="0.25"
                    strokeWidth="0.9"
                    strokeDasharray="6 4"
                  />

                  {/* Dimension Line (Left) */}
                  <g stroke="#47584E" strokeOpacity="0.45" strokeWidth="0.8">
                    <line x1="64" y1="38" x2="64" y2="236" />
                    <line x1="58" y1="38" x2="70" y2="38" />
                    <line x1="58" y1="236" x2="70" y2="236" />
                  </g>
                  <text
                    x="56"
                    y="142"
                    textAnchor="middle"
                    fill="#47584E"
                    fontSize="8.5"
                    fontFamily="IBM Plex Mono, monospace"
                    transform="rotate(-90 56 142)"
                  >
                    184 MM CHASSIS
                  </text>

                  {/* 1. Monocrystalline Solar Bezel (Angled Top) */}
                  <polygon
                    points="146,52 274,36 282,56 138,72"
                    fill="#132219"
                    stroke="#047A48"
                    strokeWidth="1.25"
                  />
                  {/* Solar cell grid lines */}
                  <g stroke="#4CC13B" strokeOpacity="0.35" strokeWidth="0.7">
                    <line x1="176" y1="48" x2="180" y2="67" />
                    <line x1="210" y1="44" x2="210" y2="64" />
                    <line x1="244" y1="40" x2="240" y2="60" />
                  </g>

                  {/* 2. Optical Canopy Reflectance Head */}
                  <rect
                    x="154"
                    y="72"
                    width="112"
                    height="30"
                    rx="2"
                    fill="#FFFFFF"
                    stroke="#047A48"
                    strokeWidth="1.2"
                  />
                  {/* Sapphire optical window */}
                  <rect
                    x="184"
                    y="81"
                    width="52"
                    height="12"
                    rx="1.5"
                    fill="#EDF3EB"
                    stroke="#047A48"
                    strokeWidth="0.9"
                  />
                  {/* Optical FOV cone */}
                  <path
                    d="M 236 87 L 310 66 M 236 87 L 310 108"
                    stroke="#4CC13B"
                    strokeOpacity="0.5"
                    strokeWidth="0.9"
                    strokeDasharray="3 3"
                  />

                  {/* 3. IP67 Matte-Sage Aluminum Core housing ANV-S1 */}
                  <rect
                    x="162"
                    y="102"
                    width="96"
                    height="134"
                    rx="3"
                    fill="#EDF3EB"
                    stroke="#047A48"
                    strokeWidth="1.4"
                  />
                  {/* Gasket rings */}
                  <line x1="162" y1="116" x2="258" y2="116" stroke="#047A48" strokeWidth="0.9" />
                  <line x1="162" y1="222" x2="258" y2="222" stroke="#047A48" strokeWidth="0.9" />

                  {/* Internal ANV-S1 Cutaway Outline */}
                  <rect
                    x="180"
                    y="134"
                    width="60"
                    height="70"
                    rx="2"
                    fill="#FFFFFF"
                    stroke="#047A48"
                    strokeOpacity="0.65"
                    strokeWidth="1"
                    strokeDasharray="3 2"
                  />
                  <rect
                    x="196"
                    y="152"
                    width="28"
                    height="28"
                    rx="1.5"
                    fill="#132219"
                    stroke="#047A48"
                    strokeWidth="0.9"
                  />
                  <text
                    x="210"
                    y="194"
                    textAnchor="middle"
                    fill="#047A48"
                    fontSize="7.5"
                    fontFamily="IBM Plex Mono, monospace"
                    fontWeight="500"
                  >
                    ANV-S1
                  </text>

                  {/* Soil Surface Datum Line */}
                  <line
                    x1="44"
                    y1="236"
                    x2="416"
                    y2="236"
                    stroke="#132219"
                    strokeWidth="1.2"
                  />
                  <text
                    x="414"
                    y="230"
                    textAnchor="end"
                    fill="#47584E"
                    fontSize="8"
                    fontFamily="IBM Plex Mono, monospace"
                  >
                    0.0 M SOIL DATUM
                  </text>

                  {/* 4. Dual-Depth Root-Zone EIS Probe */}
                  <rect
                    x="201"
                    y="236"
                    width="18"
                    height="140"
                    fill="#D4E1D1"
                    stroke="#047A48"
                    strokeWidth="1.2"
                  />
                  {/* Tapered Auger Tip */}
                  <polygon
                    points="201,376 219,376 210,394"
                    fill="#047A48"
                    fillOpacity="0.85"
                  />
                  {/* Electrode Rings (-15 cm and -45 cm) */}
                  <rect x="199" y="274" width="22" height="10" fill="#047A48" rx="1" />
                  <rect x="199" y="336" width="22" height="10" fill="#047A48" rx="1" />

                  <text
                    x="186"
                    y="282"
                    textAnchor="end"
                    fill="#47584E"
                    fontSize="7.5"
                    fontFamily="IBM Plex Mono, monospace"
                  >
                    -15 CM
                  </text>
                  <text
                    x="186"
                    y="344"
                    textAnchor="end"
                    fill="#47584E"
                    fontSize="7.5"
                    fontFamily="IBM Plex Mono, monospace"
                  >
                    -45 CM
                  </text>

                  {/* Interactive Callout Pins (1–4) */}
                  {[
                    { id: 1 as PinNumber, cx: 326, cy: 48, lx: 278, ly: 48, label: 'SOLAR BEZEL' },
                    { id: 2 as PinNumber, cx: 326, cy: 87, lx: 266, ly: 87, label: 'OPTICAL HEAD' },
                    { id: 3 as PinNumber, cx: 326, cy: 168, lx: 258, ly: 168, label: 'IP67 CORE' },
                    { id: 4 as PinNumber, cx: 326, cy: 310, lx: 221, ly: 310, label: 'EIS PROBE' },
                  ].map((pin) => {
                    const isActive = activePin === pin.id;
                    return (
                      <g
                        key={pin.id}
                        role="button"
                        tabIndex={0}
                        aria-pressed={isActive}
                        aria-label={`Inspect ${pin.label}`}
                        onClick={() => setActivePin(pin.id)}
                        onMouseEnter={() => setActivePin(pin.id)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            setActivePin(pin.id);
                          }
                        }}
                        className="cursor-pointer focus:outline-none"
                      >
                        <line
                          x1={pin.lx}
                          y1={pin.ly}
                          x2={pin.cx - 12}
                          y2={pin.cy}
                          stroke={isActive ? '#4CC13B' : '#047A48'}
                          strokeWidth={isActive ? '1.6' : '1'}
                          strokeOpacity={isActive ? 1 : 0.45}
                        />
                        {isActive && (
                          <circle
                            cx={pin.cx}
                            cy={pin.cy}
                            r="16"
                            fill="#4CC13B"
                            fillOpacity="0.16"
                          />
                        )}
                        <circle
                          cx={pin.cx}
                          cy={pin.cy}
                          r="11"
                          fill={isActive ? '#047A48' : '#FFFFFF'}
                          stroke="#047A48"
                          strokeWidth="1.5"
                        />
                        <text
                          x={pin.cx}
                          y={pin.cy + 3.5}
                          textAnchor="middle"
                          fill={isActive ? '#FFFFFF' : '#047A48'}
                          fontSize="10"
                          fontFamily="IBM Plex Mono, monospace"
                          fontWeight="500"
                        >
                          {pin.id}
                        </text>
                        <text
                          x={pin.cx + 18}
                          y={pin.cy + 3}
                          fill={isActive ? '#132219' : '#47584E'}
                          fontSize="8.5"
                          fontFamily="IBM Plex Mono, monospace"
                          fontWeight={isActive ? '500' : '400'}
                        >
                          {pin.label}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Active Callout Specification Readout */}
              <div className="mt-4 rounded-sm border border-[#D4E1D1] bg-[#EDF3EB]/70 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-mono text-[11px] font-medium tracking-[0.1em] uppercase text-[#047A48]">
                    PIN 0{selected.id} &middot; {selected.title}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {CALLOUT_PINS.map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setActivePin(p.id)}
                        className={`h-6 w-6 rounded-sm font-mono text-[11px] transition-colors ${
                          activePin === p.id
                            ? 'bg-[#047A48] font-medium text-[#FFFFFF]'
                            : 'border border-[#D4E1D1] bg-[#FFFFFF] text-[#47584E] hover:border-[#047A48]'
                        }`}
                        aria-label={`Select callout ${p.id}`}
                      >
                        {p.id}
                      </button>
                    ))}
                  </div>
                </div>

                <p className="mt-2 text-sm leading-relaxed text-[#132219]">{selected.detail}</p>

                <dl className="mt-3 grid grid-cols-1 gap-2 border-t border-[#D4E1D1] pt-3 sm:grid-cols-2">
                  <div>
                    <dt className="font-mono text-[10px] tracking-[0.08em] uppercase text-[#47584E]">
                      Material &amp; Sealing
                    </dt>
                    <dd className="mt-0.5 font-mono text-[11.5px] text-[#132219]">
                      {selected.material}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10px] tracking-[0.08em] uppercase text-[#47584E]">
                      Sensing &amp; Power Spec
                    </dt>
                    <dd className="mt-0.5 font-mono text-[11.5px] text-[#132219]">
                      {selected.sensingSpec}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>

          {/* Right Column: Grounded Full-Stack Engineering Overview */}
          <div className="lg:col-span-6 lg:pt-2">
            <p className="font-mono text-[11px] font-medium tracking-[0.14em] uppercase text-[#047A48]">
              LEAFNODE N1 &middot; AUTONOMOUS FIELD UNIT
            </p>
            <h2 className="mt-3 font-display text-3xl leading-[1.12] font-normal tracking-[-0.025em] text-[#132219] sm:text-4xl">
              Owned end-to-end from bare 22nm silicon to weather-sealed field hardware.
            </h2>

            <p className="mt-5 text-base leading-[1.65] text-[#47584E]">
              Most agricultural telemetry fails at the boundary between off-the-shelf
              microcontrollers and harsh field enclosures. Because Anviksha designs both the{' '}
              <span className="font-mono text-[14px] text-[#132219]">ANV-S1</span> die and the{' '}
              <span className="font-mono text-[14px] text-[#132219]">LeafNode N1</span>{' '}
              mechanical housing, every thermal path, solar budget, and electrode impedance
              calibration is co-engineered as one instrument.
            </p>

            {/* Hairline-separated engineering highlights */}
            <div className="mt-8 divide-y divide-[#D4E1D1] border-t border-b border-[#D4E1D1]">
              {FIELD_HIGHLIGHTS.map((item) => (
                <div key={item.code} className="py-5">
                  <div className="flex items-center gap-2.5">
                    <span
                      className="h-[5px] w-[5px] rounded-full border-[1.5px] border-[#047A48] bg-[#F7F9F5]"
                      aria-hidden="true"
                    />
                    <span className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-[#047A48]">
                      {item.code}
                    </span>
                  </div>
                  <h3 className="mt-2 font-display text-xl font-medium text-[#132219]">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-[1.65] text-[#47584E]">{item.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
