import { useState } from 'react';

type FieldStateKey = 'nominal' | 'deficit' | 'salinity';

interface FieldStateProfile {
  id: FieldStateKey;
  label: string;
  vpd: string;
  impedance: string;
  stomatalIndex: string;
  statusText: string;
  statusTone: 'nominal' | 'advisory';
  radioDuty: string;
  primaryWave: string;
  secondaryWave: string;
}

const FIELD_STATES: Record<FieldStateKey, FieldStateProfile> = {
  nominal: {
    id: 'nominal',
    label: 'Morning Transpiration',
    vpd: '1.14 kPa',
    impedance: '412 Ω @ 1kHz',
    stomatalIndex: '0.86',
    statusText: 'PhytoNPU: Nominal · 14ms',
    statusTone: 'nominal',
    radioDuty: '0.4% duty · vector #841',
    primaryWave:
      'M 0 54 C 28 52, 42 36, 70 34 C 98 32, 114 48, 144 44 C 174 40, 192 22, 224 24 C 256 26, 274 42, 304 38 C 334 34, 352 26, 380 28',
    secondaryWave:
      'M 0 66 C 32 64, 54 58, 86 56 C 118 54, 140 62, 172 58 C 204 54, 228 46, 260 48 C 292 50, 320 56, 380 52',
  },
  deficit: {
    id: 'deficit',
    label: 'Early Water Deficit',
    vpd: '1.92 kPa',
    impedance: '685 Ω @ 1kHz',
    stomatalIndex: '0.41',
    statusText: 'PhytoNPU: Pre-Symptomatic Deficit (-58h) · 14ms',
    statusTone: 'advisory',
    radioDuty: '1.1% duty · vector #842',
    primaryWave:
      'M 0 36 C 30 38, 52 50, 82 56 C 112 62, 134 52, 166 64 C 198 74, 224 68, 256 76 C 288 82, 324 72, 380 80',
    secondaryWave:
      'M 0 58 C 34 60, 62 66, 96 68 C 130 70, 162 64, 196 72 C 230 78, 272 74, 380 84',
  },
  salinity: {
    id: 'salinity',
    label: 'Salinity Drift',
    vpd: '1.48 kPa',
    impedance: '194 Ω @ 1kHz',
    stomatalIndex: '0.62',
    statusText: 'PhytoNPU: Root-Zone EC Drift (+1.8 dS/m) · 14ms',
    statusTone: 'advisory',
    radioDuty: '0.9% duty · vector #843',
    primaryWave:
      'M 0 48 C 24 44, 48 64, 76 42 C 104 20, 128 60, 158 38 C 188 18, 214 58, 246 36 C 278 16, 312 52, 380 34',
    secondaryWave:
      'M 0 68 C 30 72, 60 60, 92 70 C 124 78, 156 62, 190 70 C 224 76, 286 64, 380 68',
  },
};

const STATE_ORDER: FieldStateKey[] = ['nominal', 'deficit', 'salinity'];

export function HeroTelemetryShowcase() {
  const [activeKey, setActiveKey] = useState<FieldStateKey>('nominal');
  const current = FIELD_STATES[activeKey];

  return (
    <div
      className="relative rounded-sm border border-[#D9E4D7] bg-[#FFFFFF]"
      style={{ boxShadow: 'var(--anv-shadow-hardware)' }}
    >
      {/* Top Architectural Cutaway Header */}
      <div className="flex items-center justify-between border-b border-[#D4E1D1] bg-[#EDF3EB]/60 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span
            className="h-[5px] w-[5px] rounded-full border-[1.5px] border-[#047A48] bg-[#F7F9F5]"
            aria-hidden="true"
          />
          <span className="font-mono text-[10.5px] font-medium tracking-[0.14em] uppercase text-[#3A3D3B]">
            ANV-S1 DIE CUTAWAY &middot; LIVE TELEMETRY
          </span>
        </div>
        <span className="font-mono text-[10.5px] tracking-[0.08em] text-[#47584E]">
          22NM FD-SOI
        </span>
      </div>

      {/* Upper Panel: Architectural ANV-S1 Chip Package SVG */}
      <div className="relative border-b border-[#D4E1D1] bg-[#F7F9F5]/70 px-5 py-6">
        <svg
          viewBox="0 0 420 156"
          className="h-auto w-full"
          role="img"
          aria-label="Architectural cutaway diagram of the ANV-S1 22nm FD-SOI plant-sensing SoC"
        >
          {/* Subtle PCB substrate grid */}
          <defs>
            <pattern id="anv-pcb-grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path
                d="M 20 0 L 0 0 0 20"
                fill="none"
                stroke="#D4E1D1"
                strokeWidth="0.6"
                strokeOpacity="0.6"
              />
            </pattern>
          </defs>
          <rect x="0" y="0" width="420" height="156" fill="url(#anv-pcb-grid)" rx="2" />

          {/* Left routing traces into the package */}
          <g stroke="#047A48" strokeWidth="1" strokeOpacity="0.45" fill="none">
            <path d="M 18 42 H 96 L 112 54 H 134" />
            <path d="M 18 68 H 134" />
            <path d="M 18 94 H 110 L 122 104 H 134" />
            <path d="M 286 54 H 312 L 326 42 H 402" />
            <path d="M 286 78 H 402" />
            <path d="M 286 104 H 316 L 330 116 H 402" />
          </g>

          {/* Hollow circular via nodes */}
          <g stroke="#047A48" strokeWidth="1.25" fill="#F7F9F5">
            <circle cx="18" cy="42" r="3" />
            <circle cx="18" cy="68" r="3" />
            <circle cx="18" cy="94" r="3" />
            <circle cx="402" cy="42" r="3" />
            <circle cx="402" cy="78" r="3" />
            <circle cx="402" cy="116" r="3" />
          </g>

          {/* Outer QFN Package Substrate */}
          <rect
            x="134"
            y="18"
            width="152"
            height="120"
            rx="4"
            fill="#EDF3EB"
            stroke="#047A48"
            strokeWidth="1.2"
          />

          {/* Top & Bottom Pin Arrays */}
          {[150, 168, 186, 204, 222, 240, 258, 270].map((px) => (
            <g key={px} fill="#047A48" fillOpacity="0.45">
              <rect x={px} y="14" width="6" height="4" rx="0.5" />
              <rect x={px} y="138" width="6" height="4" rx="0.5" />
            </g>
          ))}

          {/* Inner Silicon Die */}
          <rect
            x="150"
            y="32"
            width="120"
            height="92"
            rx="2"
            fill="#132219"
            stroke="#047A48"
            strokeWidth="1"
          />

          {/* Die Subsystem Blocks */}
          <rect
            x="158"
            y="40"
            width="50"
            height="34"
            rx="1.5"
            fill="#1B3023"
            stroke="#4CC13B"
            strokeOpacity="0.5"
            strokeWidth="0.8"
          />
          <text
            x="183"
            y="55"
            textAnchor="middle"
            fill="#F7F9F5"
            fontSize="7"
            fontFamily="IBM Plex Mono, monospace"
            letterSpacing="0.06em"
          >
            PhytoNPU
          </text>
          <text
            x="183"
            y="66"
            textAnchor="middle"
            fill="#4CC13B"
            fontSize="6"
            fontFamily="IBM Plex Mono, monospace"
          >
            0.8 TOPS
          </text>

          <rect
            x="214"
            y="40"
            width="48"
            height="34"
            rx="1.5"
            fill="#1B3023"
            stroke="#D4E1D1"
            strokeOpacity="0.35"
            strokeWidth="0.8"
          />
          <text
            x="238"
            y="55"
            textAnchor="middle"
            fill="#F7F9F5"
            fontSize="7"
            fontFamily="IBM Plex Mono, monospace"
          >
            RV32IMAC
          </text>
          <text
            x="238"
            y="66"
            textAnchor="middle"
            fill="#9BB0A1"
            fontSize="6"
            fontFamily="IBM Plex Mono, monospace"
          >
            DUAL-CORE
          </text>

          <rect
            x="158"
            y="80"
            width="104"
            height="36"
            rx="1.5"
            fill="#182B20"
            stroke="#D4E1D1"
            strokeOpacity="0.35"
            strokeWidth="0.8"
          />
          <text
            x="210"
            y="96"
            textAnchor="middle"
            fill="#F7F9F5"
            fontSize="7"
            fontFamily="IBM Plex Mono, monospace"
            letterSpacing="0.05em"
          >
            24-BIT SIGMA-DELTA AFE
          </text>
          <text
            x="210"
            y="108"
            textAnchor="middle"
            fill="#9BB0A1"
            fontSize="6"
            fontFamily="IBM Plex Mono, monospace"
          >
            EIS &middot; SAP FLOW &middot; 8-CH PAR/NDVI
          </text>

          {/* Left/Right Callout Labels */}
          <text
            x="26"
            y="36"
            fill="#47584E"
            fontSize="6.5"
            fontFamily="IBM Plex Mono, monospace"
          >
            EIS PROBE
          </text>
          <text
            x="26"
            y="62"
            fill="#47584E"
            fontSize="6.5"
            fontFamily="IBM Plex Mono, monospace"
          >
            CANOPY PAR
          </text>
          <text
            x="26"
            y="88"
            fill="#47584E"
            fontSize="6.5"
            fontFamily="IBM Plex Mono, monospace"
          >
            MPPT 1.6µA
          </text>

          <text
            x="394"
            y="36"
            textAnchor="end"
            fill="#47584E"
            fontSize="6.5"
            fontFamily="IBM Plex Mono, monospace"
          >
            SUB-GHZ LORA
          </text>
          <text
            x="394"
            y="72"
            textAnchor="end"
            fill="#47584E"
            fontSize="6.5"
            fontFamily="IBM Plex Mono, monospace"
          >
            BLE 5.4
          </text>
          <text
            x="394"
            y="110"
            textAnchor="end"
            fill="#47584E"
            fontSize="6.5"
            fontFamily="IBM Plex Mono, monospace"
          >
            STATE VECTOR
          </text>
        </svg>
      </div>

      {/* Field State Selector Tabs */}
      <div
        className="grid grid-cols-3 border-b border-[#D4E1D1] bg-[#F7F9F5]"
        role="tablist"
        aria-label="Select field physiological state"
      >
        {STATE_ORDER.map((key, idx) => {
          const item = FIELD_STATES[key];
          const isActive = activeKey === key;
          return (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveKey(key)}
              className={`px-2.5 py-2.5 text-center font-mono text-[10.5px] leading-tight tracking-[0.04em] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#047A48] ${
                idx < 2 ? 'border-r border-[#D4E1D1]' : ''
              } ${
                isActive
                  ? 'bg-[#FFFFFF] font-medium text-[#047A48] shadow-[inset_0_-2px_0_#047A48]'
                  : 'text-[#47584E] hover:bg-[#EDF3EB]/50 hover:text-[#132219]'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {/* Physiological Readout + Waveform */}
      <div className="p-5">
        <div className="grid grid-cols-3 gap-3 border-b border-[#D4E1D1] pb-4">
          <div>
            <div className="font-mono text-[10px] tracking-[0.1em] uppercase text-[#47584E]">
              Canopy VPD
            </div>
            <div className="mt-1 font-mono text-base font-medium text-[#132219] transition-all duration-300">
              {current.vpd}
            </div>
          </div>

          <div className="border-l border-[#D4E1D1] pl-3">
            <div className="font-mono text-[10px] tracking-[0.1em] uppercase text-[#47584E]">
              Root-Zone EIS
            </div>
            <div className="mt-1 font-mono text-base font-medium text-[#132219] transition-all duration-300">
              {current.impedance}
            </div>
          </div>

          <div className="border-l border-[#D4E1D1] pl-3">
            <div className="font-mono text-[10px] tracking-[0.1em] uppercase text-[#47584E]">
              Stomatal Idx
            </div>
            <div className="mt-1 font-mono text-base font-medium text-[#132219] transition-all duration-300">
              {current.stomatalIndex}
            </div>
          </div>
        </div>

        {/* Subtle Dual-Channel Waveform */}
        <div className="mt-4 rounded-sm border border-[#D4E1D1] bg-[#F7F9F5] px-3 py-2.5">
          <div className="mb-1.5 flex items-center justify-between font-mono text-[10px] tracking-[0.08em] uppercase text-[#47584E]">
            <span>EIS Phase / Stomatal Trace</span>
            <span>{current.radioDuty}</span>
          </div>
          <svg
            viewBox="0 0 380 96"
            className="h-20 w-full overflow-visible"
            aria-hidden="true"
          >
            {/* Horizontal reference rules */}
            <line x1="0" y1="24" x2="380" y2="24" stroke="#D4E1D1" strokeWidth="0.75" strokeDasharray="3 3" />
            <line x1="0" y1="52" x2="380" y2="52" stroke="#D4E1D1" strokeWidth="0.75" />
            <line x1="0" y1="80" x2="380" y2="80" stroke="#D4E1D1" strokeWidth="0.75" strokeDasharray="3 3" />

            {/* Secondary baseline trace */}
            <path
              d={current.secondaryWave}
              fill="none"
              stroke="#47584E"
              strokeOpacity="0.35"
              strokeWidth="1.25"
              className="transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
            />

            {/* Primary physiological trace */}
            <path
              d={current.primaryWave}
              fill="none"
              stroke={current.statusTone === 'nominal' ? '#047A48' : '#9A4D09'}
              strokeWidth="1.75"
              strokeLinecap="round"
              className="transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
            />
          </svg>
        </div>

        {/* On-Chip Inference Status Line */}
        <div className="mt-4 flex items-center justify-between rounded-sm bg-[#EDF3EB] px-3.5 py-2.5">
          <div className="flex items-center gap-2.5">
            <span
              className={`h-2 w-2 shrink-0 rounded-full ${
                current.statusTone === 'nominal' ? 'bg-[#4CC13B]' : 'bg-[#B45309]'
              }`}
              aria-hidden="true"
            />
            <span className="font-mono text-[11.5px] font-medium text-[#132219]">
              {current.statusText}
            </span>
          </div>
          <span className="font-mono text-[10px] tracking-[0.1em] uppercase text-[#47584E]">
            INT8
          </span>
        </div>
      </div>
    </div>
  );
}
