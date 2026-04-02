'use client';

import { useEffect, useRef, useState } from 'react';
import type { Section } from '@/data/types';

interface Props {
  sections: Pick<Section, 'id' | 'navLabel'>[];
}

export default function QuickNav({ sections }: Props) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? '');
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Observe each section heading for scroll position
    const sectionEls = sections
      .map(s => document.getElementById(s.id))
      .filter(Boolean) as HTMLElement[];

    observerRef.current = new IntersectionObserver(
      entries => {
        // Pick the topmost visible section
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-10% 0px -80% 0px', threshold: 0 }
    );

    sectionEls.forEach(el => observerRef.current!.observe(el));
    return () => observerRef.current?.disconnect();
  }, [sections]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav
      className="sticky top-[44px] z-40 overflow-x-auto quick-nav-scroll -mt-px"
      style={{
        background: 'rgba(6,4,4,0.92)',
        borderBottom: '1px solid var(--c-border-faint)',
        backdropFilter: 'blur(8px)',
      }}
      aria-label="Section navigation"
    >
      <ul className="flex items-center justify-center flex-wrap gap-0 px-4 py-0 list-none">
        {sections.map(section => {
          const isActive = section.id === activeId;
          return (
            <li key={section.id}>
              <button
                onClick={() => scrollTo(section.id)}
                className="font-cinzel uppercase transition-colors duration-200 cursor-pointer bg-transparent border-none"
                style={{
                  fontSize: '8.5px',
                  letterSpacing: '0.28em',
                  padding: '10px 12px',
                  color: isActive ? 'var(--c-primary-bright)' : 'var(--c-text-faint)',
                  borderBottom: isActive
                    ? '2px solid var(--c-primary)'
                    : '2px solid transparent',
                }}
                aria-current={isActive ? 'true' : undefined}
              >
                {section.navLabel}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
