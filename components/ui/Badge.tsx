interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function Badge({ children, className = '' }: Props) {
  return (
    <span
      className={`font-cinzel uppercase ${className}`}
      style={{
        fontSize: '9px',
        letterSpacing: '0.35em',
        padding: '4px 10px',
        background: 'var(--c-border)',
        color: 'var(--c-primary)',
        display: 'inline-block',
      }}
    >
      {children}
    </span>
  );
}
