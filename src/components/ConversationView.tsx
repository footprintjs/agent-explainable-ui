/**
 * ConversationView — Chat-style display of agent conversation turns.
 *
 * Shows messages as bubbles with role indicators:
 *   user (blue), assistant (purple), tool (green), system (orange)
 *
 * Tool calls are shown inline with collapsible arguments/results.
 */
import React, { useState } from 'react';
import type { BaseComponentProps, TurnSnapshot, MessageSnapshot, ToolCallSnapshot } from '../types';

export interface ConversationViewProps extends BaseComponentProps {
  turns: TurnSnapshot[];
  /** Highlight turns up to this index (for time-travel). */
  activeTurnIndex?: number;
}

const roleColors: Record<string, string> = {
  user: 'var(--agent-color-user-bubble, #1e3a5f)',
  assistant: 'var(--agent-color-assistant-bubble, #2d1f4e)',
  tool: 'var(--agent-color-tool-bubble, #1f3d2e)',
  system: 'var(--agent-color-system-bubble, #3d2e1f)',
};

const roleLabels: Record<string, string> = {
  user: 'User',
  assistant: 'Assistant',
  tool: 'Tool',
  system: 'System',
};

const roleBorderColors: Record<string, string> = {
  user: 'var(--agent-color-info, #60a5fa)',
  assistant: 'var(--agent-color-primary, #7c6cf0)',
  tool: 'var(--agent-color-success, #34d399)',
  system: 'var(--agent-color-warning, #fbbf24)',
};

export function ConversationView({
  turns,
  activeTurnIndex,
  size = 'default',
  unstyled,
  className,
  style,
}: ConversationViewProps) {
  const fontSize = size === 'compact' ? '12px' : size === 'detailed' ? '15px' : '13px';
  const padding = size === 'compact' ? '8px' : size === 'detailed' ? '16px' : '12px';

  const visibleTurns = activeTurnIndex !== undefined ? turns.slice(0, activeTurnIndex + 1) : turns;

  return (
    <div
      data-agent="conversation-view"
      className={className}
      style={{
        ...(unstyled
          ? {}
          : {
              fontFamily: 'var(--agent-font-sans, sans-serif)',
              fontSize,
              color: 'var(--agent-color-text-primary, #e8e8e8)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              overflow: 'auto',
            }),
        ...style,
      }}
    >
      {visibleTurns.map((turn, ti) => (
        <div key={ti} data-agent="turn" data-turn={turn.turnNumber}>
          <div
            style={
              unstyled
                ? {}
                : {
                    fontSize: '11px',
                    color: 'var(--agent-color-text-muted, #6b6b80)',
                    marginBottom: '6px',
                    fontWeight: 600,
                  }
            }
          >
            Turn {turn.turnNumber}
            {turn.tokens && (
              <span style={{ marginLeft: '8px', opacity: 0.7 }}>
                ({turn.tokens.input + turn.tokens.output} tokens)
              </span>
            )}
          </div>

          {turn.messages.map((msg, mi) => (
            <MessageBubble key={mi} message={msg} padding={padding} unstyled={unstyled} />
          ))}

          {turn.toolCalls.length > 0 && (
            <div style={unstyled ? {} : { marginTop: '8px' }}>
              {turn.toolCalls.map((tc, tci) => (
                <ToolCallBubble key={tci} toolCall={tc} padding={padding} unstyled={unstyled} />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function MessageBubble({
  message,
  padding,
  unstyled,
}: {
  message: MessageSnapshot;
  padding: string;
  unstyled?: boolean;
}) {
  const isUser = message.role === 'user';

  return (
    <div
      data-agent="message"
      data-role={message.role}
      style={
        unstyled
          ? {}
          : {
              background: roleColors[message.role] ?? roleColors.assistant,
              borderLeft: `3px solid ${roleBorderColors[message.role] ?? roleBorderColors.assistant}`,
              borderRadius: 'var(--agent-radius, 8px)',
              padding,
              marginBottom: '6px',
              marginLeft: isUser ? '0' : '20px',
              marginRight: isUser ? '20px' : '0',
            }
      }
    >
      <div
        style={
          unstyled
            ? {}
            : {
                fontSize: '10px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                color: roleBorderColors[message.role] ?? 'inherit',
                marginBottom: '4px',
              }
        }
      >
        {roleLabels[message.role] ?? message.role}
      </div>
      <div
        style={
          unstyled
            ? {}
            : {
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                fontFamily:
                  message.role === 'tool'
                    ? 'var(--agent-font-mono, monospace)'
                    : 'var(--agent-font-sans, sans-serif)',
              }
        }
      >
        {message.content}
      </div>
    </div>
  );
}

function ToolCallBubble({
  toolCall,
  padding,
  unstyled,
}: {
  toolCall: ToolCallSnapshot;
  padding: string;
  unstyled?: boolean;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      data-agent="tool-call"
      data-tool={toolCall.name}
      style={
        unstyled
          ? {}
          : {
              background: roleColors.tool,
              borderLeft: `3px solid ${roleBorderColors.tool}`,
              borderRadius: 'var(--agent-radius, 8px)',
              padding,
              marginBottom: '6px',
              marginLeft: '20px',
              cursor: 'pointer',
            }
      }
      onClick={() => setExpanded(!expanded)}
    >
      <div style={unstyled ? {} : { display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={unstyled ? {} : { fontSize: '12px' }}>{expanded ? '▼' : '▶'}</span>
        <span
          style={
            unstyled
              ? {}
              : {
                  fontFamily: 'var(--agent-font-mono, monospace)',
                  fontWeight: 600,
                  color: 'var(--agent-color-success, #34d399)',
                }
          }
        >
          {toolCall.name}()
        </span>
        {toolCall.durationMs !== undefined && (
          <span
            style={
              unstyled ? {} : { fontSize: '11px', color: 'var(--agent-color-text-muted, #6b6b80)' }
            }
          >
            {toolCall.durationMs}ms
          </span>
        )}
        {toolCall.error && (
          <span
            style={
              unstyled ? {} : { fontSize: '11px', color: 'var(--agent-color-error, #f87171)' }
            }
          >
            ERROR
          </span>
        )}
      </div>

      {expanded && (
        <div style={unstyled ? {} : { marginTop: '8px', fontFamily: 'var(--agent-font-mono, monospace)', fontSize: '12px' }}>
          <div style={unstyled ? {} : { color: 'var(--agent-color-text-secondary, #a0a0b8)', marginBottom: '4px' }}>
            Arguments:
          </div>
          <pre style={unstyled ? {} : { margin: 0, whiteSpace: 'pre-wrap', opacity: 0.85 }}>
            {JSON.stringify(toolCall.arguments, null, 2)}
          </pre>
          {toolCall.result && (
            <>
              <div
                style={
                  unstyled
                    ? {}
                    : {
                        color: 'var(--agent-color-text-secondary, #a0a0b8)',
                        marginTop: '8px',
                        marginBottom: '4px',
                      }
                }
              >
                Result:
              </div>
              <pre style={unstyled ? {} : { margin: 0, whiteSpace: 'pre-wrap', opacity: 0.85 }}>
                {toolCall.result}
              </pre>
            </>
          )}
        </div>
      )}
    </div>
  );
}
