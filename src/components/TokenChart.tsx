/**
 * TokenChart — Bar chart showing token usage per turn.
 *
 * Stacked bars: input (blue) + output (purple).
 * Shows running total and per-turn breakdown.
 */
import React from 'react';
import type { BaseComponentProps, TokenSnapshot } from '../types';

export interface TokenChartProps extends BaseComponentProps {
  tokens: TokenSnapshot;
}

export function TokenChart({
  tokens,
  size = 'default',
  unstyled,
  className,
  style,
}: TokenChartProps) {
  const barHeight = size === 'compact' ? 16 : size === 'detailed' ? 28 : 22;
  const fontSize = size === 'compact' ? '11px' : size === 'detailed' ? '14px' : '12px';
  const perTurn = tokens.perTurn ?? [];
  const maxTokens = Math.max(...perTurn.map((t) => t.input + t.output), 1);

  return (
    <div
      data-agent="token-chart"
      className={className}
      style={{
        ...(unstyled
          ? {}
          : {
              fontFamily: 'var(--agent-font-sans, sans-serif)',
              fontSize,
              color: 'var(--agent-color-text-primary, #e8e8e8)',
            }),
        ...style,
      }}
    >
      {/* Summary */}
      <div
        style={
          unstyled
            ? {}
            : {
                display: 'flex',
                gap: '16px',
                marginBottom: '12px',
                padding: '8px 12px',
                background: 'var(--agent-color-bg-secondary, #16213e)',
                borderRadius: 'var(--agent-radius, 8px)',
              }
        }
      >
        <Stat label="Input" value={tokens.totalInput} color="var(--agent-color-info, #60a5fa)" unstyled={unstyled} />
        <Stat label="Output" value={tokens.totalOutput} color="var(--agent-color-primary, #7c6cf0)" unstyled={unstyled} />
        <Stat label="Total" value={tokens.totalTokens} color="var(--agent-color-text-primary, #e8e8e8)" unstyled={unstyled} />
      </div>

      {/* Per-turn bars */}
      {perTurn.map((turn) => {
        const total = turn.input + turn.output;
        const inputWidth = (turn.input / maxTokens) * 100;
        const outputWidth = (turn.output / maxTokens) * 100;

        return (
          <div
            key={turn.turn}
            data-agent="token-bar"
            style={
              unstyled
                ? {}
                : {
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '4px',
                  }
            }
          >
            <span
              style={
                unstyled
                  ? {}
                  : {
                      width: '40px',
                      textAlign: 'right',
                      fontSize: '11px',
                      color: 'var(--agent-color-text-muted, #6b6b80)',
                      flexShrink: 0,
                    }
              }
            >
              T{turn.turn}
            </span>
            <div
              style={
                unstyled
                  ? {}
                  : {
                      flex: 1,
                      display: 'flex',
                      height: `${barHeight}px`,
                      borderRadius: '4px',
                      overflow: 'hidden',
                    }
              }
            >
              <div
                style={{
                  width: `${inputWidth}%`,
                  background: 'var(--agent-color-info, #60a5fa)',
                  opacity: 0.8,
                }}
              />
              <div
                style={{
                  width: `${outputWidth}%`,
                  background: 'var(--agent-color-primary, #7c6cf0)',
                  opacity: 0.8,
                }}
              />
            </div>
            <span
              style={
                unstyled
                  ? {}
                  : {
                      width: '60px',
                      fontSize: '11px',
                      color: 'var(--agent-color-text-secondary, #a0a0b8)',
                      flexShrink: 0,
                    }
              }
            >
              {total.toLocaleString()}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function Stat({
  label,
  value,
  color,
  unstyled,
}: {
  label: string;
  value: number;
  color: string;
  unstyled?: boolean;
}) {
  return (
    <div style={unstyled ? {} : { textAlign: 'center' }}>
      <div
        style={
          unstyled
            ? {}
            : { fontSize: '10px', textTransform: 'uppercase', color: 'var(--agent-color-text-muted, #6b6b80)' }
        }
      >
        {label}
      </div>
      <div style={unstyled ? {} : { fontSize: '16px', fontWeight: 700, color }}>
        {value.toLocaleString()}
      </div>
    </div>
  );
}
