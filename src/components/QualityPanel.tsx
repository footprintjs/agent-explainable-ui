/**
 * QualityPanel — Shows quality scores from QualityRecorder.
 * Displays per-dimension scores with visual bars.
 */
import React from 'react';
import type { BaseComponentProps, QualitySnapshot } from '../types';

export interface QualityPanelProps extends BaseComponentProps {
  quality: QualitySnapshot;
}

export function QualityPanel({
  quality,
  size = 'default',
  unstyled,
  className,
  style,
}: QualityPanelProps) {
  const fontSize = size === 'compact' ? '12px' : size === 'detailed' ? '14px' : '13px';
  const overallPct = quality.maxOverallScore > 0
    ? (quality.overallScore / quality.maxOverallScore) * 100
    : 0;

  return (
    <div
      data-agent="quality-panel"
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
      {/* Overall score */}
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
        <div style={unstyled ? {} : { fontSize: '10px', textTransform: 'uppercase', color: 'var(--agent-color-text-muted, #6b6b80)' }}>
          Overall Quality
        </div>
        <div
          style={
            unstyled
              ? {}
              : {
                  fontSize: '24px',
                  fontWeight: 700,
                  color: overallPct >= 80
                    ? 'var(--agent-color-success, #34d399)'
                    : overallPct >= 50
                      ? 'var(--agent-color-warning, #fbbf24)'
                      : 'var(--agent-color-error, #f87171)',
                }
          }
        >
          {quality.overallScore}/{quality.maxOverallScore}
        </div>
      </div>

      {/* Per-dimension scores */}
      {quality.scores.map((score) => {
        const pct = score.maxScore > 0 ? (score.score / score.maxScore) * 100 : 0;
        return (
          <div key={score.dimension} data-agent="quality-row" style={unstyled ? {} : { marginBottom: '8px' }}>
            <div style={unstyled ? {} : { display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span>{score.dimension}</span>
              <span style={{ fontFamily: 'var(--agent-font-mono, monospace)', fontSize: '12px' }}>
                {score.score}/{score.maxScore}
              </span>
            </div>
            <div
              style={
                unstyled
                  ? {}
                  : {
                      height: '6px',
                      background: 'var(--agent-color-bg-tertiary, #0f3460)',
                      borderRadius: '3px',
                      overflow: 'hidden',
                    }
              }
            >
              <div
                style={{
                  width: `${pct}%`,
                  height: '100%',
                  background:
                    pct >= 80
                      ? 'var(--agent-color-success, #34d399)'
                      : pct >= 50
                        ? 'var(--agent-color-warning, #fbbf24)'
                        : 'var(--agent-color-error, #f87171)',
                  borderRadius: '3px',
                }}
              />
            </div>
            {score.reason && (
              <div style={unstyled ? {} : { fontSize: '11px', color: 'var(--agent-color-text-muted, #6b6b80)', marginTop: '2px' }}>
                {score.reason}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
