import type { Metadata } from 'next';
import { getCanticle } from '@/lib/canticle-utils';
import CanticleHeader from '@/components/layout/CanticleHeader';
import QuickNav from '@/components/layout/QuickNav';
import CantoSection from '@/components/canto/CantoSection';
import ExpandAllButton from '@/components/canto/ExpandAllButton';
import { AccordionProvider } from '@/components/canto/AccordionContext';

export const metadata: Metadata = {
  title: 'Inferno',
  description: "A canto-by-canto commentary on Dante\u2019s Inferno \u2014 all 34 cantos.",
};

export default function InfernoPage() {
  const canticle = getCanticle('inferno');

  // Only include sections that have their own nav anchor (skip header-only dividers
  // that are already represented by other sections in the nav)
  const navSections = canticle.sections.filter(s => s.cantos.length > 0);

  return (
    <AccordionProvider>
      <CanticleHeader canticle={canticle} />
      <QuickNav sections={navSections} />
      <ExpandAllButton />
      <main style={{ paddingBottom: '4rem' }}>
        {canticle.sections.map(section => (
          <CantoSection key={section.id} section={section} />
        ))}
      </main>
    </AccordionProvider>
  );
}
