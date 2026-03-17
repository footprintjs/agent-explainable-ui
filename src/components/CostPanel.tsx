/**
 * CostPanel — Running cost tracker with per-turn breakdown.
 */
import React from 'react';
import type { BaseComponentProps, CostSnapshot } from '../types';

export interface CostPanelProps extends BaseComponentProps {
  cost: CostSnapshot;
}

export function CostPanel({ cost, size = 'default', unstyled, className, style }: CostPanelProps) {
  const fontSize = size === 'compact' ? '12px' : size === 'detailed' ? '14px' : '13px';
  const perTurn = cost.perTurn ?? [];

  return (
    <div
      data-agent="cost-panel"
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
      <div
        style={
          unstyled
            ? {}
            : {
                padding: '12px 16px',
                background: 'var(--agent-color-bg-secondary, #16213e)',
                borderRadius: 'var(--agent-radius, 8px)',
                marginBottom: '12px',
                textAlign: 'center',
              }
        }
      >
        <div
          style={
            unstyled
              ? {}
              : {
                  fontSize: '10px',
                  textTransform: 'uppercase',
                  color: 'var(--agent-color-text-muted, #6b6b80)',
                  marginBottom: '4px',
                }
          }
        >
          Total Cost
        </div>
        <div
          style={
            unstyled
              ? {}
              : {
                  fontSize: '24px',
                  fontWeight: 700,
                  color: 'var(--agent-color-warning, #fbbf24)',
                  fontFamily: 'var(--agent-font-mono, monospace)',
                }
          }
        >
          {cost.currency}
          {cost.totalCost.toFixed(6)}
        </div>
      </div>

      {perTurn.length > 0 && (
        <div>
          {perTurn.map((entry) => (
            <div
              key={entry.turn}
              style={
                unstyled
                  ? {}
                  : {
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '4px 10px',
                      fontSize: '12px',
                      borderBottom: '1px solid var(--agent-color-border, #2a2a40)',
                    }
              }
            >
              <span style={{ color: 'var(--agent-color-text-muted, #6b6b80)' }}>
                Turn {entry.turn}
              </span>
              <span style={{ fontFamily: 'var(--agent-font-mono, monospace)' }}>
                {cost.currency}
                {entry.cost.toFixed(6)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
