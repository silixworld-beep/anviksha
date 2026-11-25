import { useState } from 'react';
import { CircuitDivider } from './CircuitDivider';

type SubsystemId = 'afe' | 'npu' | 'riscv' | 'pmic' | 'rf';

interface SubsystemSpec {
  id: SubsystemId;
  index: string;
  name: string;
  shortLabel: string;
  nodeTag: string;
  summary: string;
  keyMetrics: { label: string; value: string }[];
  replaces: string;
  /** Trace IDs highlighted in #4CC13B when this block is active */
  activeTraces: string[];
}

const SUBSYSTEMS: Record<SubsystemId, SubsystemSpec> = {
  afe: {
    id: 'afe',
    index: 'BLK-01',
    name: '24-Bit Mixed-Signal AFE',
    shortLabel: '24-Bit Mixed-Signal AFE',
    nodeTag: 'EIS · SAP FLOW · 8-CH OPTICAL',
    summary:
      'Programmable-gain 24-bit Sigma-Delta ADC front-end engineered for multi-frequency Soil Electrochemical Impedance Spectroscopy (EIS), thermal-pulse sap flow, leaf wetness capacitance, and 8-channel PAR/NDVI photodiode readout.',
    keyMetrics: [
      { label: 'Resolution', value: '24-bit ΔΣ (118 dB SNR)' },
      { label: 'EIS Sweep', value: '100 Hz – 100 kHz' },
      { label: 'Optical Channels', value: '8-ch PAR / NDVI / NIR' },
      { label: 'Input Leakage', value: '< 15 pA @ 25 °C' },
    ],
    replaces:
      'Replaces 6 discrete external ICs: standalone EIS impedance analyzer, precision instrumentation op-amps, 24-bit ADC, photodiode TIA array, and analog multiplexer.',
    activeTraces: ['afe-npu', 'afe-riscv', 'pmic-afe'],
  },
  npu: {
    id: 'npu',
    index: 'BLK-02',
    name: 'PhytoNPU (0.8 TOPS INT8)',
    shortLabel: 'PhytoNPU',
    nodeTag: '0.8 TOPS INT8 · ON-DIE AI',
    summary:
      'Dedicated edge neural accelerator running quantized temporal CNNs and impedance anomaly models directly on-die. Resolves pre-symptomatic water deficit and salinity drift 48–72 hours before visible chlorosis.',
    keyMetrics: [
      { label: 'Peak Throughput', value: '0.8 TOPS (INT8)' },
      { label: 'Inference Latency', value: '14 ms per state vector' },
      { label: 'On-Die Weight SRAM', value: '512 KB retained' },
      { label: 'Energy / Inference', value: '42 µJ' },
    ],
    replaces:
      'Eliminates cloud-dependent raw-telemetry pipelines and external MCU/DSP co-processors, transmitting compressed physiological state vectors instead of noisy raw frames.',
    activeTraces: ['afe-npu', 'npu-riscv', 'pmic-npu'],
  },
  riscv: {
    id: 'riscv',
    index: 'BLK-03',
    name: 'Dual-Core RISC-V Host',
    shortLabel: 'Dual-Core RISC-V',
    nodeTag: 'RV32IMAC · PHYTOOS',
    summary:
      'Asymmetric dual-core RV32IMAC subsystem managing deterministic sensor scheduling, calibration coefficients, and the PhytoOS runtime while gating power domains across unused peripherals.',
    keyMetrics: [
      { label: 'ISA', value: 'Dual RV32IMAC @ 96 MHz' },
      { label: 'Embedded Flash / SRAM', value: '2 MB / 384 KB ECC' },
      { label: 'Wake-Up Latency', value: '< 18 µs from deep sleep' },
      { label: 'Security', value: 'Hardware RoT + AES-256' },
    ],
    replaces:
      'Replaces an external host microcontroller, external SPI NOR flash, and discrete RTC/watchdog supervisor.',
    activeTraces: ['afe-riscv', 'npu-riscv', 'riscv-rf', 'pmic-riscv'],
  },
  pmic: {
    id: 'pmic',
    index: 'BLK-04',
    name: 'MPPT Solar PMIC',
    shortLabel: 'MPPT Solar PMIC',
    nodeTag: '1.6 µA SLEEP · HARVESTING',
    summary:
      'On-die Maximum Power Point Tracking (MPPT) micro-solar harvesting controller and multi-rail LDO/buck regulator built on 22nm FD-SOI ultra-low-leakage transistors for multi-year autonomous field operation.',
    keyMetrics: [
      { label: 'Deep-Sleep Current', value: '1.6 µA (RTC + SRAM)' },
      { label: 'Cold-Start Voltage', value: '380 mV solar input' },
      { label: 'MPPT Efficiency', value: '94.2% @ 100 µW–50 mW' },
      { label: 'Domain Isolation', value: '5 independent power islands' },
    ],
    replaces:
      'Replaces external solar MPPT charger ICs, discrete buck-boost converters, and external supercapacitor balancing circuits.',
    activeTraces: ['pmic-afe', 'pmic-npu', 'pmic-riscv', 'pmic-rf'],
  },
  rf: {
    id: 'rf',
    index: 'BLK-05',
    name: 'Sub-GHz LoRa + BLE 5.4 RF',
    shortLabel: 'Sub-GHz + BLE 5.4',
    nodeTag: '868/915 MHZ · ZERO-TOUCH',
    summary:
      'Integrated Sub-GHz LoRa/FSK baseband with +14 dBm PA for kilometer-scale field uplinks, paired with BLE 5.4 for zero-touch mobile commissioning and local diagnostics.',
    keyMetrics: [
      { label: 'Link Budget', value: '152 dB (Sub-GHz LoRa)' },
      { label: 'Radio Duty Reduction', value: '84% via PhytoOS vectors' },
      { label: 'Commissioning', value: 'BLE 5.4 zero-touch' },
      { label: 'Protocol Output', value: 'MQTT / REST bridge' },
    ],
    replaces:
      'Replaces separate Sub-GHz LoRa transceiver modules, standalone BLE commissioning chips, and external RF matching networks.',
    activeTraces: ['riscv-rf', 'pmic-rf'],
  },
};

const COMPARISON_ROWS = [
  {
    parameter: 'BOM Component Count',
    conventional: '6+ discrete ICs + 42 passives',
    anviksha: '1 ANV-S1 SoC + 11 passives',
  },
  {
    parameter: 'Standby / Deep-Sleep Current',
    conventional: '45–180 µA across discrete rails',
    anviksha: '1.6 µA (on-die MPPT PMIC active)',
  },
  {
    parameter: 'Radio Payload Overhead',
    conventional: '100% raw noisy telemetry frames',
    anviksha: '16% compressed state vectors (-84% duty)',
  },
  {
    parameter: 'Field Battery Life',
    conventional: '6–14 months (manual cell swap)',
    anviksha: '5+ years autonomous (solar bezel)',
  },
  {
    parameter: 'Local Inference Latency',
    conventional: 'None (cloud round-trip 2–15 s)',
    anviksha: '14 ms on-die INT8 PhytoNPU',
  },
] as const;

export function SiliconSection() {
  const [selectedId, setSelectedId] = useState<SubsystemId>('npu');
  const activeSpec = SUBSYSTEMS[selectedId];

  const isTraceActive = (traceId: string) => activeSpec.activeTraces.includes(traceId);

  const handleKeyDown = (e: React.KeyboardEvent, id: SubsystemId) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setSelectedId(id);
    }
  };

  return (
    <section id="silicon" className="relative bg-[#F7F9F5] py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <CircuitDivider index="01" label="SILICON ARCHITECTURE" />

        {/* Section Editorial Intro */}
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="font-mono text-[11px] font-medium tracking-[0.14em] uppercase text-[#047A48]">
              ANV-S1 PLANT-SENSING SOC &middot; 22NM FD-SOI
            </p>
            <h2 className="mt-3 font-display text-3xl leading-[1.12] font-normal tracking-[-0.025em] text-[#132219] sm:text-4xl">
              Six discrete board functions, consolidated onto one 22nm die.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-sm leading-[1.65] text-[#47584E] sm:text-[15px]">
              Select any subsystem block on the ANV-S1 floorplan to inspect its signal
              routing, electrical budget, and the board-level components it eliminates.
            </p>
          </div>
        </div>

        {/* 1. Interactive ANV-S1 Die & Subsystem Floorplan + Spec Panel */}
        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left 7 Cols: Interactive SVG Floorplan */}
          <div
            className="rounded-sm border border-[#D9E4D7] bg-[#FFFFFF] p-4 sm:p-6 lg:col-span-7"
            style={{ boxShadow: 'var(--anv-shadow-ambient)' }}
          >
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-[#D4E1D1] pb-3">
              <span className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-[#3A3D3B]">
                FIG 1.1 &mdash; ANV-S1 DIE FLOORPLAN (7 &times; 7 MM QFN-48)
              </span>
              <span className="font-mono text-[10.5px] tracking-[0.08em] text-[#47584E]">
                CLICK OR HOVER BLOCK TO TRACE
              </span>
            </div>

            <div className="relative overflow-hidden rounded-sm border border-[#D4E1D1] bg-[#F7F9F5] p-3 sm:p-4">
              <svg
                viewBox="0 0 640 420"
                className="h-auto w-full select-none"
                role="group"
                aria-label="Interactive ANV-S1 SoC die floorplan"
              >
                <defs>
                  <pattern
                    id="silicon-draft-grid"
                    width="24"
                    height="24"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 24 0 L 0 0 0 24"
                      fill="none"
                      stroke="#D4E1D1"
                      strokeWidth="0.6"
                      strokeOpacity="0.65"
                    />
                  </pattern>
                </defs>

                {/* Substrate Drafting Grid */}
                <rect x="0" y="0" width="640" height="420" fill="url(#silicon-draft-grid)" />

                {/* Outer Die Boundary Frame */}
                <rect
                  x="28"
                  y="24"
                  width="584"
                  height="372"
                  rx="4"
                  fill="#FFFFFF"
                  fillOpacity="0.72"
                  stroke="#047A48"
                  strokeWidth="1.25"
                />

                {/* Top & Bottom I/O Bond Pad Rings */}
                {Array.from({ length: 14 }).map((_, i) => {
                  const x = 66 + i * 38;
                  return (
                    <g key={x} fill="#EDF3EB" stroke="#047A48" strokeWidth="0.8">
                      <rect x={x} y="16" width="12" height="8" rx="1" />
                      <rect x={x} y="396" width="12" height="8" rx="1" />
                    </g>
                  );
                })}

                {/* Inter-Block Signal & Power Traces */}
                {/* AFE -> PhytoNPU */}
                <path
                  d="M 228 112 H 294"
                  fill="none"
                  stroke={isTraceActive('afe-npu') ? '#4CC13B' : '#D4E1D1'}
                  strokeWidth={isTraceActive('afe-npu') ? '2.5' : '1.4'}
                  className="transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
                />
                {/* AFE -> RISC-V */}
                <path
                  d="M 140 198 V 224 H 294"
                  fill="none"
                  stroke={isTraceActive('afe-riscv') ? '#4CC13B' : '#D4E1D1'}
                  strokeWidth={isTraceActive('afe-riscv') ? '2.5' : '1.4'}
                  className="transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
                />
                {/* PhytoNPU <-> RISC-V */}
                <path
                  d="M 384 172 V 214"
                  fill="none"
                  stroke={isTraceActive('npu-riscv') ? '#4CC13B' : '#D4E1D1'}
                  strokeWidth={isTraceActive('npu-riscv') ? '2.5' : '1.4'}
                  className="transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
                />
                {/* RISC-V -> Sub-GHz + BLE RF */}
                <path
                  d="M 474 282 H 504 V 206"
                  fill="none"
                  stroke={isTraceActive('riscv-rf') ? '#4CC13B' : '#D4E1D1'}
                  strokeWidth={isTraceActive('riscv-rf') ? '2.5' : '1.4'}
                  className="transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
                />
                {/* MPPT PMIC -> AFE */}
                <path
                  d="M 140 244 V 198"
                  fill="none"
                  stroke={isTraceActive('pmic-afe') ? '#4CC13B' : '#D4E1D1'}
                  strokeWidth={isTraceActive('pmic-afe') ? '2.5' : '1.4'}
                  strokeDasharray={isTraceActive('pmic-afe') ? 'none' : '4 3'}
                  className="transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
                />
                {/* MPPT PMIC -> RISC-V */}
                <path
                  d="M 228 308 H 294"
                  fill="none"
                  stroke={isTraceActive('pmic-riscv') ? '#4CC13B' : '#D4E1D1'}
                  strokeWidth={isTraceActive('pmic-riscv') ? '2.5' : '1.4'}
                  strokeDasharray={isTraceActive('pmic-riscv') ? 'none' : '4 3'}
                  className="transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
                />
                {/* MPPT PMIC -> PhytoNPU */}
                <path
                  d="M 228 286 H 262 V 144 H 294"
                  fill="none"
                  stroke={isTraceActive('pmic-npu') ? '#4CC13B' : '#D4E1D1'}
                  strokeWidth={isTraceActive('pmic-npu') ? '2.5' : '1.4'}
                  strokeDasharray={isTraceActive('pmic-npu') ? 'none' : '4 3'}
                  className="transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
                />
                {/* MPPT PMIC -> RF */}
                <path
                  d="M 228 336 H 542 V 206"
                  fill="none"
                  stroke={isTraceActive('pmic-rf') ? '#4CC13B' : '#D4E1D1'}
                  strokeWidth={isTraceActive('pmic-rf') ? '2.5' : '1.4'}
                  strokeDasharray={isTraceActive('pmic-rf') ? 'none' : '4 3'}
                  className="transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
                />

                {/* Hollow Circular Via Nodes at Trace Junctions */}
                {[
                  { cx: 262, cy: 112, active: isTraceActive('afe-npu') },
                  { cx: 262, cy: 144, active: isTraceActive('pmic-npu') },
                  { cx: 262, cy: 224, active: isTraceActive('afe-riscv') },
                  { cx: 384, cy: 193, active: isTraceActive('npu-riscv') },
                  { cx: 504, cy: 282, active: isTraceActive('riscv-rf') },
                  { cx: 542, cy: 336, active: isTraceActive('pmic-rf') },
                ].map((via, idx) => (
                  <circle
                    key={idx}
                    cx={via.cx}
                    cy={via.cy}
                    r="4"
                    fill="#F7F9F5"
                    stroke={via.active ? '#4CC13B' : '#047A48'}
                    strokeWidth="1.5"
                    className="transition-colors duration-300"
                  />
                ))}

                {/* BLOCK 1: 24-Bit Mixed-Signal AFE */}
                <g
                  role="button"
                  tabIndex={0}
                  aria-pressed={selectedId === 'afe'}
                  aria-label="24-Bit Mixed-Signal AFE"
                  onClick={() => setSelectedId('afe')}
                  onMouseEnter={() => setSelectedId('afe')}
                  onKeyDown={(e) => handleKeyDown(e, 'afe')}
                  className="cursor-pointer focus:outline-none"
                >
                  <rect
                    x="54"
                    y="52"
                    width="174"
                    height="146"
                    rx="3"
                    fill={selectedId === 'afe' ? '#EDF3EB' : '#FFFFFF'}
                    stroke={selectedId === 'afe' ? '#047A48' : '#D4E1D1'}
                    strokeWidth={selectedId === 'afe' ? '2' : '1.25'}
                    className="transition-all duration-200"
                  />
                  <text
                    x="68"
                    y="76"
                    fill="#047A48"
                    fontSize="9.5"
                    fontFamily="IBM Plex Mono, monospace"
                    fontWeight="500"
                  >
                    BLK-01
                  </text>
                  <text
                    x="68"
                    y="102"
                    fill="#132219"
                    fontSize="13.5"
                    fontFamily="Fraunces, Georgia, serif"
                    fontWeight="500"
                  >
                    24-Bit Mixed-Signal
                  </text>
                  <text
                    x="68"
                    y="120"
                    fill="#132219"
                    fontSize="13.5"
                    fontFamily="Fraunces, Georgia, serif"
                    fontWeight="500"
                  >
                    AFE
                  </text>
                  <text
                    x="68"
                    y="148"
                    fill="#47584E"
                    fontSize="9"
                    fontFamily="IBM Plex Mono, monospace"
                  >
                    EIS · SAP FLOW
                  </text>
                  <text
                    x="68"
                    y="163"
                    fill="#47584E"
                    fontSize="9"
                    fontFamily="IBM Plex Mono, monospace"
                  >
                    8-CH PAR / NDVI
                  </text>
                  <circle
                    cx="212"
                    cy="72"
                    r="3.5"
                    fill={selectedId === 'afe' ? '#4CC13B' : '#F7F9F5'}
                    stroke="#047A48"
                    strokeWidth="1.25"
                  />
                </g>

                {/* BLOCK 2: PhytoNPU (0.8 TOPS INT8) */}
                <g
                  role="button"
                  tabIndex={0}
                  aria-pressed={selectedId === 'npu'}
                  aria-label="PhytoNPU 0.8 TOPS INT8"
                  onClick={() => setSelectedId('npu')}
                  onMouseEnter={() => setSelectedId('npu')}
                  onKeyDown={(e) => handleKeyDown(e, 'npu')}
                  className="cursor-pointer focus:outline-none"
                >
                  <rect
                    x="294"
                    y="52"
                    width="180"
                    height="120"
                    rx="3"
                    fill={selectedId === 'npu' ? '#EDF3EB' : '#FFFFFF'}
                    stroke={selectedId === 'npu' ? '#047A48' : '#D4E1D1'}
                    strokeWidth={selectedId === 'npu' ? '2' : '1.25'}
                    className="transition-all duration-200"
                  />
                  <text
                    x="308"
                    y="76"
                    fill="#047A48"
                    fontSize="9.5"
                    fontFamily="IBM Plex Mono, monospace"
                    fontWeight="500"
                  >
                    BLK-02
                  </text>
                  <text
                    x="308"
                    y="102"
                    fill="#132219"
                    fontSize="14"
                    fontFamily="Fraunces, Georgia, serif"
                    fontWeight="500"
                  >
                    PhytoNPU
                  </text>
                  <text
                    x="308"
                    y="124"
                    fill="#047A48"
                    fontSize="10"
                    fontFamily="IBM Plex Mono, monospace"
                    fontWeight="500"
                  >
                    0.8 TOPS INT8
                  </text>
                  <text
                    x="308"
                    y="146"
                    fill="#47584E"
                    fontSize="9"
                    fontFamily="IBM Plex Mono, monospace"
                  >
                    TEMPORAL CNN · 14 MS
                  </text>
                  <circle
                    cx="458"
                    cy="72"
                    r="3.5"
                    fill={selectedId === 'npu' ? '#4CC13B' : '#F7F9F5'}
                    stroke="#047A48"
                    strokeWidth="1.25"
                  />
                </g>

                {/* BLOCK 3: Dual-Core RISC-V Host */}
                <g
                  role="button"
                  tabIndex={0}
                  aria-pressed={selectedId === 'riscv'}
                  aria-label="Dual-Core RISC-V Host"
                  onClick={() => setSelectedId('riscv')}
                  onMouseEnter={() => setSelectedId('riscv')}
                  onKeyDown={(e) => handleKeyDown(e, 'riscv')}
                  className="cursor-pointer focus:outline-none"
                >
                  <rect
                    x="294"
                    y="214"
                    width="180"
                    height="108"
                    rx="3"
                    fill={selectedId === 'riscv' ? '#EDF3EB' : '#FFFFFF'}
                    stroke={selectedId === 'riscv' ? '#047A48' : '#D4E1D1'}
                    strokeWidth={selectedId === 'riscv' ? '2' : '1.25'}
                    className="transition-all duration-200"
                  />
                  <text
                    x="308"
                    y="238"
                    fill="#047A48"
                    fontSize="9.5"
                    fontFamily="IBM Plex Mono, monospace"
                    fontWeight="500"
                  >
                    BLK-03
                  </text>
                  <text
                    x="308"
                    y="264"
                    fill="#132219"
                    fontSize="13.5"
                    fontFamily="Fraunces, Georgia, serif"
                    fontWeight="500"
                  >
                    Dual-Core RISC-V
                  </text>
                  <text
                    x="308"
                    y="286"
                    fill="#47584E"
                    fontSize="9"
                    fontFamily="IBM Plex Mono, monospace"
                  >
                    RV32IMAC · PHYTOOS
                  </text>
                  <text
                    x="308"
                    y="301"
                    fill="#47584E"
                    fontSize="9"
                    fontFamily="IBM Plex Mono, monospace"
                  >
                    2MB FLASH · 384KB ECC
                  </text>
                  <circle
                    cx="458"
                    cy="234"
                    r="3.5"
                    fill={selectedId === 'riscv' ? '#4CC13B' : '#F7F9F5'}
                    stroke="#047A48"
                    strokeWidth="1.25"
                  />
                </g>

                {/* BLOCK 4: MPPT Solar PMIC */}
                <g
                  role="button"
                  tabIndex={0}
                  aria-pressed={selectedId === 'pmic'}
                  aria-label="MPPT Solar PMIC"
                  onClick={() => setSelectedId('pmic')}
                  onMouseEnter={() => setSelectedId('pmic')}
                  onKeyDown={(e) => handleKeyDown(e, 'pmic')}
                  className="cursor-pointer focus:outline-none"
                >
                  <rect
                    x="54"
                    y="244"
                    width="174"
                    height="122"
                    rx="3"
                    fill={selectedId === 'pmic' ? '#EDF3EB' : '#FFFFFF'}
                    stroke={selectedId === 'pmic' ? '#047A48' : '#D4E1D1'}
                    strokeWidth={selectedId === 'pmic' ? '2' : '1.25'}
                    className="transition-all duration-200"
                  />
                  <text
                    x="68"
                    y="268"
                    fill="#047A48"
                    fontSize="9.5"
                    fontFamily="IBM Plex Mono, monospace"
                    fontWeight="500"
                  >
                    BLK-04
                  </text>
                  <text
                    x="68"
                    y="294"
                    fill="#132219"
                    fontSize="13.5"
                    fontFamily="Fraunces, Georgia, serif"
                    fontWeight="500"
                  >
                    MPPT Solar PMIC
                  </text>
                  <text
                    x="68"
                    y="316"
                    fill="#047A48"
                    fontSize="10"
                    fontFamily="IBM Plex Mono, monospace"
                    fontWeight="500"
                  >
                    1.6 µA DEEP SLEEP
                  </text>
                  <text
                    x="68"
                    y="336"
                    fill="#47584E"
                    fontSize="9"
                    fontFamily="IBM Plex Mono, monospace"
                  >
                    ZERO-EXT HARVESTING
                  </text>
                  <circle
                    cx="212"
                    cy="264"
                    r="3.5"
                    fill={selectedId === 'pmic' ? '#4CC13B' : '#F7F9F5'}
                    stroke="#047A48"
                    strokeWidth="1.25"
                  />
                </g>

                {/* BLOCK 5: Sub-GHz LoRa + BLE 5.4 RF */}
                <g
                  role="button"
                  tabIndex={0}
                  aria-pressed={selectedId === 'rf'}
                  aria-label="Sub-GHz LoRa and BLE 5.4 RF"
                  onClick={() => setSelectedId('rf')}
                  onMouseEnter={() => setSelectedId('rf')}
                  onKeyDown={(e) => handleKeyDown(e, 'rf')}
                  className="cursor-pointer focus:outline-none"
                >
                  <rect
                    x="496"
                    y="52"
                    width="94"
                    height="154"
                    rx="3"
                    fill={selectedId === 'rf' ? '#EDF3EB' : '#FFFFFF'}
                    stroke={selectedId === 'rf' ? '#047A48' : '#D4E1D1'}
                    strokeWidth={selectedId === 'rf' ? '2' : '1.25'}
                    className="transition-all duration-200"
                  />
                  <text
                    x="508"
                    y="76"
                    fill="#047A48"
                    fontSize="9.5"
                    fontFamily="IBM Plex Mono, monospace"
                    fontWeight="500"
                  >
                    BLK-05
                  </text>
                  <text
                    x="508"
                    y="102"
                    fill="#132219"
                    fontSize="13"
                    fontFamily="Fraunces, Georgia, serif"
                    fontWeight="500"
                  >
                    Sub-GHz
                  </text>
                  <text
                    x="508"
                    y="119"
                    fill="#132219"
                    fontSize="13"
                    fontFamily="Fraunces, Georgia, serif"
                    fontWeight="500"
                  >
                    + BLE 5.4
                  </text>
                  <text
                    x="508"
                    y="148"
                    fill="#47584E"
                    fontSize="8.5"
                    fontFamily="IBM Plex Mono, monospace"
                  >
                    LORA / FSK
                  </text>
                  <text
                    x="508"
                    y="164"
                    fill="#47584E"
                    fontSize="8.5"
                    fontFamily="IBM Plex Mono, monospace"
                  >
                    +14 DBM PA
                  </text>
                  <text
                    x="508"
                    y="180"
                    fill="#47584E"
                    fontSize="8.5"
                    fontFamily="IBM Plex Mono, monospace"
                  >
                    VECTOR TX
                  </text>
                  <circle
                    cx="574"
                    cy="72"
                    r="3.5"
                    fill={selectedId === 'rf' ? '#4CC13B' : '#F7F9F5'}
                    stroke="#047A48"
                    strokeWidth="1.25"
                  />
                </g>
              </svg>
            </div>
          </div>

          {/* Right 5 Cols: Detailed Engineering Specification Panel */}
          <div
            className="flex flex-col justify-between rounded-sm border border-[#D9E4D7] bg-[#FFFFFF] p-6 lg:col-span-5"
            style={{ boxShadow: 'var(--anv-shadow-ambient)' }}
          >
            <div>
              <div className="flex items-center justify-between border-b border-[#D4E1D1] pb-3">
                <span className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-[#047A48]">
                  {activeSpec.index} &middot; {activeSpec.nodeTag}
                </span>
                <span className="h-2 w-2 rounded-full bg-[#4CC13B]" aria-hidden="true" />
              </div>

              <h3 className="mt-4 font-display text-2xl font-medium tracking-[-0.02em] text-[#132219]">
                {activeSpec.name}
              </h3>

              <p className="mt-3 text-sm leading-[1.65] text-[#47584E]">
                {activeSpec.summary}
              </p>

              {/* Key Architecture Specs Grid */}
              <dl className="mt-6 grid grid-cols-2 gap-3 border-t border-[#D4E1D1] pt-5">
                {activeSpec.keyMetrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-sm border border-[#D9E4D7] bg-[#F7F9F5] px-3.5 py-2.5"
                  >
                    <dt className="font-mono text-[10px] tracking-[0.08em] uppercase text-[#47584E]">
                      {metric.label}
                    </dt>
                    <dd className="mt-1 font-mono text-xs font-medium text-[#132219] sm:text-[13px]">
                      {metric.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Discrete Component Replacement Callout */}
            <div className="mt-6 rounded-sm border border-[#D4E1D1] bg-[#EDF3EB] p-4">
              <div className="font-mono text-[10px] font-medium tracking-[0.12em] uppercase text-[#047A48]">
                BOARD-LEVEL CONSOLIDATION
              </div>
              <p className="mt-1.5 text-[13px] leading-relaxed text-[#132219]">
                {activeSpec.replaces}
              </p>
            </div>
          </div>
        </div>

        {/* 2. Compact Engineering Comparison Strip */}
        <div
          className="mt-12 overflow-hidden rounded-sm border border-[#D9E4D7] bg-[#FFFFFF]"
          style={{ boxShadow: 'var(--anv-shadow-ambient)' }}
        >
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#D4E1D1] bg-[#EDF3EB]/60 px-5 py-3">
            <span className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-[#132219]">
              TABLE 1.1 &mdash; SYSTEM-LEVEL BENCHMARK
            </span>
            <span className="font-mono text-[10.5px] tracking-[0.08em] uppercase text-[#47584E]">
              FIELD NODE ARCHITECTURE COMPARISON
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-[#D4E1D1] bg-[#F7F9F5]">
                  <th className="px-5 py-3 font-mono text-[10.5px] font-medium tracking-[0.1em] uppercase text-[#47584E]">
                    Parameter
                  </th>
                  <th className="border-l border-[#D4E1D1] px-5 py-3 font-mono text-[10.5px] font-medium tracking-[0.1em] uppercase text-[#47584E]">
                    Conventional Multi-Chip Agritech Boards
                  </th>
                  <th className="border-l border-[#D4E1D1] bg-[#EDF3EB]/50 px-5 py-3 font-mono text-[10.5px] font-medium tracking-[0.1em] uppercase text-[#047A48]">
                    Anviksha ANV-S1 Single-Chip SoC
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D4E1D1]">
                {COMPARISON_ROWS.map((row) => (
                  <tr key={row.parameter} className="transition-colors hover:bg-[#F7F9F5]/70">
                    <td className="px-5 py-3.5 text-sm font-medium text-[#132219]">
                      {row.parameter}
                    </td>
                    <td className="border-l border-[#D4E1D1] px-5 py-3.5 font-mono text-xs text-[#47584E] sm:text-[13px]">
                      {row.conventional}
                    </td>
                    <td className="border-l border-[#D4E1D1] bg-[#EDF3EB]/30 px-5 py-3.5 font-mono text-xs font-medium text-[#132219] sm:text-[13px]">
                      {row.anviksha}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
