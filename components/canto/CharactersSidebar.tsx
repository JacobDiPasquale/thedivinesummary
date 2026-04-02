interface Props {
  characters: string;
}

export default function CharactersSidebar({ characters }: Props) {
  if (!characters) return null;
  return (
    <div
      className="mt-6 px-4 py-3 font-garamond"
      style={{
        borderLeft: '3px solid var(--c-primary)',
        background: 'rgba(0,0,0,0.15)',
        fontSize: '0.88rem',
        lineHeight: 1.65,
      }}
    >
      <strong
        className="font-cinzel uppercase block mb-1"
        style={{ fontSize: '8.5px', letterSpacing: '0.3em', color: 'var(--c-primary)' }}
      >
        Characters
      </strong>
      <span style={{ color: 'var(--c-text-mid)' }}>{characters}</span>
    </div>
  );
}
