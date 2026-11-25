import { useState } from 'react';
import { CircuitDivider } from './CircuitDivider';

const KIT_CONTENTS = [
  {
    qty: '02×',
    item: 'LeafNode N1 Autonomous Field Units',
    spec: 'IP67 matte-sage Al-6061, solar bezel, dual-depth EIS probe',
  },
  {
    qty: '01×',
    item: 'ANV-S1 Breakout Development Board',
    spec: 'Exposed 24-bit AFE test headers, JTAG/SWD debug, current-sense shunt',
  },
  {
    qty: '01×',
    item: 'Sub-GHz USB Gateway',
    spec: '868 / 915 MHz LoRa/FSK bridge with local MQTT broker',
  },
  {
    qty: 'SDK',
    item: 'PhytoOS SDK & ANV-S1 Datasheet',
    spec: 'C/Rust HAL, quantized INT8 model weights, REST/MQTT reference',
  },
] as const;

export function EvaluationKitSection() {
  const [name, setName] = useState('');
  const [organization, setOrganization] = useState('');
  const [role, setRole] = useState('Agronomist');
  const [scale, setScale] = useState('Pilot Block (1–10 ha)');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="relative border-t border-[#D4E1D1] bg-[#F7F9F5] py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <CircuitDivider index="06" label="EVALUATION KIT & PILOT INQUIRY" />

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left 5 Cols: What Ships in the Evaluation Kit */}
          <div className="lg:col-span-5">
            <p className="font-mono text-[11px] font-medium tracking-[0.14em] uppercase text-[#047A48]">
              DEVELOPER EVALUATION KIT &middot; QFN-48 + FIELD NODES
            </p>
            <h2 className="mt-3 font-display text-3xl leading-[1.12] font-normal tracking-[-0.025em] text-[#132219] sm:text-4xl">
              ANV-S1 &amp; LeafNode N1 Evaluation Kit
            </h2>
            <p className="mt-4 text-sm leading-[1.65] text-[#47584E] sm:text-[15px]">
              Built for silicon partners, greenhouse engineering teams, and field agronomy
              researchers validating root-zone EIS and on-chip PhytoNPU inference in live
              crops.
            </p>

            <div
              className="mt-8 rounded-sm border border-[#D9E4D7] bg-[#FFFFFF] p-5"
              style={{ boxShadow: 'var(--anv-shadow-ambient)' }}
            >
              <div className="border-b border-[#D4E1D1] pb-3 font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-[#132219]">
                KIT MANIFEST &mdash; PART NO. ANV-EVK-01
              </div>

              <ul className="divide-y divide-[#D4E1D1]">
                {KIT_CONTENTS.map((entry) => (
                  <li key={entry.item} className="flex items-start gap-3.5 py-3.5">
                    <span className="mt-0.5 rounded-sm bg-[#EDF3EB] px-2 py-0.5 font-mono text-[11px] font-medium text-[#047A48]">
                      {entry.qty}
                    </span>
                    <div>
                      <div className="text-sm font-medium text-[#132219]">{entry.item}</div>
                      <div className="mt-0.5 font-mono text-[11.5px] text-[#47584E]">
                        {entry.spec}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right 7 Cols: Accessible Light-Theme Inquiry Form */}
          <div className="lg:col-span-7">
            <div
              className="rounded-sm border border-[#D9E4D7] bg-[#FFFFFF] p-6 sm:p-8"
              style={{ boxShadow: 'var(--anv-shadow-hardware)' }}
            >
              {submitted ? (
                <div className="py-8">
                  <div className="inline-flex items-center gap-2 rounded-sm bg-[#EDF3EB] px-3 py-1.5 font-mono text-[11px] font-medium tracking-[0.1em] uppercase text-[#047A48]">
                    <span className="h-2 w-2 rounded-full bg-[#4CC13B]" aria-hidden="true" />
                    INQUIRY LOGGED
                  </div>
                  <h3 className="mt-4 font-display text-2xl font-medium text-[#132219]">
                    Evaluation kit request received.
                  </h3>
                  <p className="mt-2.5 text-sm leading-[1.65] text-[#47584E]">
                    Thank you, <span className="font-medium text-[#132219]">{name}</span>.
                    Our hardware applications team will review the{' '}
                    <span className="font-mono text-xs text-[#132219]">{scale}</span>{' '}
                    deployment details for{' '}
                    <span className="font-medium text-[#132219]">{organization}</span> ({role})
                    and respond with lead-time and datasheet access.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setMessage('');
                    }}
                    className="mt-6 rounded-sm border border-[#132219]/30 px-4 py-2 font-mono text-xs font-medium text-[#132219] transition-colors hover:border-[#132219] hover:bg-[#EDF3EB]/60"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="border-b border-[#D4E1D1] pb-4">
                    <h3 className="font-display text-2xl font-medium text-[#132219]">
                      Request an Evaluation Kit or Pilot
                    </h3>
                    <p className="mt-1 text-sm text-[#47584E]">
                      Specify your crop environment and controller interface requirements.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="anv-name"
                        className="block font-mono text-[11px] font-medium tracking-[0.1em] uppercase text-[#132219]"
                      >
                        Name
                      </label>
                      <input
                        id="anv-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Dr. Kavita Rao"
                        className="mt-1.5 w-full rounded-sm border border-[#D4E1D1] bg-[#F7F9F5] px-3.5 py-2.5 text-sm text-[#132219] placeholder:text-[#47584E]/60 focus:border-[#047A48] focus:bg-[#FFFFFF] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="anv-org"
                        className="block font-mono text-[11px] font-medium tracking-[0.1em] uppercase text-[#132219]"
                      >
                        Organization
                      </label>
                      <input
                        id="anv-org"
                        type="text"
                        required
                        value={organization}
                        onChange={(e) => setOrganization(e.target.value)}
                        placeholder="Sahyadri Protected Farms"
                        className="mt-1.5 w-full rounded-sm border border-[#D4E1D1] bg-[#F7F9F5] px-3.5 py-2.5 text-sm text-[#132219] placeholder:text-[#47584E]/60 focus:border-[#047A48] focus:bg-[#FFFFFF] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="anv-role"
                        className="block font-mono text-[11px] font-medium tracking-[0.1em] uppercase text-[#132219]"
                      >
                        Role
                      </label>
                      <select
                        id="anv-role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="mt-1.5 w-full rounded-sm border border-[#D4E1D1] bg-[#F7F9F5] px-3.5 py-2.5 text-sm text-[#132219] focus:border-[#047A48] focus:bg-[#FFFFFF] focus:outline-none"
                      >
                        <option value="Semiconductor Partner">Semiconductor Partner</option>
                        <option value="Agronomist">Agronomist</option>
                        <option value="Greenhouse Operator">Greenhouse Operator</option>
                        <option value="Researcher">Researcher</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="anv-scale"
                        className="block font-mono text-[11px] font-medium tracking-[0.1em] uppercase text-[#132219]"
                      >
                        Deployment Scale
                      </label>
                      <select
                        id="anv-scale"
                        value={scale}
                        onChange={(e) => setScale(e.target.value)}
                        className="mt-1.5 w-full rounded-sm border border-[#D4E1D1] bg-[#F7F9F5] px-3.5 py-2.5 text-sm text-[#132219] focus:border-[#047A48] focus:bg-[#FFFFFF] focus:outline-none"
                      >
                        <option value="Lab / Bench Evaluation">Lab / Bench Evaluation</option>
                        <option value="Pilot Block (1–10 ha)">Pilot Block (1–10 ha)</option>
                        <option value="Commercial Estate (10–100+ ha)">
                          Commercial Estate (10–100+ ha)
                        </option>
                        <option value="CEA Glasshouse Facility">
                          CEA Glasshouse Facility
                        </option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="anv-message"
                      className="block font-mono text-[11px] font-medium tracking-[0.1em] uppercase text-[#132219]"
                    >
                      Message
                    </label>
                    <textarea
                      id="anv-message"
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Target crop, irrigation controller protocol (MQTT / Modbus / REST), or silicon integration questions..."
                      className="mt-1.5 w-full rounded-sm border border-[#D4E1D1] bg-[#F7F9F5] px-3.5 py-2.5 text-sm text-[#132219] placeholder:text-[#47584E]/60 focus:border-[#047A48] focus:bg-[#FFFFFF] focus:outline-none"
                    />
                  </div>

                  <div className="pt-1">
                    <button
                      type="submit"
                      className="inline-flex w-full items-center justify-center rounded-sm bg-[#047A48] px-5 py-3 text-sm font-medium text-[#FFFFFF] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:bg-[#03663C] hover:shadow-[0_6px_16px_rgba(4,57,34,0.12),0_16px_32px_-8px_rgba(4,122,72,0.24)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#047A48] focus-visible:ring-offset-2 sm:w-auto"
                    >
                      Request Evaluation Kit
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
