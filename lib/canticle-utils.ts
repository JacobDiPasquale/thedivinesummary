import type { CanticleData, CanticleId, Canto, Section } from '@/data/types';
import { infernoData } from '@/data/inferno';
import { purgatorioData } from '@/data/purgatorio';
import { paradisoData } from '@/data/paradiso';

const CANTICLES: Record<CanticleId, CanticleData> = {
  inferno: infernoData,
  purgatorio: purgatorioData,
  paradiso: paradisoData,
};

export function getCanticle(id: CanticleId): CanticleData {
  return CANTICLES[id];
}

export function getAllCantos(canticleId: CanticleId): Canto[] {
  return getCanticle(canticleId).sections.flatMap(s => s.cantos);
}

export function getCantoBySlug(canticleId: CanticleId, slug: string): Canto | undefined {
  return getAllCantos(canticleId).find(c => c.slug === slug);
}

export function getAllCantoSlugs(canticleId: CanticleId): string[] {
  return getAllCantos(canticleId).map(c => c.slug);
}

export function getSectionForCanto(canticleId: CanticleId, slug: string): Section | undefined {
  return getCanticle(canticleId).sections.find(s =>
    s.cantos.some(c => c.slug === slug)
  );
}

/** Returns the previous and next cantos relative to a given slug, across section boundaries. */
export function getAdjacentCantos(
  canticleId: CanticleId,
  slug: string
): { prev: Canto | null; next: Canto | null } {
  const all = getAllCantos(canticleId);
  const idx = all.findIndex(c => c.slug === slug);
  return {
    prev: idx > 0 ? all[idx - 1] : null,
    next: idx < all.length - 1 ? all[idx + 1] : null,
  };
}

/** Returns all three canticles as an ordered array. */
export function getAllCanticles(): CanticleData[] {
  return [infernoData, purgatorioData, paradisoData];
}
