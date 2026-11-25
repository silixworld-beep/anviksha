import { BrandLogo } from './BrandLogo';

const SITE_LINKS = [
  { label: 'Silicon', href: '#silicon' },
  { label: 'LeafNode N1', href: '#leafnode' },
  { label: 'Edge AI', href: '#edge-ai' },
  { label: 'Deployments', href: '#deployments' },
  { label: 'Evaluation Kit', href: '#contact' },
] as const;

const DOC_LINKS = [
  { label: 'ANV-S1 Brief', href: '#silicon' },
  { label: 'LeafNode N1 Spec', href: '#leafnode' },
  { label: 'PhytoOS SDK', href: '#edge-ai' },
] as const;

export function Footer() {
  return (
    <footer id="datasheet" className="border-t border-[#D4E1D1] bg-[#EDF3EB] text-[#132219]">
      <div className="mx-auto max-w-7xl px-6 py-14 sm:px-10 sm:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Brand Column */}
          <div className="md:col-span-5">
            <a href="#top" className="inline-flex items-center">
              <BrandLogo className="h-9" />
            </a>

            <p className="mt-4 max-w-sm text-sm leading-[1.65] text-[#47584E]">
              Full-stack plant intelligence: 22nm FD-SOI sensing silicon, weather-sealed
              autonomous field hardware, and on-chip botanical AI.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3">
            <div className="font-mono text-[10.5px] font-medium tracking-[0.14em] uppercase text-[#047A48]">
              Architecture
            </div>
            <ul className="mt-4 space-y-2.5">
              {SITE_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-[#47584E] transition-colors hover:text-[#132219]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Technical Documentation Links */}
          <div className="md:col-span-4">
            <div className="font-mono text-[10.5px] font-medium tracking-[0.14em] uppercase text-[#047A48]">
              Technical Documentation
            </div>
            <ul className="mt-4 space-y-2.5">
              {DOC_LINKS.map((doc) => (
                <li key={doc.label}>
                  <a
                    href={doc.href}
                    className="inline-flex items-center gap-2 font-mono text-[13px] text-[#132219] transition-colors hover:text-[#047A48]"
                  >
                    <span
                      className="h-[5px] w-[5px] rounded-full border-[1.5px] border-[#047A48] bg-[#EDF3EB]"
                      aria-hidden="true"
                    />
                    {doc.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-[#D4E1D1] pt-6 font-mono text-[11px] tabular-nums text-[#47584E]">
          <span>&copy; 2026 Anviksha Technologies. All rights reserved.</span>
          <span>ANV-S1 &middot; LEAFNODE N1 &middot; PHYTOOS</span>
        </div>
      </div>
    </footer>
  );
}
