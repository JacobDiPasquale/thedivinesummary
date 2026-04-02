import type { Metadata } from 'next';
import { getCanticle } from '@/lib/canticle-utils';
import CanticleHeader from '@/components/layout/CanticleHeader';
import QuickNav from '@/components/layout/QuickNav';
import CantoSection from '@/components/canto/CantoSection';
import ExpandAllButton from '@/components/canto/ExpandAllButton';
import { AccordionProvider } from '@/components/canto/AccordionContext';

export const metadata: Metadata = {
  title: 'Purgatorio',
  description: "A canto-by-canto commentary on Dante\u2019s Purgatorio \u2014 all 33 cantos.",
};

export default function PurgatorioPage() {
  const canticle = getCanticle('purgatorio');
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
