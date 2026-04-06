/**
 * Adapter: agentfootprint → AgentSnapshot
 *
 * Converts agentfootprint execution data (AgentResult + recorders + narrative)
 * into the AgentSnapshot shape that UI components consume.
 *
 * Usage:
 *   import { toAgentSnapshot } from 'agent-explainable-ui/adapters';
 *
 *   const result = await agent.run('hello');
 *   const snapshot = toAgentSnapshot({
 *     result,
 *     narrative: agent.getNarrativeEntries(),
 *     snapshot: agent.getSnapshot(),
 *     recorders: { tokens, cost, toolUsage, quality, guardrails },
 *   });
 *
 *   <AgentExplainableShell snapshot={snapshot} />
 */

import type {
  AgentSnapshot,
  TurnSnapshot,
  MessageSnapshot,
  ToolCallSnapshot,
  TokenSnapshot,
  CostSnapshot,
  ToolUsageSnapshot,
  QualitySnapshot,
  GuardrailSnapshot,
} from '../types';

// ── Input Types (mirrors agentfootprint shapes loosely) ─────

export interface AgentfootprintInput {
  /** Result from agent.run() */
  result: {
    content: string;
    messages: Array<{ role: string; content: string; toolCallId?: string }>;
    iterations: number;
    paused?: boolean;
  };
  /** Agent name/concept */
  agentName?: string;
  concept?: 'LLMCall' | 'Agent' | 'RAG' | 'FlowChart' | 'Swarm';
  /** Duration in ms */
  durationMs?: number;
  /** Recorder outputs (all optional) */
  recorders?: {
    tokens?: {
      getStats: () => { totalCalls: number; totalInputTokens: number; totalOutputTokens: number; calls?: Array<{ inputTokens: number; outputTokens: number; turnNumber?: number }> };
    };
    cost?: {
      getTotalCost: () => number;
      getEntries?: () => Array<{ totalCost: number; turnNumber?: number }>;
    };
    toolUsage?: {
      getStats: () => { totalCalls: number; totalErrors: number; byTool: Record<string, { calls: number; errors: number; averageLatencyMs?: number }> };
    };
    quality?: {
      getScores: () => Array<{ score: number; label?: string; turnNumber?: number }>;
      getAverageScore: () => number;
    };
    guardrails?: {
      getViolations: () => Array<{ rule: string; severity: string; message: string; turnNumber?: number }>;
      hasViolations: () => boolean;
    };
  };
}

// ── Adapter ─────────────────────────────────────────────────

export function toAgentSnapshot(input: AgentfootprintInput): AgentSnapshot {
  const { result, recorders } = input;

  // Build turns from messages
  const turns = buildTurns(result.messages);

  // Token snapshot
  const tokenStats = recorders?.tokens?.getStats();
  const tokens: TokenSnapshot = {
    totalInput: tokenStats?.totalInputTokens ?? 0,
    totalOutput: tokenStats?.totalOutputTokens ?? 0,
    totalTokens: (tokenStats?.totalInputTokens ?? 0) + (tokenStats?.totalOutputTokens ?? 0),
    perTurn: tokenStats?.calls?.map((c, i) => ({
      turn: c.turnNumber ?? i + 1,
      input: c.inputTokens,
      output: c.outputTokens,
    })),
  };

  // Cost snapshot
  const cost: CostSnapshot = {
    totalCost: recorders?.cost?.getTotalCost() ?? 0,
    currency: 'USD',
    perTurn: recorders?.cost?.getEntries?.()?.map((e, i) => ({
      turn: e.turnNumber ?? i + 1,
      cost: e.totalCost,
    })),
  };

  // Tool usage snapshot
  const toolStats = recorders?.toolUsage?.getStats();
  const toolUsage: ToolUsageSnapshot = {
    totalCalls: toolStats?.totalCalls ?? 0,
    uniqueTools: toolStats ? Object.keys(toolStats.byTool).length : 0,
    perTool: toolStats
      ? Object.entries(toolStats.byTool).map(([name, stats]) => ({
          name,
          calls: stats.calls,
          avgDurationMs: stats.averageLatencyMs,
          errors: stats.errors,
        }))
      : [],
  };

  // Quality snapshot
  let quality: QualitySnapshot | undefined;
  if (recorders?.quality) {
    const scores = recorders.quality.getScores();
    quality = {
      scores: scores.map((s) => ({
        dimension: s.label ?? 'overall',
        score: s.score,
        maxScore: 1,
      })),
      overallScore: recorders.quality.getAverageScore(),
      maxOverallScore: 1,
    };
  }

  // Guardrail snapshot
  let guardrails: GuardrailSnapshot | undefined;
  if (recorders?.guardrails) {
    const violations = recorders.guardrails.getViolations();
    guardrails = {
      violations: violations.map((v) => ({
        rule: v.rule,
        severity: v.severity as 'info' | 'warning' | 'error',
        message: v.message,
        turnNumber: v.turnNumber,
      })),
      checks: violations.length + (recorders.guardrails.hasViolations() ? 0 : 1),
      passed: recorders.guardrails.hasViolations() ? 0 : 1,
      failed: violations.length,
    };
  }

  return {
    concept: input.concept ?? 'Agent',
    agentId: input.agentName ?? 'agent',
    agentName: input.agentName ?? 'Agent',
    turns,
    tokens,
    cost,
    toolUsage,
    quality,
    guardrails,
    result: result.content,
    durationMs: input.durationMs,
  };
}

// ── Helpers ─────────────────────────────────────────────────

function buildTurns(
  messages: Array<{ role: string; content: string; toolCallId?: string }>,
): TurnSnapshot[] {
  const turns: TurnSnapshot[] = [];
  let currentTurn: TurnSnapshot = { turnNumber: 1, messages: [], toolCalls: [], tokens: { input: 0, output: 0 } };

  for (const msg of messages) {
    const messageSnap: MessageSnapshot = {
      role: msg.role as MessageSnapshot['role'],
      content: typeof msg.content === 'string' ? msg.content : JSON.stringify(msg.content),
      toolCallId: msg.toolCallId,
    };

    currentTurn.messages.push(messageSnap);

    // Tool result messages contain tool call data
    if (msg.role === 'tool' && msg.toolCallId) {
      currentTurn.toolCalls.push({
        id: msg.toolCallId,
        name: msg.toolCallId, // Will be overridden if we have richer data
        arguments: {},
        result: typeof msg.content === 'string' ? msg.content : JSON.stringify(msg.content),
      });
    }

    // End of turn: assistant message with no tool calls following
    if (msg.role === 'assistant' && !messages[messages.indexOf(msg) + 1]?.toolCallId) {
      // Check if next message is a user message (new turn) or end
      const nextMsg = messages[messages.indexOf(msg) + 1];
      if (!nextMsg || nextMsg.role === 'user') {
        turns.push(currentTurn);
        currentTurn = {
          turnNumber: turns.length + 1,
          messages: [],
          toolCalls: [],
          tokens: { input: 0, output: 0 },
        };
      }
    }
  }

  // Push remaining messages
  if (currentTurn.messages.length > 0) {
    turns.push(currentTurn);
  }

  return turns;
}
