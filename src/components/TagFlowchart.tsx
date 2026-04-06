/**
 * TagFlowchart — Simplified flowchart showing only tagged checkpoints.
 *
 * Instead of 15+ engine stages, shows 4-6 meaningful nodes.
 * Each node is a tag. Connected by arrows. Selected node is highlighted.
 * Time travel slider below moves between tags.
 */
import React from 'react';
import type { BaseComponentProps } from '../types';
import type { TagData } from './TagTimeline';

export interface TagFlowchartProps extends BaseComponentProps {
  tags: TagData[];
  selectedIndex: number;
  onSelectIndex: (index: number) => void;
}

const TAG_COLORS: Record<string, { bg: string; border: string; icon: string }> = {
  init:  { bg: '#1e3a5f', border: '#3b82f6', icon: '\u2699' },
  llm:   { bg: '#2d1b69', border: '#7c6cf0', icon: '\uD83E\uDD16' },
  tools: { bg: '#1b4332', border: '#10b981', icon: '\uD83D\uDD27' },
  instructions: { bg: '#4a1d6b', border: '#a855f7', icon: '\uD83D\uDCCB' },
  done:  { bg: '#1a3c2a', border: '#22c55e', icon: '\u2714' },
};

function getColors(tagId: string) {
  for (const [prefix, colors] of Object.entries(TAG_COLORS)) {
    if (tagId.startsWith(prefix)) return colors;
  }
  return { bg: '#1a1a2e', border: '#4a4a60', icon: '\u25CF' };
}

export function TagFlowchart({
  tags,
  selectedIndex,
  onSelectIndex,
  unstyled,
  className,
  style,
}: TagFlowchartProps) {
  if (tags.length === 0) return null;

  return (
    <div
      data-agent="tag-flowchart"
      className={className}
      style={{
        ...(unstyled ? {} : {
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          padding: '16px',
        }),
        ...style,
      }}
    >
      {/* Flowchart: tag nodes connected by arrows */}
      <div style={unstyled ? {} : {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0',
        overflowX: 'auto',
        padding: '8px 0',
      }}>
        {tags.map((tag, i) => {
          const isSelected = i === selectedIndex;
          const isPast = i < selectedIndex;
          const colors = getColors(tag.id);

          return (
            <React.Fragment key={tag.id}>
              {/* Node */}
              <button
                onClick={() => onSelectIndex(i)}
                style={unstyled ? {} : {
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: `2px solid ${isSelected ? colors.border : isPast ? colors.border + '60' : '#2a2a40'}`,
                  background: isSelected ? colors.bg : 'transparent',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  opacity: isPast ? 0.7 : isSelected ? 1 : 0.4,
                  minWidth: '70px',
                  flexShrink: 0,
                }}
              >
                <span style={{ fontSize: '18px' }}>{colors.icon}</span>
                <span style={unstyled ? {} : {
                  fontSize: '10px',
                  fontWeight: isSelected ? 700 : 500,
                  color: isSelected ? '#fff' : '#888',
                  whiteSpace: 'nowrap',
                  fontFamily: 'var(--agent-font-sans, sans-serif)',
                }}>
                  {tag.label}
                </span>
                <span style={unstyled ? {} : {
                  fontSize: '9px',
                  color: '#555',
                  fontFamily: 'var(--agent-font-mono, monospace)',
                }}>
                  {tag.entries.length} events
                </span>
              </button>

              {/* Arrow between nodes */}
              {i < tags.length - 1 && (
                <div style={unstyled ? {} : {
                  width: '30px',
                  height: '2px',
                  background: isPast ? colors.border + '60' : '#2a2a40',
                  position: 'relative' as const,
                  flexShrink: 0,
                }}>
                  <div style={{
                    position: 'absolute',
                    right: '-3px',
                    top: '-3px',
                    width: '0',
                    height: '0',
                    borderTop: '4px solid transparent',
                    borderBottom: '4px solid transparent',
                    borderLeft: `6px solid ${isPast ? colors.border + '60' : '#2a2a40'}`,
                  }} />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Time travel slider */}
      <div style={unstyled ? {} : {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '0 12px',
      }}>
        <button
          onClick={() => onSelectIndex(Math.max(0, selectedIndex - 1))}
          disabled={selectedIndex === 0}
          style={unstyled ? {} : {
            background: 'transparent',
            border: 'none',
            color: selectedIndex === 0 ? '#333' : '#7c6cf0',
            cursor: selectedIndex === 0 ? 'default' : 'pointer',
            fontSize: '16px',
            fontWeight: 700,
            padding: '4px 8px',
          }}
        >
          &larr;
        </button>

        <input
          type="range"
          min={0}
          max={tags.length - 1}
          value={selectedIndex}
          onChange={(e) => onSelectIndex(Number(e.target.value))}
          style={unstyled ? {} : {
            flex: 1,
            accentColor: '#7c6cf0',
          }}
        />

        <button
          onClick={() => onSelectIndex(Math.min(tags.length - 1, selectedIndex + 1))}
          disabled={selectedIndex >= tags.length - 1}
          style={unstyled ? {} : {
            background: 'transparent',
            border: 'none',
            color: selectedIndex >= tags.length - 1 ? '#333' : '#7c6cf0',
            cursor: selectedIndex >= tags.length - 1 ? 'default' : 'pointer',
            fontSize: '16px',
            fontWeight: 700,
            padding: '4px 8px',
          }}
        >
          &rarr;
        </button>

        <span style={unstyled ? {} : {
          fontSize: '11px',
          color: '#888',
          fontFamily: 'var(--agent-font-mono, monospace)',
          whiteSpace: 'nowrap',
        }}>
          {selectedIndex + 1}/{tags.length}
        </span>
      </div>
    </div>
  );
}
