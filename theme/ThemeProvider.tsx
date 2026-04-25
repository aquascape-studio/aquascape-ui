'use client';

import { createContext, useContext, useMemo, type ReactNode } from 'react';
import { tokens, type Tokens } from './tokens.js';

export type Theme = Tokens;

const ThemeContext = createContext<Theme>(tokens);

export function ThemeProvider({
  value,
  children,
}: {
  value?: Theme;
  children: ReactNode;
}): JSX.Element {
  const memo = useMemo(() => value ?? tokens, [value]);
  return <ThemeContext.Provider value={memo}>{children}</ThemeContext.Provider>;
}

export function useTheme(): Theme {
  return useContext(ThemeContext);
}
