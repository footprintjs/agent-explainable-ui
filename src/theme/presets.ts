import type { ThemeTokens } from './tokens';

export const coolDark: ThemeTokens = {
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

export const warmDark: ThemeTokens = {
  colors: {
    primary: '#e0916e',
    success: '#6fcf97',
    error: '#eb5757',
    warning: '#f2c94c',
    info: '#56ccf2',
    bgPrimary: '#1e1a16',
    bgSecondary: '#2a2420',
    bgTertiary: '#3a3228',
    textPrimary: '#f0e8d8',
    textSecondary: '#b0a890',
    textMuted: '#7a7060',
    border: '#3a3228',
    userBubble: '#2a3828',
    assistantBubble: '#382a28',
    toolBubble: '#283a2e',
    systemBubble: '#3a3228',
  },
  radius: '6px',
};

export const coolLight: ThemeTokens = {
  colors: {
    primary: '#6366f1',
    success: '#10b981',
    error: '#ef4444',
    warning: '#f59e0b',
    info: '#3b82f6',
    bgPrimary: '#ffffff',
    bgSecondary: '#f8fafc',
    bgTertiary: '#f1f5f9',
    textPrimary: '#1e293b',
    textSecondary: '#64748b',
    textMuted: '#94a3b8',
    border: '#e2e8f0',
    userBubble: '#eff6ff',
    assistantBubble: '#f5f3ff',
    toolBubble: '#ecfdf5',
    systemBubble: '#fff7ed',
  },
  radius: '8px',
};

export const themePresets = { coolDark, warmDark, coolLight };
