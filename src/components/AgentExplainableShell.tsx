/**
 * AgentExplainableShell — All-in-one tabbed container for agent visualization.
 *
 * Tabs:
 *   1. Conversation — Chat-style message view with tool calls
 *   2. Metrics — Tokens, cost, tool usage in one view
 *   3. Quality — Quality scores + guardrail violations
 *
 * Like ExplainableShell for footprintjs, but designed for agent execution.
 */
import React, { useState } from 'react';
import type { BaseComponentProps, AgentSnapshot } from '../types';
import { ConversationView } from './ConversationView';
import { TokenChart } from './TokenChart';
import { ToolUsagePanel } from './ToolUsagePanel';
import { CostPanel } from './CostPanel';
import { QualityPanel } from './QualityPanel';
import { GuardrailPanel } from './GuardrailPanel';

export interface AgentExplainableShellProps extends BaseComponentProps {
  snapshot: AgentSnapshot;
  /** Default active tab. */
  defaultTab?: 'conversation' | 'metrics' | 'quality';
}

type Tab = 'conversation' | 'metrics' | 'quality';

export function AgentExplainableShell({
  snapshot,
  defaultTab = 'conversation',
  size = 'default',
  unstyled,
  className,
  style,
}: AgentExplainableShellProps) {
  const [activeTab, setActiveTab] = useState<Tab>(defaultTab);
  const fontSize = size === 'compact' ? '12px' : size === 'detailed' ? '14px' : '13px';

  const tabs: Array<{ id: Tab; label: string }> = [
    { id: 'conversation', label: 'Conversation' },
    { id: 'metrics', label: 'Metrics' },
  ];

  if (snapshot.quality || snapshot.guardrails) {
    tabs.push({ id: 'quality', label: 'Quality' });
  }

  return (
    <div
      data-agent="explainable-shell"
      className={className}
      style={{
        ...(unstyled
          ? {}
          : {
              fontFamily: 'var(--agent-font-sans, sans-serif)',
              fontSize,
              color: 'var(--agent-color-text-primary, #e8e8e8)',
              background: 'var(--agent-color-bg-primary, #1a1a2e)',
              borderRadius: 'var(--agent-radius, 8px)',
              border: '1px solid var(--agent-color-border, #2a2a40)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }),
        ...style,
      }}
    >
      {/* Header */}
      <div
        data-agent="shell-header"
        style={
          unstyled
            ? {}
            : {
                padding: '12px 16px',
                borderBottom: '1px solid var(--agent-color-border, #2a2a40)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }
        }
      >
        <div>
          <span style={{ fontWeight: 700 }}>{snapshot.agentName}</span>
          <span
            style={{
              marginLeft: '8px',
              fontSize: '11px',
              padding: '2px 6px',
              borderRadius: '4px',
              background: 'var(--agent-color-bg-tertiary, #0f3460)',
              color: 'var(--agent-color-primary, #7c6cf0)',
            }}
          >
            {snapshot.concept}
          </span>
        </div>
        <div
          style={{
            fontSize: '12px',
            color: 'var(--agent-color-text-muted, #6b6b80)',
          }}
        >
          {snapshot.turns.length} turn{snapshot.turns.length !== 1 ? 's' : ''}
          {snapshot.durationMs !== undefined && ` · ${snapshot.durationMs}ms`}
        </div>
      </div>

      {/* Tab bar */}
      <div
        data-agent="tab-bar"
        style={
          unstyled
            ? {}
            : {
                display: 'flex',
                borderBottom: '1px solid var(--agent-color-border, #2a2a40)',
              }
        }
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={
              unstyled
                ? {}
                : {
                    flex: 1,
                    padding: '10px 16px',
                    background: 'transparent',
                    border: 'none',
                    borderBottom:
                      activeTab === tab.id
                        ? '2px solid var(--agent-color-primary, #7c6cf0)'
                        : '2px solid transparent',
                    color:
                      activeTab === tab.id
                        ? 'var(--agent-color-text-primary, #e8e8e8)'
                        : 'var(--agent-color-text-muted, #6b6b80)',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    fontSize: 'inherit',
                    fontWeight: activeTab === tab.id ? 600 : 400,
                  }
            }
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div
        data-agent="tab-content"
        style={unstyled ? {} : { padding: '16px', flex: 1, overflow: 'auto' }}
      >
        {activeTab === 'conversation' && (
          <ConversationView turns={snapshot.turns} size={size} unstyled={unstyled} />
        )}

        {activeTab === 'metrics' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Section title="Token Usage" unstyled={unstyled}>
              <TokenChart tokens={snapshot.tokens} size={size} unstyled={unstyled} />
            </Section>
            <Section title="Cost" unstyled={unstyled}>
              <CostPanel cost={snapshot.cost} size={size} unstyled={unstyled} />
            </Section>
            <Section title="Tool Usage" unstyled={unstyled}>
              <ToolUsagePanel toolUsage={snapshot.toolUsage} size={size} unstyled={unstyled} />
            </Section>
          </div>
        )}

        {activeTab === 'quality' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {snapshot.quality && (
              <Section title="Quality Scores" unstyled={unstyled}>
                <QualityPanel quality={snapshot.quality} size={size} unstyled={unstyled} />
              </Section>
            )}
            {snapshot.guardrails && (
              <Section title="Guardrails" unstyled={unstyled}>
                <GuardrailPanel guardrails={snapshot.guardrails} size={size} unstyled={unstyled} />
              </Section>
            )}
          </div>
        )}
      </div>

      {/* Result footer */}
      {snapshot.result && (
        <div
          data-agent="result-footer"
          style={
            unstyled
              ? {}
              : {
                  padding: '12px 16px',
                  borderTop: '1px solid var(--agent-color-border, #2a2a40)',
                  background: 'var(--agent-color-bg-secondary, #16213e)',
                }
          }
        >
          <div
            style={{
              fontSize: '10px',
              textTransform: 'uppercase',
              color: 'var(--agent-color-text-muted, #6b6b80)',
              marginBottom: '4px',
            }}
          >
            Result
          </div>
          <div style={{ whiteSpace: 'pre-wrap' }}>{snapshot.result}</div>
        </div>
      )}
    </div>
  );
}

function Section({
  title,
  children,
  unstyled,
}: {
  title: string;
  children: React.ReactNode;
  unstyled?: boolean;
}) {
  return (
    <div>
      <div
        style={
          unstyled
            ? {}
            : {
                fontSize: '11px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                color: 'var(--agent-color-text-muted, #6b6b80)',
                marginBottom: '8px',
              }
        }
      >
        {title}
      </div>
      {children}
    </div>
  );
}
