'use client';

import { createContext, useCallback, useRef, useState } from 'react';

type SetOpen = React.Dispatch<React.SetStateAction<boolean>>;

interface AccordionContextValue {
  /** null = no bulk action pending; true/false = expand/collapse all */
  allOpen: boolean | null;
  /** Increments on each bulk toggle so useEffect triggers even if allOpen stays the same value */
  generation: number;
  register:   (slug: string, setter: SetOpen) => void;
  unregister: (slug: string) => void;
  expandAll:  () => void;
  collapseAll: () => void;
}

export const AccordionContext = createContext<AccordionContextValue>({
  allOpen:     null,
  generation:  0,
  register:    () => {},
  unregister:  () => {},
  expandAll:   () => {},
  collapseAll: () => {},
});

export function AccordionProvider({ children }: { children: React.ReactNode }) {
  const [allOpen, setAllOpen] = useState<boolean | null>(null);
  const [generation, setGeneration] = useState(0);
  const setters = useRef<Map<string, SetOpen>>(new Map());

  const register = useCallback((slug: string, setter: SetOpen) => {
    setters.current.set(slug, setter);
  }, []);

  const unregister = useCallback((slug: string) => {
    setters.current.delete(slug);
  }, []);

  const expandAll = useCallback(() => {
    setAllOpen(true);
    setGeneration(g => g + 1);
  }, []);

  const collapseAll = useCallback(() => {
    setAllOpen(false);
    setGeneration(g => g + 1);
  }, []);

  return (
    <AccordionContext.Provider
      value={{ allOpen, generation, register, unregister, expandAll, collapseAll }}
    >
      {children}
    </AccordionContext.Provider>
  );
}
