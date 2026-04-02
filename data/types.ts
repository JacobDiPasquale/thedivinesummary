export type CanticleId = 'inferno' | 'purgatorio' | 'paradiso';

/**
 * Determines which visual variant SectionHeader renders.
 * - 'circle'  — Inferno circles
 * - 'terrace' — Purgatorio terraces
 * - 'heaven'  — Paradiso heavens/spheres
 * - 'part'    — Narrative dividers (Prologue, Ante-Hell, Ante-Purgatory, Empyrean, etc.)
 */
export type SectionHeaderVariant = 'circle' | 'terrace' | 'heaven' | 'part';

export interface SectionHeader {
  variant: SectionHeaderVariant;
  /** Display label for the badge pill. E.g. "First Circle", "Second Terrace", "Prologue" */
  badge: string;
  /** Main section title. E.g. "Limbo", "Pride", "The Moon · Sphere of the Inconstant" */
  title: string;
  /** Subtitle line — the sin description or realm description */
  subtitle: string;
  /** Canto range string, only for 'part' variant. E.g. "Cantos I–II" */
  cantoRange?: string;
  /** Italicized intro paragraph, only for 'part' variant */
  intro?: string;
}

export interface Canto {
  number: number;
  /** Roman numeral string. E.g. "I", "XIV", "XXXIV" */
  numeralRoman: string;
  /** Ordinal label. E.g. "Canto One", "Canto Fourteen" */
  ordinalLabel: string;
  /** URL slug. E.g. "canto-1", "canto-34" */
  slug: string;
  /** Full title. E.g. "The Dark Wood — The Three Beasts — Virgil" */
  title: string;
  /** Italicized single-sentence teaser shown in closed accordion */
  hook: string;
  /** Array of prose paragraph strings. May contain HTML for <em> etc. */
  body: string[];
  /** Characters sidebar text. E.g. "Dante, Virgil, Charon; The Neutrals" */
  characters: string;
  /** References the parent Section.id */
  sectionId: string;
}

export interface Section {
  /** Anchor ID used for QuickNav links and URL fragments. E.g. "c1", "antehell", "pride" */
  id: string;
  /** Short label for the quick-nav link. E.g. "Circle I", "Pride", "Moon" */
  navLabel: string;
  header: SectionHeader;
  cantos: Canto[];
}

export interface CanticleData {
  id: CanticleId;
  /** Display title. E.g. "Inferno" */
  title: string;
  /** Page subtitle. E.g. "A Canto by Canto Commentary" */
  subtitle: string;
  /** Small overline above the title. E.g. "La Divina Commedia · Primo Canticle · c. 1304–1308" */
  overline: string;
  epigraph: {
    lines: string[];
    attribution: string;
  };
  sections: Section[];
}
