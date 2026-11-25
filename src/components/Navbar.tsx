import { useState } from 'react';
import { BrandLogo } from './BrandLogo';

const NAV_LINKS = [
  { label: 'Silicon', href: '#silicon' },
  { label: 'LeafNode N1', href: '#leafnode' },
  { label: 'Edge AI', href: '#edge-ai' },
  { label: 'Deployments', href: '#deployments' },
  { label: 'Datasheet', href: '#datasheet' },
] as const;

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#D4E1D1] bg-[#F7F9F5]/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 sm:px-10">
        {/* Left: Brand Logo */}
        <a
          href="#top"
          className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#047A48]"
          aria-label="Anviksha Technologies home"
        >
          <BrandLogo className="h-9 sm:h-10" />
        </a>

        {/* Center/Right: Minimal Technical Navigation */}
        <nav aria-label="Primary navigation" className="hidden items-center gap-8 lg:flex">
          <ul className="flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-[13.5px] font-medium tracking-[-0.01em] text-[#47584E] transition-colors duration-200 hover:text-[#132219]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-sm bg-[#047A48] px-4 py-2 text-[13.5px] font-medium text-[#FFFFFF] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:bg-[#03663C] hover:shadow-[0_6px_16px_rgba(4,57,34,0.12),0_16px_32px_-8px_rgba(4,122,72,0.24)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#047A48] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F7F9F5]"
          >
            Request Evaluation Kit
          </a>
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          className="inline-flex items-center justify-center rounded-sm border border-[#D4E1D1] bg-[#FFFFFF] px-3 py-1.5 font-mono text-[11px] tracking-[0.12em] uppercase text-[#132219] lg:hidden"
          aria-expanded={mobileOpen}
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? 'Close' : 'Menu'}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="border-t border-[#D4E1D1] bg-[#F7F9F5] px-6 py-5 lg:hidden">
          <ul className="flex flex-col gap-3.5">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block py-1 text-sm font-medium text-[#47584E] hover:text-[#132219]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-5 border-t border-[#D4E1D1] pt-4">
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="inline-flex w-full items-center justify-center rounded-sm bg-[#047A48] px-4 py-2.5 text-sm font-medium text-[#FFFFFF]"
            >
              Request Evaluation Kit
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
