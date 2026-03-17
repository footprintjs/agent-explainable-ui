import React, { createContext, useContext, useMemo } from 'react';
import type { ThemeTokens } from './tokens';
import { defaultTokens, tokensToCSSVars } from './tokens';

interface ThemeContextValue {
  tokens: ThemeTokens;
}

const ThemeContext = createContext<ThemeContextValue>({ tokens: defaultTokens });

export function useAgentTheme(): ThemeContextValue {
  return useContext(ThemeContext);
}

export interface AgentThemeProps {
  tokens?: ThemeTokens;
  children: React.ReactNode;
}

export function AgentTheme({ tokens = defaultTokens, children }: AgentThemeProps) {
  const cssVars = useMemo(() => tokensToCSSVars(tokens), [tokens]);

  return (
    <ThemeContext.Provider value={{ tokens }}>
      <div style={cssVars as React.CSSProperties} data-agent-theme>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}
