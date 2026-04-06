/**
 * TagTimeline — Horizontal tag bar for time-travel navigation.
 *
 * Tags are meaningful checkpoints in agent execution.
 * Click a tag to see what happened at that point.
 * The selected tag expands below to show entries.
 */
import React from 'react';
import type { BaseComponentProps } from '../types';

// ── Types ──────────────────────────────────────────────────────

export interface TagData {
  id: string;
  label: string;
  entries: Array<{
    type: string;
    stageId?: string;
    stageName: string;
    description?: string;
    chosen?: string;
  }>;
  timestamp: number;
  index: number;
}

export interface TagTimelineProps extends BaseComponentProps {
  tags: TagData[];
  selectedTagId?: string;
  onSelectTag?: (tagId: string) => void;
}

// ── Icons ──────────────────────────────────────────────────────

const TAG_ICONS: Record<string, string> = {
  init: '\u2699',      // ⚙ gear
  llm: '\u{1F916}',   // 🤖 robot
  tools: '\u{1F527}', // 🔧 wrench
  instructions: '\u{1F4CB}', // 📋 clipboard
  done: '\u2714',      // ✔ check
};

function getIcon(tagId: string): string {
  for (const [prefix, icon] of Object.entries(TAG_ICONS)) {
    if (tagId.startsWith(prefix)) return icon;
  }
  return '\u25CF'; // ● default dot
}

// ── Component ──────────────────────────────────────────────────

export function TagTimeline({
  tags,
  selectedTagId,
  onSelectTag,
  size = 'default',
  unstyled,
  className,
  style,
}: TagTimelineProps) {
  const fontSize = size === 'compact' ? '11px' : size === 'detailed' ? '14px' : '12px';

  if (tags.length === 0) return null;

  return (
    <div
      data-agent="tag-timeline"
      className={className}
      style={{
        ...(unstyled ? {} : { fontFamily: 'var(--agent-font-sans, sans-serif)', fontSize }),
        ...style,
      }}
    >
      {/* Horizontal tag bar */}
      <div
        style={unstyled ? {} : {
          display: 'flex',
          alignItems: 'center',
          gap: '2px',
          padding: '8px 12px',
          overflowX: 'auto',
          borderBottom: '1px solid var(--agent-color-border, #2a2a40)',
          background: 'var(--agent-color-bg-secondary, #16213e)',
        }}
      >
        {tags.map((tag, i) => {
          const isSelected = tag.id === selectedTagId;
          return (
            <React.Fragment key={tag.id}>
              {i > 0 && (
                <div style={unstyled ? {} : {
                  width: '20px',
                  height: '2px',
                  background: 'var(--agent-color-border, #2a2a40)',
                  flexShrink: 0,
                }} />
              )}
              <button
                onClick={() => onSelectTag?.(tag.id)}
                title={`${tag.label} (${tag.entries.length} events, ${tag.timestamp}ms)`}
                style={unstyled ? {} : {
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '6px 10px',
                  border: isSelected
                    ? '1px solid var(--agent-color-primary, #7c6cf0)'
                    : '1px solid var(--agent-color-border, #2a2a40)',
                  borderRadius: '16px',
                  background: isSelected
                    ? 'var(--agent-color-primary, #7c6cf0)20'
                    : 'transparent',
                  color: isSelected
                    ? 'var(--agent-color-primary, #7c6cf0)'
                    : 'var(--agent-color-text-muted, #6b6b80)',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  fontSize: 'inherit',
                  fontWeight: isSelected ? 600 : 400,
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  transition: 'all 0.15s',
                }}
              >
                <span>{getIcon(tag.id)}</span>
                <span>{tag.label}</span>
              </button>
            </React.Fragment>
          );
        })}
      </div>

      {/* Expanded tag detail */}
      {selectedTagId && (
        <TagDetail
          tag={tags.find((t) => t.id === selectedTagId)}
          unstyled={unstyled}
        />
      )}
    </div>
  );
}

// ── Tag Detail (expanded view) ─────────────────────────────────

function TagDetail({ tag, unstyled }: { tag?: TagData; unstyled?: boolean }) {
  if (!tag) return null;

  return (
    <div
      data-agent="tag-detail"
      style={unstyled ? {} : {
        padding: '12px 16px',
        borderBottom: '1px solid var(--agent-color-border, #2a2a40)',
      }}
    >
      <div style={unstyled ? {} : {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '8px',
      }}>
        <span style={{ fontWeight: 700 }}>{tag.label}</span>
        <span style={unstyled ? {} : {
          fontSize: '11px',
          color: 'var(--agent-color-text-muted, #6b6b80)',
          fontFamily: 'var(--agent-font-mono, monospace)',
        }}>
          {tag.timestamp}ms · {tag.entries.length} event{tag.entries.length !== 1 ? 's' : ''}
        </span>
      </div>

      <div style={unstyled ? {} : {
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
      }}>
        {tag.entries.map((entry, i) => (
          <div
            key={i}
            style={unstyled ? {} : {
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '4px 8px',
              borderRadius: '4px',
              background: 'var(--agent-color-bg-primary, #1a1a2e)',
              fontSize: '11px',
            }}
          >
            <span style={unstyled ? {} : {
              width: '60px',
              flexShrink: 0,
              color: getEntryColor(entry.type),
              fontWeight: 600,
              textTransform: 'uppercase' as const,
              fontSize: '9px',
              letterSpacing: '0.5px',
            }}>
              {entry.type}
            </span>
            <span style={unstyled ? {} : {
              color: 'var(--agent-color-text-primary, #e8e8e8)',
              fontFamily: 'var(--agent-font-mono, monospace)',
            }}>
              {entry.stageName}
            </span>
            {entry.chosen && (
              <span style={unstyled ? {} : {
                padding: '1px 6px',
                borderRadius: '3px',
                background: 'var(--agent-color-primary, #7c6cf0)30',
                color: 'var(--agent-color-primary, #7c6cf0)',
                fontSize: '10px',
              }}>
                → {entry.chosen}
              </span>
            )}
            {entry.description && (
              <span style={unstyled ? {} : {
                color: 'var(--agent-color-text-muted, #6b6b80)',
                fontSize: '10px',
              }}>
                {entry.description}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function getEntryColor(type: string): string {
  switch (type) {
    case 'stage': return 'var(--agent-color-primary, #7c6cf0)';
    case 'decision': return '#f59e0b';
    case 'subflow-entry': return '#8b5cf6';
    case 'subflow-exit': return '#8b5cf6';
    case 'loop': return '#10b981';
    case 'break': return '#ef4444';
    case 'error': return '#ef4444';
    case 'pause': return '#f59e0b';
    default: return 'var(--agent-color-text-muted, #6b6b80)';
  }
}
