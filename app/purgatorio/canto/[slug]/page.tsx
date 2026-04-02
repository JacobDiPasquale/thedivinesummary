import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getCantoBySlug,
  getAllCantoSlugs,
  getSectionForCanto,
  getAdjacentCantos,
} from '@/lib/canticle-utils';
import CantoPageContent from '@/components/canto/CantoPageContent';

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllCantoSlugs('purgatorio').map(slug => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const canto = getCantoBySlug('purgatorio', slug);
  if (!canto) return {};
  return {
    title: `${canto.title} \u2014 Purgatorio ${canto.numeralRoman}`,
    description: canto.hook,
  };
}

export default async function PurgatorioCantoPage({ params }: Props) {
  const { slug } = await params;
  const canto = getCantoBySlug('purgatorio', slug);
  if (!canto) notFound();

  const section = getSectionForCanto('purgatorio', slug)!;
  const { prev, next } = getAdjacentCantos('purgatorio', slug);

  return (
    <CantoPageContent
      canticleId="purgatorio"
      canto={canto}
      section={section}
      prev={prev}
      next={next}
    />
  );
}
