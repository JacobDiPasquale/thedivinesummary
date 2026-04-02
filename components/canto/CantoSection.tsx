import type { Section } from '@/data/types';
import SectionHeader from './SectionHeader';
import CantoAccordion from './CantoAccordion';

interface Props {
  section: Section;
}

export default function CantoSection({ section }: Props) {
  // 'part' sections with no cantos are visual dividers only (e.g. "Seven Terraces" header)
  const isHeaderOnly = section.cantos.length === 0;

  return (
    <div>
      <SectionHeader header={section.header} sectionId={section.id} />
      {!isHeaderOnly && (
        <div className="px-6" style={{ maxWidth: '860px', margin: '0 auto' }}>
          {section.cantos.map(canto => (
            <CantoAccordion key={canto.slug} canto={canto} />
          ))}
        </div>
      )}
    </div>
  );
}
