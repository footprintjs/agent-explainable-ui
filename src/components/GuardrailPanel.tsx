/**
 * GuardrailPanel — Shows guardrail check results and violations.
 */
import React from 'react';
import type { BaseComponentProps, GuardrailSnapshot } from '../types';

export interface GuardrailPanelProps extends BaseComponentProps {
  guardrails: GuardrailSnapshot;
}

const severityColors: Record<string, string> = {
  info: 'var(--agent-color-info, #60a5fa)',
  warning: 'var(--agent-color-warning, #fbbf24)',
  error: 'var(--agent-color-error, #f87171)',
};

const severityIcons: Record<string, string> = {
  info: 'ℹ',
  warning: '⚠',
  error: '✕',
};

export function GuardrailPanel({
  guardrails,
  size = 'default',
  unstyled,
  className,
  style,
}: GuardrailPanelProps) {
  const fontSize = size === 'compact' ? '12px' : size === 'detailed' ? '14px' : '13px';

  return (
    <div
      data-agent="guardrail-panel"
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
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '10px', color: 'var(--agent-color-text-muted, #6b6b80)' }}>
            Checks
          </div>
          <div style={{ fontWeight: 700 }}>{guardrails.checks}</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '10px', color: 'var(--agent-color-text-muted, #6b6b80)' }}>
            Passed
          </div>
          <div style={{ fontWeight: 700, color: 'var(--agent-color-success, #34d399)' }}>
            {guardrails.passed}
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '10px', color: 'var(--agent-color-text-muted, #6b6b80)' }}>
            Failed
          </div>
          <div
            style={{
              fontWeight: 700,
              color:
                guardrails.failed > 0
                  ? 'var(--agent-color-error, #f87171)'
                  : 'var(--agent-color-success, #34d399)',
            }}
          >
            {guardrails.failed}
          </div>
        </div>
      </div>

      {/* Violations */}
      {guardrails.violations.map((v, i) => (
        <div
          key={i}
          data-agent="violation"
          style={
            unstyled
              ? {}
              : {
                  display: 'flex',
                  gap: '8px',
                  padding: '8px 10px',
                  borderLeft: `3px solid ${severityColors[v.severity] ?? severityColors.warning}`,
                  background: 'var(--agent-color-bg-secondary, #16213e)',
                  borderRadius: '0 var(--agent-radius, 8px) var(--agent-radius, 8px) 0',
                  marginBottom: '6px',
                }
          }
        >
          <span style={{ color: severityColors[v.severity], fontSize: '14px', flexShrink: 0 }}>
            {severityIcons[v.severity] ?? '?'}
          </span>
          <div>
            <div style={{ fontWeight: 600 }}>{v.rule}</div>
            <div style={{ fontSize: '12px', color: 'var(--agent-color-text-secondary, #a0a0b8)' }}>
              {v.message}
            </div>
            {v.turnNumber !== undefined && (
              <div style={{ fontSize: '11px', color: 'var(--agent-color-text-muted, #6b6b80)' }}>
                Turn {v.turnNumber}
              </div>
            )}
          </div>
        </div>
      ))}

      {guardrails.violations.length === 0 && (
        <div
          style={
            unstyled
              ? {}
              : {
                  textAlign: 'center',
                  padding: '20px',
                  color: 'var(--agent-color-success, #34d399)',
                }
          }
        >
          All checks passed
        </div>
      )}
    </div>
  );
}
