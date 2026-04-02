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
  return getAllCantoSlugs('paradiso').map(slug => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const canto = getCantoBySlug('paradiso', slug);
  if (!canto) return {};
  return {
    title: `${canto.title} \u2014 Paradiso ${canto.numeralRoman}`,
    description: canto.hook,
  };
}

export default async function ParadisoCantoPage({ params }: Props) {
  const { slug } = await params;
  const canto = getCantoBySlug('paradiso', slug);
  if (!canto) notFound();

  const section = getSectionForCanto('paradiso', slug)!;
  const { prev, next } = getAdjacentCantos('paradiso', slug);

  return (
    <CantoPageContent
      canticleId="paradiso"
      canto={canto}
      section={section}
      prev={prev}
      next={next}
    />
  );
}
