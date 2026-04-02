import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getCanticle,
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
  return getAllCantoSlugs('inferno').map(slug => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const canto = getCantoBySlug('inferno', slug);
  if (!canto) return {};
  return {
    title: `${canto.title} \u2014 Inferno ${canto.numeralRoman}`,
    description: canto.hook,
  };
}

export default async function InfernoCantoPage({ params }: Props) {
  const { slug } = await params;
  const canto = getCantoBySlug('inferno', slug);
  if (!canto) notFound();

  const section = getSectionForCanto('inferno', slug)!;
  const { prev, next } = getAdjacentCantos('inferno', slug);

  return (
    <CantoPageContent
      canticleId="inferno"
      canto={canto}
      section={section}
      prev={prev}
      next={next}
    />
  );
}
