/**
 * Theme tokens — CSS variable-based theming.
 * Same pattern as footprint-explainable-ui.
 */

export interface ThemeTokens {
  colors?: {
    primary?: string;
    success?: string;
    error?: string;
    warning?: string;
    info?: string;
    bgPrimary?: string;
    bgSecondary?: string;
    bgTertiary?: string;
    textPrimary?: string;
    textSecondary?: string;
    textMuted?: string;
    border?: string;
    // Agent-specific
    userBubble?: string;
    assistantBubble?: string;
    toolBubble?: string;
    systemBubble?: string;
  };
  radius?: string;
  fontFamily?: {
    sans?: string;
    mono?: string;
  };
}

export const defaultTokens: ThemeTokens = {
  colors: {
    primary: '#7c6cf0',
    success: '#34d399',
    error: '#f87171',
    warning: '#fbbf24',
    info: '#60a5fa',
    bgPrimary: '#1a1a2e',
    bgSecondary: '#16213e',
    bgTertiary: '#0f3460',
    textPrimary: '#e8e8e8',
    textSecondary: '#a0a0b8',
    textMuted: '#6b6b80',
    border: '#2a2a40',
    userBubble: '#1e3a5f',
    assistantBubble: '#2d1f4e',
    toolBubble: '#1f3d2e',
    systemBubble: '#3d2e1f',
  },
  radius: '8px',
  fontFamily: {
    sans: "'Inter', -apple-system, sans-serif",
    mono: "'JetBrains Mono', 'Fira Code', monospace",
  },
};

/** Convert tokens to CSS custom properties. */
export function tokensToCSSVars(tokens: ThemeTokens): Record<string, string> {
  const vars: Record<string, string> = {};
  if (tokens.colors) {
    for (const [key, value] of Object.entries(tokens.colors)) {
      if (value) vars[`--agent-color-${kebab(key)}`] = value;
    }
  }
  if (tokens.radius) vars['--agent-radius'] = tokens.radius;
  if (tokens.fontFamily?.sans) vars['--agent-font-sans'] = tokens.fontFamily.sans;
  if (tokens.fontFamily?.mono) vars['--agent-font-mono'] = tokens.fontFamily.mono;
  return vars;
}

function kebab(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}
