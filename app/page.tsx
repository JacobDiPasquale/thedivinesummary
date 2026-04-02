import type { Metadata } from 'next';
import Hero from '@/components/home/Hero';
import CanticleCard from '@/components/home/CanticleCard';
import Introduction from '@/components/home/Introduction';

export const metadata: Metadata = {
  title: 'La Divina Commedia \u2014 A Canto by Canto Commentary',
};

const CANTICLES = [
  {
    id:          'inferno'    as const,
    title:       'Inferno',
    numeral:     'I'          as const,
    overline:    'Primo Canticle \u00b7 c.\u00a01304\u20131308',
    description:
      'Dante descends through the nine circles of Hell, guided by Virgil. ' +
      'From the dark wood to the frozen heart of Cocytus — thirty-four cantos ' +
      'of moral taxonomy, political fury, and unforgettable human drama.',
    cantoCount:  34,
    href:        '/inferno',
  },
  {
    id:          'purgatorio' as const,
    title:       'Purgatorio',
    numeral:     'II'         as const,
    overline:    'Secondo Canticle \u00b7 c.\u00a01308\u20131320',
    description:
      'Dante ascends the mountain of Purgatory, organized around the seven ' +
      'capital sins. The most humanly warm of the three canticles: souls here ' +
      'move toward the light. Thirty-three cantos of hope and transformation.',
    cantoCount:  33,
    href:        '/purgatorio',
  },
  {
    id:          'paradiso'   as const,
    title:       'Paradiso',
    numeral:     'III'        as const,
    overline:    'Terzo Canticle \u00b7 c.\u00a01314\u20131321',
    description:
      'Beatrice guides Dante through the nine celestial spheres into the ' +
      'Empyrean, where he glimpses God directly. The most theologically ' +
      'ambitious canticle. Thirty-three cantos ending on the word \u2018stelle.\u2019',
    cantoCount:  33,
    href:        '/paradiso',
  },
] as const;

export default function HomePage() {
  return (
    <main style={{ background: '#0a0806', minHeight: '100vh' }}>
      <Hero />

      {/* Three canticle cards */}
      <section
        className="px-6 py-16"
        style={{ background: '#0a0806' }}
      >
        <div
          className="mx-auto flex flex-col md:flex-row gap-4"
          style={{ maxWidth: '1080px' }}
        >
          {CANTICLES.map(c => (
            <CanticleCard key={c.id} {...c} />
          ))}
        </div>
      </section>

      <Introduction />

      {/* Footer */}
      <footer
        className="text-center py-10 px-6"
        style={{ borderTop: '1px solid rgba(139,26,26,0.08)' }}
      >
        <p
          className="font-cinzel uppercase"
          style={{ fontSize: '9px', letterSpacing: '0.35em', color: '#3a2828' }}
        >
          <a
            href="https://github.com/jacobhulmston/TheDivineSummary"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            GitHub
          </a>
          {' \u00b7 '}
          Dante Alighieri \u00b7 La Divina Commedia \u00b7 c.\u00a01304\u20131321
        </p>
      </footer>
    </main>
  );
}
