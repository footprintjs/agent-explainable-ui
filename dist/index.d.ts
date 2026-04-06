import * as react_jsx_runtime from 'react/jsx-runtime';
import React$1 from 'react';

/**
 * Shared types for agent-explainable-ui components.
 *
 * These mirror agentfootprint's recorder output shapes
 * so components can visualize agent execution without
 * depending on agentfootprint directly.
 */
type Size = 'compact' | 'default' | 'detailed';
interface BaseComponentProps {
    /** Component size variant. */
    size?: Size;
    /** Strip built-in styles for custom CSS. */
    unstyled?: boolean;
    className?: string;
    style?: React.CSSProperties;
}
interface AgentSnapshot {
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
interface TurnSnapshot {
    turnNumber: number;
    /** Messages exchanged in this turn. */
    messages: MessageSnapshot[];
    /** Tool calls made in this turn. */
    toolCalls: ToolCallSnapshot[];
    /** Tokens used in this turn. */
    tokens: {
        input: number;
        output: number;
    };
    /** Duration of this turn. */
    durationMs?: number;
}
interface MessageSnapshot {
    role: 'system' | 'user' | 'assistant' | 'tool';
    content: string;
    /** For tool messages, the tool call ID. */
    toolCallId?: string;
    /** Timestamp. */
    timestamp?: number;
}
interface ToolCallSnapshot {
    id: string;
    name: string;
    arguments: Record<string, unknown>;
    result?: string;
    durationMs?: number;
    error?: string;
}
interface TokenSnapshot {
    totalInput: number;
    totalOutput: number;
    totalTokens: number;
    /** Per-turn breakdown. */
    perTurn?: Array<{
        turn: number;
        input: number;
        output: number;
    }>;
}
interface CostSnapshot {
    totalCost: number;
    currency: string;
    /** Per-turn breakdown. */
    perTurn?: Array<{
        turn: number;
        cost: number;
    }>;
}
interface ToolUsageSnapshot {
    totalCalls: number;
    uniqueTools: number;
    /** Per-tool breakdown. */
    perTool: Array<{
        name: string;
        calls: number;
        avgDurationMs?: number;
        errors: number;
    }>;
}
interface QualitySnapshot {
    scores: Array<{
        dimension: string;
        score: number;
        maxScore: number;
        reason?: string;
    }>;
    overallScore: number;
    maxOverallScore: number;
}
interface GuardrailSnapshot {
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

/**
 * Theme tokens — CSS variable-based theming.
 * Same pattern as footprint-explainable-ui.
 */
interface ThemeTokens {
    colors?: {
        primary?: string;
        success?: string;
        error?: string;
        warning?: string;
        info?: string;
        bgPrimary?: string;
        bgSecondary?: string;
        bgTertiary?: string;
        textPrimary?: string;
        textSecondary?: string;
        textMuted?: string;
        border?: string;
        userBubble?: string;
        assistantBubble?: string;
        toolBubble?: string;
        systemBubble?: string;
    };
    radius?: string;
    fontFamily?: {
        sans?: string;
        mono?: string;
    };
}
declare const defaultTokens: ThemeTokens;
/** Convert tokens to CSS custom properties. */
declare function tokensToCSSVars(tokens: ThemeTokens): Record<string, string>;

interface ThemeContextValue {
    tokens: ThemeTokens;
}
declare function useAgentTheme(): ThemeContextValue;
interface AgentThemeProps {
    tokens?: ThemeTokens;
    children: React$1.ReactNode;
}
declare function AgentTheme({ tokens, children }: AgentThemeProps): react_jsx_runtime.JSX.Element;

declare const coolDark: ThemeTokens;
declare const warmDark: ThemeTokens;
declare const coolLight: ThemeTokens;
declare const themePresets: {
    coolDark: ThemeTokens;
    warmDark: ThemeTokens;
    coolLight: ThemeTokens;
};

interface ConversationViewProps extends BaseComponentProps {
    turns: TurnSnapshot[];
    /** Highlight turns up to this index (for time-travel). */
    activeTurnIndex?: number;
}
declare function ConversationView({ turns, activeTurnIndex, size, unstyled, className, style, }: ConversationViewProps): react_jsx_runtime.JSX.Element;

interface TokenChartProps extends BaseComponentProps {
    tokens: TokenSnapshot;
}
declare function TokenChart({ tokens, size, unstyled, className, style, }: TokenChartProps): react_jsx_runtime.JSX.Element;

interface ToolUsagePanelProps extends BaseComponentProps {
    toolUsage: ToolUsageSnapshot;
}
declare function ToolUsagePanel({ toolUsage, size, unstyled, className, style, }: ToolUsagePanelProps): react_jsx_runtime.JSX.Element;

interface CostPanelProps extends BaseComponentProps {
    cost: CostSnapshot;
}
declare function CostPanel({ cost, size, unstyled, className, style }: CostPanelProps): react_jsx_runtime.JSX.Element;

interface QualityPanelProps extends BaseComponentProps {
    quality: QualitySnapshot;
}
declare function QualityPanel({ quality, size, unstyled, className, style, }: QualityPanelProps): react_jsx_runtime.JSX.Element;

interface GuardrailPanelProps extends BaseComponentProps {
    guardrails: GuardrailSnapshot;
}
declare function GuardrailPanel({ guardrails, size, unstyled, className, style, }: GuardrailPanelProps): react_jsx_runtime.JSX.Element;

interface AgentExplainableShellProps extends BaseComponentProps {
    snapshot: AgentSnapshot;
    /** Default active tab. */
    defaultTab?: 'conversation' | 'metrics' | 'quality';
}
declare function AgentExplainableShell({ snapshot, defaultTab, size, unstyled, className, style, }: AgentExplainableShellProps): react_jsx_runtime.JSX.Element;

interface TagData {
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
interface TagTimelineProps extends BaseComponentProps {
    tags: TagData[];
    selectedTagId?: string;
    onSelectTag?: (tagId: string) => void;
}
declare function TagTimeline({ tags, selectedTagId, onSelectTag, size, unstyled, className, style, }: TagTimelineProps): react_jsx_runtime.JSX.Element | null;

interface TagFlowchartProps extends BaseComponentProps {
    tags: TagData[];
    selectedIndex: number;
    onSelectIndex: (index: number) => void;
}
declare function TagFlowchart({ tags, selectedIndex, onSelectIndex, unstyled, className, style, }: TagFlowchartProps): react_jsx_runtime.JSX.Element | null;

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

interface AgentfootprintInput {
    /** Result from agent.run() */
    result: {
        content: string;
        messages: Array<{
            role: string;
            content: string;
            toolCallId?: string;
        }>;
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
            getStats: () => {
                totalCalls: number;
                totalInputTokens: number;
                totalOutputTokens: number;
                calls?: Array<{
                    inputTokens: number;
                    outputTokens: number;
                    turnNumber?: number;
                }>;
            };
        };
        cost?: {
            getTotalCost: () => number;
            getEntries?: () => Array<{
                totalCost: number;
                turnNumber?: number;
            }>;
        };
        toolUsage?: {
            getStats: () => {
                totalCalls: number;
                totalErrors: number;
                byTool: Record<string, {
                    calls: number;
                    errors: number;
                    averageLatencyMs?: number;
                }>;
            };
        };
        quality?: {
            getScores: () => Array<{
                score: number;
                label?: string;
                turnNumber?: number;
            }>;
            getAverageScore: () => number;
        };
        guardrails?: {
            getViolations: () => Array<{
                rule: string;
                severity: string;
                message: string;
                turnNumber?: number;
            }>;
            hasViolations: () => boolean;
        };
    };
}
declare function toAgentSnapshot(input: AgentfootprintInput): AgentSnapshot;

/**
 * Filter a flowchart spec to only show tagged nodes.
 *
 * Takes the full engine spec and a list of tags. Returns a simplified spec
 * where only tag-level nodes appear. Non-tagged stages are collapsed —
 * arrows skip from one tagged node to the next.
 */

interface SpecNode {
    name: string;
    id: string;
    type?: string;
    description?: string;
    next?: SpecNode;
    children?: SpecNode[];
    hasDecider?: boolean;
    isPausable?: boolean;
    [key: string]: unknown;
}
/**
 * Generate a tag-level flowchart spec from tags.
 *
 * Instead of filtering the existing spec (which is complex with deciders,
 * subflows, branches), we BUILD a new linear spec from the tag list.
 * Each tag becomes a node. Nodes are linked linearly.
 *
 * This is simpler and works regardless of the underlying flowchart topology.
 */
declare function tagsToSpec(tags: TagData[]): SpecNode | null;

export { AgentExplainableShell, type AgentExplainableShellProps, type AgentSnapshot, AgentTheme, type AgentThemeProps, type AgentfootprintInput, type BaseComponentProps, ConversationView, type ConversationViewProps, CostPanel, type CostPanelProps, type CostSnapshot, GuardrailPanel, type GuardrailPanelProps, type GuardrailSnapshot, type MessageSnapshot, QualityPanel, type QualityPanelProps, type QualitySnapshot, type Size, type TagData, TagFlowchart, type TagFlowchartProps, TagTimeline, type TagTimelineProps, type ThemeTokens, TokenChart, type TokenChartProps, type TokenSnapshot, type ToolCallSnapshot, ToolUsagePanel, type ToolUsagePanelProps, type ToolUsageSnapshot, type TurnSnapshot, coolDark, coolLight, defaultTokens, tagsToSpec, themePresets, toAgentSnapshot, tokensToCSSVars, useAgentTheme, warmDark };
