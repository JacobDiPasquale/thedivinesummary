'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { href: '/',          label: 'La Commedia', className: 'home' },
  { href: '/inferno',   label: 'Inferno',     className: 'inferno' },
  { href: '/purgatorio',label: 'Purgatorio',  className: 'purgatorio' },
  { href: '/paradiso',  label: 'Paradiso',    className: 'paradiso' },
] as const;

/** Separator between nav links */
function Sep() {
  return (
    <span
      aria-hidden
      className="text-[10px] px-0.5"
      style={{ color: 'rgba(139,26,26,0.2)' }}
    >
      ·
    </span>
  );
}

export default function SiteNav() {
  const pathname = usePathname();

  return (
    <nav
      className="sticky top-0 z-50 flex flex-wrap items-center justify-center gap-0 px-6"
      style={{
        background: 'rgba(6,4,4,0.98)',
        borderBottom: '1px solid rgba(139,26,26,0.15)',
        backdropFilter: 'blur(8px)',
      }}
      aria-label="Site navigation"
    >
      {NAV_LINKS.map((link, i) => {
        const isActive = link.href === '/'
          ? pathname === '/'
          : pathname.startsWith(link.href);

        const colorMap: Record<string, { base: string; active: string; border: string }> = {
          home: {
            base:   '#584848',
            active: '#a09090',
            border: 'transparent',
          },
          inferno: {
            base:   '#8b1a1a',
            active: '#c0392b',
            border: '#8b1a1a',
          },
          purgatorio: {
            base:   '#584830',
            active: '#5a9038',
            border: '#5a9038',
          },
          paradiso: {
            base:   '#584830',
            active: '#d4a820',
            border: '#d4a820',
          },
        };

        const colors = colorMap[link.className];
        const color = isActive ? colors.active : colors.base;
        const borderColor = isActive ? colors.border : 'transparent';

        return (
          <span key={link.href} className="contents">
            {i > 0 && <Sep />}
            <Link
              href={link.href}
              aria-current={isActive ? 'page' : undefined}
              className="font-cinzel uppercase transition-colors duration-200"
              style={{
                fontSize: '9.5px',
                letterSpacing: '0.28em',
                textDecoration: 'none',
                padding: '11px 16px',
                color,
                borderBottom: `2px solid ${borderColor}`,
              }}
            >
              {link.label}
            </Link>
          </span>
        );
      })}
    </nav>
  );
}
