import { useState } from 'react';
import { CircuitDivider } from './CircuitDivider';

type DeploymentId = 'cea' | 'vineyards' | 'phenotyping' | 'nurseries';

interface DeploymentProfile {
  id: DeploymentId;
  name: string;
  code: string;
  subtitle: string;
  summary: string;
  nodeDensity: string;
  primaryPhysiology: string;
  controllerIntegration: string;
  inputReduction: string;
  architectureNote: string;
}

const DEPLOYMENTS: DeploymentProfile[] = [
  {
    id: 'cea',
    name: 'Controlled Greenhouses (CEA)',
    code: 'ENV-01 · CEA',
    subtitle: 'High-value tomato, bell pepper, and leafy-green glasshouses',
    summary:
      'Synchronizes stomatal conductance and root-zone slab EC directly with automated shade curtains, CO₂ dosing, and recirculating drip manifolds.',
    nodeDensity: '4–8 nodes / hectare (1 per irrigation valve zone)',
    primaryPhysiology: 'Stomatal conductance index, slab EIS salinity, canopy VPD & PAR',
    controllerIntegration: 'Native MQTT / REST bridge to Priva, Hoogendoorn, & Ridder',
    inputReduction: '22–31% water & fertigation savings; 18% lower dehumidification load',
    architectureNote:
      'Sub-minute PhytoNPU inference prevents midday vapor-pressure-deficit lockup without over-irrigating rockwool or coco-coir slabs.',
  },
  {
    id: 'vineyards',
    name: 'Vineyards & Orchards',
    code: 'ENV-02 · PERENNIAL',
    subtitle: 'Regulated deficit irrigation for wine grapes, almonds, and citrus',
    summary:
      'Maintains controlled pre-veraison water stress with dual-depth root impedance while guarding against irreversible xylem cavitation during heatwaves.',
    nodeDensity: '1–2 nodes / hectare across soil-texture management zones',
    primaryPhysiology: 'Dual-depth root EIS (-15 cm / -45 cm), sap thermal pulse, canopy NDVI',
    controllerIntegration: 'Sub-GHz LoRa mesh to automated manifold solenoids & SCADA',
    inputReduction: '28–38% irrigation reduction with zero heat-event canopy scorch',
    architectureNote:
      '5-year solar-bezel autonomy eliminates seasonal battery maintenance across 40+ hectare hillside blocks.',
  },
  {
    id: 'phenotyping',
    name: 'Seed Phenotyping Trials',
    code: 'ENV-03 · R&D',
    subtitle: 'Breeding stations and drought/salinity-tolerance plot screening',
    summary:
      'Captures continuous, non-destructive physiological response curves across hundreds of micro-plots to rank cultivar resilience weeks earlier.',
    nodeDensity: '12–24 nodes / hectare (plot-level instrumentation)',
    primaryPhysiology: 'High-frequency EIS sweep (100 Hz–100 kHz), chlorophyll reflectance',
    controllerIntegration: 'REST / Parquet time-series export to breeding LIMS & R pipelines',
    inputReduction: '48–72h earlier stress separation; 65% fewer manual porometer walks',
    architectureNote:
      'Zero-trench single-auger installation lets trial teams relocate LeafNode N1 units cleanly between seasonal rotations.',
  },
  {
    id: 'nurseries',
    name: 'Commercial Nurseries',
    code: 'ENV-04 · PROPAGATION',
    subtitle: 'Containerized ornamentals, forestry seedlings, and grafted stock',
    summary:
      'Monitors container substrate moisture, root-zone salt accumulation, and misting microclimates to prevent fungal damping-off.',
    nodeDensity: '6–10 nodes / hectare across misting & shade benches',
    primaryPhysiology: 'Leaf wetness capacitance, substrate EC drift, root impedance',
    controllerIntegration: 'Open MQTT / Modbus TCP to mist-boom & pulse-fertigation valves',
    inputReduction: '25–34% water reduction; 40% fewer fungicide intervention cycles',
    architectureNote:
      'IP67 anodized aluminum housing withstands continuous overhead misting and high-salinity foliar feeds.',
  },
];

export function DeploymentsSection() {
  const [activeId, setActiveId] = useState<DeploymentId>('cea');
  const active = DEPLOYMENTS.find((d) => d.id === activeId) ?? DEPLOYMENTS[0];

  return (
    <section
      id="deployments"
      className="relative border-t border-[#D4E1D1] bg-[#F7F9F5] py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <CircuitDivider index="04" label="DEPLOYMENTS" />

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="font-mono text-[11px] font-medium tracking-[0.14em] uppercase text-[#047A48]">
              FIELD ENVIRONMENTS &middot; PRODUCTION ARCHITECTURES
            </p>
            <h2 className="mt-3 font-display text-3xl leading-[1.12] font-normal tracking-[-0.025em] text-[#132219] sm:text-4xl">
              Engineered for glasshouse precision and open-field resilience.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-sm leading-[1.65] text-[#47584E] sm:text-[15px]">
              Select a deployment environment to inspect node density, primary measured
              physiology, and closed-loop controller integration.
            </p>
          </div>
        </div>

        {/* Vertical Tab Selector + Architectural Showcase */}
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Left 4 Cols: Vertical Tab Rail */}
          <div
            className="flex flex-col divide-y divide-[#D4E1D1] rounded-sm border border-[#D9E4D7] bg-[#FFFFFF] lg:col-span-4"
            style={{ boxShadow: 'var(--anv-shadow-ambient)' }}
            role="tablist"
            aria-label="Deployment environments"
          >
            {DEPLOYMENTS.map((item) => {
              const isSelected = item.id === activeId;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveId(item.id)}
                  className={`flex items-start justify-between gap-3 px-5 py-4 text-left transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#047A48] ${
                    isSelected
                      ? 'bg-[#EDF3EB]/80 shadow-[inset_3px_0_0_#047A48]'
                      : 'hover:bg-[#F7F9F5]'
                  }`}
                >
                  <div>
                    <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-[#047A48]">
                      {item.code}
                    </div>
                    <div
                      className={`mt-1 font-display text-lg ${
                        isSelected ? 'font-medium text-[#132219]' : 'text-[#47584E]'
                      }`}
                    >
                      {item.name}
                    </div>
                  </div>
                  <span
                    className={`mt-2 h-[6px] w-[6px] shrink-0 rounded-full border-[1.5px] border-[#047A48] ${
                      isSelected ? 'bg-[#4CC13B]' : 'bg-[#F7F9F5]'
                    }`}
                    aria-hidden="true"
                  />
                </button>
              );
            })}
          </div>

          {/* Right 8 Cols: Active Deployment Specification Panel */}
          <div
            className="flex flex-col justify-between rounded-sm border border-[#D9E4D7] bg-[#FFFFFF] p-6 sm:p-8 lg:col-span-8"
            style={{ boxShadow: 'var(--anv-shadow-ambient)' }}
            role="tabpanel"
          >
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#D4E1D1] pb-4">
                <span className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-[#047A48]">
                  {active.code} &mdash; DEPLOYMENT PROFILE
                </span>
                <span className="font-mono text-[11px] text-[#47584E]">
                  {active.subtitle}
                </span>
              </div>

              <h3 className="mt-5 font-display text-2xl font-medium text-[#132219] sm:text-3xl">
                {active.name}
              </h3>
              <p className="mt-3 text-base leading-[1.65] text-[#47584E]">{active.summary}</p>

              {/* Hairline-Divided Datasheet Spec Matrix */}
              <dl className="mt-7 grid grid-cols-1 overflow-hidden rounded-sm border border-[#D4E1D1] sm:grid-cols-2">
                <div className="border-b border-[#D4E1D1] bg-[#F7F9F5]/65 p-4 sm:border-r">
                  <dt className="font-mono text-[10px] tracking-[0.1em] uppercase text-[#47584E]">
                    Node Density
                  </dt>
                  <dd className="mt-1.5 font-mono text-[13px] font-medium tabular-nums text-[#132219]">
                    {active.nodeDensity}
                  </dd>
                </div>

                <div className="border-b border-[#D4E1D1] bg-[#F7F9F5]/65 p-4">
                  <dt className="font-mono text-[10px] tracking-[0.1em] uppercase text-[#47584E]">
                    Primary Measured Physiology
                  </dt>
                  <dd className="mt-1.5 font-mono text-[13px] font-medium tabular-nums text-[#132219]">
                    {active.primaryPhysiology}
                  </dd>
                </div>

                <div className="border-b border-[#D4E1D1] bg-[#FFFFFF] p-4 sm:border-r sm:border-b-0">
                  <dt className="font-mono text-[10px] tracking-[0.1em] uppercase text-[#47584E]">
                    Controller Integration
                  </dt>
                  <dd className="mt-1.5 font-mono text-[13px] font-medium tabular-nums text-[#132219]">
                    {active.controllerIntegration}
                  </dd>
                </div>

                <div className="bg-[#EDF3EB]/85 p-4">
                  <dt className="font-mono text-[10px] tracking-[0.1em] uppercase text-[#047A48]">
                    Measured Resource Reduction
                  </dt>
                  <dd className="mt-1.5 font-mono text-[13px] font-medium tabular-nums text-[#132219]">
                    {active.inputReduction}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="mt-6 border-t border-[#D4E1D1] pt-4">
              <p className="text-sm leading-relaxed text-[#47584E]">
                <span className="font-mono text-[11px] font-medium tracking-[0.08em] uppercase text-[#132219]">
                  FIELD NOTE:{' '}
                </span>
                {active.architectureNote}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
