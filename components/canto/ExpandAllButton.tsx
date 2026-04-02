'use client';

import { useContext, useState } from 'react';
import { AccordionContext } from './AccordionContext';

export default function ExpandAllButton() {
  const [expanded, setExpanded] = useState(false);
  const ctx = useContext(AccordionContext);

  const toggle = () => {
    if (expanded) {
      ctx.collapseAll();
    } else {
      ctx.expandAll();
    }
    setExpanded(e => !e);
  };

  return (
    <div className="flex justify-end px-6 py-4" style={{ maxWidth: '860px', margin: '0 auto' }}>
      <button
        onClick={toggle}
        className="font-cinzel uppercase transition-colors duration-200 cursor-pointer bg-transparent"
        style={{
          fontSize: '9px',
          letterSpacing: '0.32em',
          padding: '8px 16px',
          color: 'var(--c-text-faint)',
          border: '1px solid var(--c-border-faint)',
        }}
      >
        {expanded ? 'Collapse All Cantos' : 'Expand All Cantos'}
      </button>
    </div>
  );
}
