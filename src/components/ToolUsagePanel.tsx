/**
 * ToolUsagePanel — Shows which tools were called, how often, and performance.
 *
 * Sorted by call count. Shows error rate, average duration.
 */
import React from 'react';
import type { BaseComponentProps, ToolUsageSnapshot } from '../types';

export interface ToolUsagePanelProps extends BaseComponentProps {
  toolUsage: ToolUsageSnapshot;
}

export function ToolUsagePanel({
  toolUsage,
  size = 'default',
  unstyled,
  className,
  style,
}: ToolUsagePanelProps) {
  const fontSize = size === 'compact' ? '12px' : size === 'detailed' ? '14px' : '13px';
  const sorted = [...toolUsage.perTool].sort((a, b) => b.calls - a.calls);

  return (
    <div
      data-agent="tool-usage"
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
      {/* Summary row */}
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
        <div>
          <span style={{ color: 'var(--agent-color-text-muted, #6b6b80)', fontSize: '11px' }}>
            Total Calls
          </span>
          <div style={{ fontWeight: 700, fontSize: '16px' }}>{toolUsage.totalCalls}</div>
        </div>
        <div>
          <span style={{ color: 'var(--agent-color-text-muted, #6b6b80)', fontSize: '11px' }}>
            Unique Tools
          </span>
          <div style={{ fontWeight: 700, fontSize: '16px' }}>{toolUsage.uniqueTools}</div>
        </div>
      </div>

      {/* Per-tool breakdown */}
      {sorted.map((tool) => {
        const errorRate = tool.calls > 0 ? (tool.errors / tool.calls) * 100 : 0;
        return (
          <div
            key={tool.name}
            data-agent="tool-row"
            style={
              unstyled
                ? {}
                : {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '6px 10px',
                    borderBottom: '1px solid var(--agent-color-border, #2a2a40)',
                  }
            }
          >
            <span
              style={
                unstyled
                  ? {}
                  : {
                      fontFamily: 'var(--agent-font-mono, monospace)',
                      color: 'var(--agent-color-success, #34d399)',
                      fontWeight: 600,
                    }
              }
            >
              {tool.name}
            </span>
            <div style={unstyled ? {} : { display: 'flex', gap: '16px', fontSize: '12px' }}>
              <span>{tool.calls} calls</span>
              {tool.avgDurationMs !== undefined && (
                <span style={{ color: 'var(--agent-color-text-muted, #6b6b80)' }}>
                  ~{Math.round(tool.avgDurationMs)}ms
                </span>
              )}
              {tool.errors > 0 && (
                <span style={{ color: 'var(--agent-color-error, #f87171)' }}>
                  {errorRate.toFixed(0)}% err
                </span>
              )}
            </div>
          </div>
        );
      })}

      {sorted.length === 0 && (
        <div
          style={
            unstyled
              ? {}
              : {
                  textAlign: 'center',
                  padding: '20px',
                  color: 'var(--agent-color-text-muted, #6b6b80)',
                }
          }
        >
          No tool calls recorded
        </div>
      )}
    </div>
  );
}
