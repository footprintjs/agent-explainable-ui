/**
 * Shared types for agent-explainable-ui components.
 *
 * These mirror agentfootprint's recorder output shapes
 * so components can visualize agent execution without
 * depending on agentfootprint directly.
 */

// ── Size & Base Props ───────────────────────────────────────

export type Size = 'compact' | 'default' | 'detailed';

export interface BaseComponentProps {
  /** Component size variant. */
  size?: Size;
  /** Strip built-in styles for custom CSS. */
  unstyled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

// ── Agent Execution Snapshot ────────────────────────────────

export interface AgentSnapshot {
  /** Which concept ran (LLMCall, Agent, RAG, FlowChart, Swarm). */
  concept: 'LLMCall' | 'Agent' | 'RAG' | 'FlowChart' | 'Swarm';
  /** Agent name/id. */
  agentId: string;
  agentName: string;
  /** Ordered turns in the agent loop. */
  turns: TurnSnapshot[];
  /** Aggregated token usage. */
  tokens: TokenSnapshot;
  /** Aggregated cost. */
  cost: CostSnapshot;
  /** Tool usage summary. */
  toolUsage: ToolUsageSnapshot;
  /** Quality scores (if QualityRecorder was used). */
  quality?: QualitySnapshot;
  /** Guardrail violations (if GuardrailRecorder was used). */
  guardrails?: GuardrailSnapshot;
  /** Final result. */
  result?: string;
  /** Duration in ms. */
  durationMs?: number;
}

// ── Turn ────────────────────────────────────────────────────

export interface TurnSnapshot {
  turnNumber: number;
  /** Messages exchanged in this turn. */
  messages: MessageSnapshot[];
  /** Tool calls made in this turn. */
  toolCalls: ToolCallSnapshot[];
  /** Tokens used in this turn. */
  tokens: { input: number; output: number };
  /** Duration of this turn. */
  durationMs?: number;
}

export interface MessageSnapshot {
  role: 'system' | 'user' | 'assistant' | 'tool';
  content: string;
  /** For tool messages, the tool call ID. */
  toolCallId?: string;
  /** Timestamp. */
  timestamp?: number;
}

// ── Tool Calls ──────────────────────────────────────────────

export interface ToolCallSnapshot {
  id: string;
  name: string;
  arguments: Record<string, unknown>;
  result?: string;
  durationMs?: number;
  error?: string;
}

// ── Tokens ──────────────────────────────────────────────────

export interface TokenSnapshot {
  totalInput: number;
  totalOutput: number;
  totalTokens: number;
  /** Per-turn breakdown. */
  perTurn?: Array<{ turn: number; input: number; output: number }>;
}

// ── Cost ────────────────────────────────────────────────────

export interface CostSnapshot {
  totalCost: number;
  currency: string;
  /** Per-turn breakdown. */
  perTurn?: Array<{ turn: number; cost: number }>;
}

// ── Tool Usage ──────────────────────────────────────────────

export interface ToolUsageSnapshot {
  totalCalls: number;
  uniqueTools: number;
  /** Per-tool breakdown. */
  perTool: Array<{ name: string; calls: number; avgDurationMs?: number; errors: number }>;
}

// ── Quality ─────────────────────────────────────────────────

export interface QualitySnapshot {
  scores: Array<{ dimension: string; score: number; maxScore: number; reason?: string }>;
  overallScore: number;
  maxOverallScore: number;
}

// ── Guardrails ──────────────────────────────────────────────

export interface GuardrailSnapshot {
  violations: Array<{
    rule: string;
    severity: 'info' | 'warning' | 'error';
    message: string;
    turnNumber?: number;
  }>;
  checks: number;
  passed: number;
  failed: number;
}
