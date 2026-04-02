export default function Footer() {
  return (
    <footer
      className="text-center py-12 px-6 mt-16"
      style={{ borderTop: '1px solid var(--c-border-faint)' }}
    >
      <p
        className="font-cinzel uppercase"
        style={{
          fontSize: '9px',
          letterSpacing: '0.35em',
          color: 'var(--c-text-faint)',
          opacity: 0.7,
        }}
      >
        <a
          href="https://github.com/jacobhulmston/TheDivineSummary"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-opacity duration-200 hover:opacity-100"
          style={{ color: 'inherit', textDecoration: 'none' }}
        >
          GitHub
        </a>
        {' · '}
        Dante Alighieri · La Divina Commedia · c. 1304–1321
      </p>
    </footer>
  );
}
