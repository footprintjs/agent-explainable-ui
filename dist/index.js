// src/theme/tokens.ts
var defaultTokens = {
  colors: {
    primary: "#7c6cf0",
    success: "#34d399",
    error: "#f87171",
    warning: "#fbbf24",
    info: "#60a5fa",
    bgPrimary: "#1a1a2e",
    bgSecondary: "#16213e",
    bgTertiary: "#0f3460",
    textPrimary: "#e8e8e8",
    textSecondary: "#a0a0b8",
    textMuted: "#6b6b80",
    border: "#2a2a40",
    userBubble: "#1e3a5f",
    assistantBubble: "#2d1f4e",
    toolBubble: "#1f3d2e",
    systemBubble: "#3d2e1f"
  },
  radius: "8px",
  fontFamily: {
    sans: "'Inter', -apple-system, sans-serif",
    mono: "'JetBrains Mono', 'Fira Code', monospace"
  }
};
function tokensToCSSVars(tokens) {
  const vars = {};
  if (tokens.colors) {
    for (const [key, value] of Object.entries(tokens.colors)) {
      if (value) vars[`--agent-color-${kebab(key)}`] = value;
    }
  }
  if (tokens.radius) vars["--agent-radius"] = tokens.radius;
  if (tokens.fontFamily?.sans) vars["--agent-font-sans"] = tokens.fontFamily.sans;
  if (tokens.fontFamily?.mono) vars["--agent-font-mono"] = tokens.fontFamily.mono;
  return vars;
}
function kebab(str) {
  return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

// src/theme/ThemeProvider.tsx
import { createContext, useContext, useMemo } from "react";
import { jsx } from "react/jsx-runtime";
var ThemeContext = createContext({ tokens: defaultTokens });
function useAgentTheme() {
  return useContext(ThemeContext);
}
function AgentTheme({ tokens = defaultTokens, children }) {
  const cssVars = useMemo(() => tokensToCSSVars(tokens), [tokens]);
  return /* @__PURE__ */ jsx(ThemeContext.Provider, { value: { tokens }, children: /* @__PURE__ */ jsx("div", { style: cssVars, "data-agent-theme": true, children }) });
}

// src/theme/presets.ts
var coolDark = {
  colors: {
    primary: "#7c6cf0",
    success: "#34d399",
    error: "#f87171",
    warning: "#fbbf24",
    info: "#60a5fa",
    bgPrimary: "#1a1a2e",
    bgSecondary: "#16213e",
    bgTertiary: "#0f3460",
    textPrimary: "#e8e8e8",
    textSecondary: "#a0a0b8",
    textMuted: "#6b6b80",
    border: "#2a2a40",
    userBubble: "#1e3a5f",
    assistantBubble: "#2d1f4e",
    toolBubble: "#1f3d2e",
    systemBubble: "#3d2e1f"
  },
  radius: "8px",
  fontFamily: {
    sans: "'Inter', -apple-system, sans-serif",
    mono: "'JetBrains Mono', 'Fira Code', monospace"
  }
};
var warmDark = {
  colors: {
    primary: "#e0916e",
    success: "#6fcf97",
    error: "#eb5757",
    warning: "#f2c94c",
    info: "#56ccf2",
    bgPrimary: "#1e1a16",
    bgSecondary: "#2a2420",
    bgTertiary: "#3a3228",
    textPrimary: "#f0e8d8",
    textSecondary: "#b0a890",
    textMuted: "#7a7060",
    border: "#3a3228",
    userBubble: "#2a3828",
    assistantBubble: "#382a28",
    toolBubble: "#283a2e",
    systemBubble: "#3a3228"
  },
  radius: "6px"
};
var coolLight = {
  colors: {
    primary: "#6366f1",
    success: "#10b981",
    error: "#ef4444",
    warning: "#f59e0b",
    info: "#3b82f6",
    bgPrimary: "#ffffff",
    bgSecondary: "#f8fafc",
    bgTertiary: "#f1f5f9",
    textPrimary: "#1e293b",
    textSecondary: "#64748b",
    textMuted: "#94a3b8",
    border: "#e2e8f0",
    userBubble: "#eff6ff",
    assistantBubble: "#f5f3ff",
    toolBubble: "#ecfdf5",
    systemBubble: "#fff7ed"
  },
  radius: "8px"
};
var themePresets = { coolDark, warmDark, coolLight };

// src/components/ConversationView.tsx
import { useState } from "react";
import { Fragment, jsx as jsx2, jsxs } from "react/jsx-runtime";
var roleColors = {
  user: "var(--agent-color-user-bubble, #1e3a5f)",
  assistant: "var(--agent-color-assistant-bubble, #2d1f4e)",
  tool: "var(--agent-color-tool-bubble, #1f3d2e)",
  system: "var(--agent-color-system-bubble, #3d2e1f)"
};
var roleLabels = {
  user: "User",
  assistant: "Assistant",
  tool: "Tool",
  system: "System"
};
var roleBorderColors = {
  user: "var(--agent-color-info, #60a5fa)",
  assistant: "var(--agent-color-primary, #7c6cf0)",
  tool: "var(--agent-color-success, #34d399)",
  system: "var(--agent-color-warning, #fbbf24)"
};
function ConversationView({
  turns,
  activeTurnIndex,
  size = "default",
  unstyled,
  className,
  style
}) {
  const fontSize = size === "compact" ? "12px" : size === "detailed" ? "15px" : "13px";
  const padding = size === "compact" ? "8px" : size === "detailed" ? "16px" : "12px";
  const visibleTurns = activeTurnIndex !== void 0 ? turns.slice(0, activeTurnIndex + 1) : turns;
  return /* @__PURE__ */ jsx2(
    "div",
    {
      "data-agent": "conversation-view",
      className,
      style: {
        ...unstyled ? {} : {
          fontFamily: "var(--agent-font-sans, sans-serif)",
          fontSize,
          color: "var(--agent-color-text-primary, #e8e8e8)",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          overflow: "auto"
        },
        ...style
      },
      children: visibleTurns.map((turn, ti) => /* @__PURE__ */ jsxs("div", { "data-agent": "turn", "data-turn": turn.turnNumber, children: [
        /* @__PURE__ */ jsxs(
          "div",
          {
            style: unstyled ? {} : {
              fontSize: "11px",
              color: "var(--agent-color-text-muted, #6b6b80)",
              marginBottom: "6px",
              fontWeight: 600
            },
            children: [
              "Turn ",
              turn.turnNumber,
              turn.tokens && /* @__PURE__ */ jsxs("span", { style: { marginLeft: "8px", opacity: 0.7 }, children: [
                "(",
                turn.tokens.input + turn.tokens.output,
                " tokens)"
              ] })
            ]
          }
        ),
        turn.messages.map((msg, mi) => /* @__PURE__ */ jsx2(MessageBubble, { message: msg, padding, unstyled }, mi)),
        turn.toolCalls.length > 0 && /* @__PURE__ */ jsx2("div", { style: unstyled ? {} : { marginTop: "8px" }, children: turn.toolCalls.map((tc, tci) => /* @__PURE__ */ jsx2(ToolCallBubble, { toolCall: tc, padding, unstyled }, tci)) })
      ] }, ti))
    }
  );
}
function MessageBubble({
  message,
  padding,
  unstyled
}) {
  const isUser = message.role === "user";
  return /* @__PURE__ */ jsxs(
    "div",
    {
      "data-agent": "message",
      "data-role": message.role,
      style: unstyled ? {} : {
        background: roleColors[message.role] ?? roleColors.assistant,
        borderLeft: `3px solid ${roleBorderColors[message.role] ?? roleBorderColors.assistant}`,
        borderRadius: "var(--agent-radius, 8px)",
        padding,
        marginBottom: "6px",
        marginLeft: isUser ? "0" : "20px",
        marginRight: isUser ? "20px" : "0"
      },
      children: [
        /* @__PURE__ */ jsx2(
          "div",
          {
            style: unstyled ? {} : {
              fontSize: "10px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              color: roleBorderColors[message.role] ?? "inherit",
              marginBottom: "4px"
            },
            children: roleLabels[message.role] ?? message.role
          }
        ),
        /* @__PURE__ */ jsx2(
          "div",
          {
            style: unstyled ? {} : {
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              fontFamily: message.role === "tool" ? "var(--agent-font-mono, monospace)" : "var(--agent-font-sans, sans-serif)"
            },
            children: message.content
          }
        )
      ]
    }
  );
}
function ToolCallBubble({
  toolCall,
  padding,
  unstyled
}) {
  const [expanded, setExpanded] = useState(false);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      "data-agent": "tool-call",
      "data-tool": toolCall.name,
      style: unstyled ? {} : {
        background: roleColors.tool,
        borderLeft: `3px solid ${roleBorderColors.tool}`,
        borderRadius: "var(--agent-radius, 8px)",
        padding,
        marginBottom: "6px",
        marginLeft: "20px",
        cursor: "pointer"
      },
      onClick: () => setExpanded(!expanded),
      children: [
        /* @__PURE__ */ jsxs("div", { style: unstyled ? {} : { display: "flex", alignItems: "center", gap: "8px" }, children: [
          /* @__PURE__ */ jsx2("span", { style: unstyled ? {} : { fontSize: "12px" }, children: expanded ? "\u25BC" : "\u25B6" }),
          /* @__PURE__ */ jsxs(
            "span",
            {
              style: unstyled ? {} : {
                fontFamily: "var(--agent-font-mono, monospace)",
                fontWeight: 600,
                color: "var(--agent-color-success, #34d399)"
              },
              children: [
                toolCall.name,
                "()"
              ]
            }
          ),
          toolCall.durationMs !== void 0 && /* @__PURE__ */ jsxs(
            "span",
            {
              style: unstyled ? {} : { fontSize: "11px", color: "var(--agent-color-text-muted, #6b6b80)" },
              children: [
                toolCall.durationMs,
                "ms"
              ]
            }
          ),
          toolCall.error && /* @__PURE__ */ jsx2(
            "span",
            {
              style: unstyled ? {} : { fontSize: "11px", color: "var(--agent-color-error, #f87171)" },
              children: "ERROR"
            }
          )
        ] }),
        expanded && /* @__PURE__ */ jsxs("div", { style: unstyled ? {} : { marginTop: "8px", fontFamily: "var(--agent-font-mono, monospace)", fontSize: "12px" }, children: [
          /* @__PURE__ */ jsx2("div", { style: unstyled ? {} : { color: "var(--agent-color-text-secondary, #a0a0b8)", marginBottom: "4px" }, children: "Arguments:" }),
          /* @__PURE__ */ jsx2("pre", { style: unstyled ? {} : { margin: 0, whiteSpace: "pre-wrap", opacity: 0.85 }, children: JSON.stringify(toolCall.arguments, null, 2) }),
          toolCall.result && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx2(
              "div",
              {
                style: unstyled ? {} : {
                  color: "var(--agent-color-text-secondary, #a0a0b8)",
                  marginTop: "8px",
                  marginBottom: "4px"
                },
                children: "Result:"
              }
            ),
            /* @__PURE__ */ jsx2("pre", { style: unstyled ? {} : { margin: 0, whiteSpace: "pre-wrap", opacity: 0.85 }, children: toolCall.result })
          ] })
        ] })
      ]
    }
  );
}

// src/components/TokenChart.tsx
import { jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
function TokenChart({
  tokens,
  size = "default",
  unstyled,
  className,
  style
}) {
  const barHeight = size === "compact" ? 16 : size === "detailed" ? 28 : 22;
  const fontSize = size === "compact" ? "11px" : size === "detailed" ? "14px" : "12px";
  const perTurn = tokens.perTurn ?? [];
  const maxTokens = Math.max(...perTurn.map((t) => t.input + t.output), 1);
  return /* @__PURE__ */ jsxs2(
    "div",
    {
      "data-agent": "token-chart",
      className,
      style: {
        ...unstyled ? {} : {
          fontFamily: "var(--agent-font-sans, sans-serif)",
          fontSize,
          color: "var(--agent-color-text-primary, #e8e8e8)"
        },
        ...style
      },
      children: [
        /* @__PURE__ */ jsxs2(
          "div",
          {
            style: unstyled ? {} : {
              display: "flex",
              gap: "16px",
              marginBottom: "12px",
              padding: "8px 12px",
              background: "var(--agent-color-bg-secondary, #16213e)",
              borderRadius: "var(--agent-radius, 8px)"
            },
            children: [
              /* @__PURE__ */ jsx3(Stat, { label: "Input", value: tokens.totalInput, color: "var(--agent-color-info, #60a5fa)", unstyled }),
              /* @__PURE__ */ jsx3(Stat, { label: "Output", value: tokens.totalOutput, color: "var(--agent-color-primary, #7c6cf0)", unstyled }),
              /* @__PURE__ */ jsx3(Stat, { label: "Total", value: tokens.totalTokens, color: "var(--agent-color-text-primary, #e8e8e8)", unstyled })
            ]
          }
        ),
        perTurn.map((turn) => {
          const total = turn.input + turn.output;
          const inputWidth = turn.input / maxTokens * 100;
          const outputWidth = turn.output / maxTokens * 100;
          return /* @__PURE__ */ jsxs2(
            "div",
            {
              "data-agent": "token-bar",
              style: unstyled ? {} : {
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "4px"
              },
              children: [
                /* @__PURE__ */ jsxs2(
                  "span",
                  {
                    style: unstyled ? {} : {
                      width: "40px",
                      textAlign: "right",
                      fontSize: "11px",
                      color: "var(--agent-color-text-muted, #6b6b80)",
                      flexShrink: 0
                    },
                    children: [
                      "T",
                      turn.turn
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs2(
                  "div",
                  {
                    style: unstyled ? {} : {
                      flex: 1,
                      display: "flex",
                      height: `${barHeight}px`,
                      borderRadius: "4px",
                      overflow: "hidden"
                    },
                    children: [
                      /* @__PURE__ */ jsx3(
                        "div",
                        {
                          style: {
                            width: `${inputWidth}%`,
                            background: "var(--agent-color-info, #60a5fa)",
                            opacity: 0.8
                          }
                        }
                      ),
                      /* @__PURE__ */ jsx3(
                        "div",
                        {
                          style: {
                            width: `${outputWidth}%`,
                            background: "var(--agent-color-primary, #7c6cf0)",
                            opacity: 0.8
                          }
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsx3(
                  "span",
                  {
                    style: unstyled ? {} : {
                      width: "60px",
                      fontSize: "11px",
                      color: "var(--agent-color-text-secondary, #a0a0b8)",
                      flexShrink: 0
                    },
                    children: total.toLocaleString()
                  }
                )
              ]
            },
            turn.turn
          );
        })
      ]
    }
  );
}
function Stat({
  label,
  value,
  color,
  unstyled
}) {
  return /* @__PURE__ */ jsxs2("div", { style: unstyled ? {} : { textAlign: "center" }, children: [
    /* @__PURE__ */ jsx3(
      "div",
      {
        style: unstyled ? {} : { fontSize: "10px", textTransform: "uppercase", color: "var(--agent-color-text-muted, #6b6b80)" },
        children: label
      }
    ),
    /* @__PURE__ */ jsx3("div", { style: unstyled ? {} : { fontSize: "16px", fontWeight: 700, color }, children: value.toLocaleString() })
  ] });
}

// src/components/ToolUsagePanel.tsx
import { jsx as jsx4, jsxs as jsxs3 } from "react/jsx-runtime";
function ToolUsagePanel({
  toolUsage,
  size = "default",
  unstyled,
  className,
  style
}) {
  const fontSize = size === "compact" ? "12px" : size === "detailed" ? "14px" : "13px";
  const sorted = [...toolUsage.perTool].sort((a, b) => b.calls - a.calls);
  return /* @__PURE__ */ jsxs3(
    "div",
    {
      "data-agent": "tool-usage",
      className,
      style: {
        ...unstyled ? {} : {
          fontFamily: "var(--agent-font-sans, sans-serif)",
          fontSize,
          color: "var(--agent-color-text-primary, #e8e8e8)"
        },
        ...style
      },
      children: [
        /* @__PURE__ */ jsxs3(
          "div",
          {
            style: unstyled ? {} : {
              display: "flex",
              gap: "16px",
              marginBottom: "12px",
              padding: "8px 12px",
              background: "var(--agent-color-bg-secondary, #16213e)",
              borderRadius: "var(--agent-radius, 8px)"
            },
            children: [
              /* @__PURE__ */ jsxs3("div", { children: [
                /* @__PURE__ */ jsx4("span", { style: { color: "var(--agent-color-text-muted, #6b6b80)", fontSize: "11px" }, children: "Total Calls" }),
                /* @__PURE__ */ jsx4("div", { style: { fontWeight: 700, fontSize: "16px" }, children: toolUsage.totalCalls })
              ] }),
              /* @__PURE__ */ jsxs3("div", { children: [
                /* @__PURE__ */ jsx4("span", { style: { color: "var(--agent-color-text-muted, #6b6b80)", fontSize: "11px" }, children: "Unique Tools" }),
                /* @__PURE__ */ jsx4("div", { style: { fontWeight: 700, fontSize: "16px" }, children: toolUsage.uniqueTools })
              ] })
            ]
          }
        ),
        sorted.map((tool) => {
          const errorRate = tool.calls > 0 ? tool.errors / tool.calls * 100 : 0;
          return /* @__PURE__ */ jsxs3(
            "div",
            {
              "data-agent": "tool-row",
              style: unstyled ? {} : {
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "6px 10px",
                borderBottom: "1px solid var(--agent-color-border, #2a2a40)"
              },
              children: [
                /* @__PURE__ */ jsx4(
                  "span",
                  {
                    style: unstyled ? {} : {
                      fontFamily: "var(--agent-font-mono, monospace)",
                      color: "var(--agent-color-success, #34d399)",
                      fontWeight: 600
                    },
                    children: tool.name
                  }
                ),
                /* @__PURE__ */ jsxs3("div", { style: unstyled ? {} : { display: "flex", gap: "16px", fontSize: "12px" }, children: [
                  /* @__PURE__ */ jsxs3("span", { children: [
                    tool.calls,
                    " calls"
                  ] }),
                  tool.avgDurationMs !== void 0 && /* @__PURE__ */ jsxs3("span", { style: { color: "var(--agent-color-text-muted, #6b6b80)" }, children: [
                    "~",
                    Math.round(tool.avgDurationMs),
                    "ms"
                  ] }),
                  tool.errors > 0 && /* @__PURE__ */ jsxs3("span", { style: { color: "var(--agent-color-error, #f87171)" }, children: [
                    errorRate.toFixed(0),
                    "% err"
                  ] })
                ] })
              ]
            },
            tool.name
          );
        }),
        sorted.length === 0 && /* @__PURE__ */ jsx4(
          "div",
          {
            style: unstyled ? {} : {
              textAlign: "center",
              padding: "20px",
              color: "var(--agent-color-text-muted, #6b6b80)"
            },
            children: "No tool calls recorded"
          }
        )
      ]
    }
  );
}

// src/components/CostPanel.tsx
import { jsx as jsx5, jsxs as jsxs4 } from "react/jsx-runtime";
function CostPanel({ cost, size = "default", unstyled, className, style }) {
  const fontSize = size === "compact" ? "12px" : size === "detailed" ? "14px" : "13px";
  const perTurn = cost.perTurn ?? [];
  return /* @__PURE__ */ jsxs4(
    "div",
    {
      "data-agent": "cost-panel",
      className,
      style: {
        ...unstyled ? {} : {
          fontFamily: "var(--agent-font-sans, sans-serif)",
          fontSize,
          color: "var(--agent-color-text-primary, #e8e8e8)"
        },
        ...style
      },
      children: [
        /* @__PURE__ */ jsxs4(
          "div",
          {
            style: unstyled ? {} : {
              padding: "12px 16px",
              background: "var(--agent-color-bg-secondary, #16213e)",
              borderRadius: "var(--agent-radius, 8px)",
              marginBottom: "12px",
              textAlign: "center"
            },
            children: [
              /* @__PURE__ */ jsx5(
                "div",
                {
                  style: unstyled ? {} : {
                    fontSize: "10px",
                    textTransform: "uppercase",
                    color: "var(--agent-color-text-muted, #6b6b80)",
                    marginBottom: "4px"
                  },
                  children: "Total Cost"
                }
              ),
              /* @__PURE__ */ jsxs4(
                "div",
                {
                  style: unstyled ? {} : {
                    fontSize: "24px",
                    fontWeight: 700,
                    color: "var(--agent-color-warning, #fbbf24)",
                    fontFamily: "var(--agent-font-mono, monospace)"
                  },
                  children: [
                    cost.currency,
                    cost.totalCost.toFixed(6)
                  ]
                }
              )
            ]
          }
        ),
        perTurn.length > 0 && /* @__PURE__ */ jsx5("div", { children: perTurn.map((entry) => /* @__PURE__ */ jsxs4(
          "div",
          {
            style: unstyled ? {} : {
              display: "flex",
              justifyContent: "space-between",
              padding: "4px 10px",
              fontSize: "12px",
              borderBottom: "1px solid var(--agent-color-border, #2a2a40)"
            },
            children: [
              /* @__PURE__ */ jsxs4("span", { style: { color: "var(--agent-color-text-muted, #6b6b80)" }, children: [
                "Turn ",
                entry.turn
              ] }),
              /* @__PURE__ */ jsxs4("span", { style: { fontFamily: "var(--agent-font-mono, monospace)" }, children: [
                cost.currency,
                entry.cost.toFixed(6)
              ] })
            ]
          },
          entry.turn
        )) })
      ]
    }
  );
}

// src/components/QualityPanel.tsx
import { jsx as jsx6, jsxs as jsxs5 } from "react/jsx-runtime";
function QualityPanel({
  quality,
  size = "default",
  unstyled,
  className,
  style
}) {
  const fontSize = size === "compact" ? "12px" : size === "detailed" ? "14px" : "13px";
  const overallPct = quality.maxOverallScore > 0 ? quality.overallScore / quality.maxOverallScore * 100 : 0;
  return /* @__PURE__ */ jsxs5(
    "div",
    {
      "data-agent": "quality-panel",
      className,
      style: {
        ...unstyled ? {} : {
          fontFamily: "var(--agent-font-sans, sans-serif)",
          fontSize,
          color: "var(--agent-color-text-primary, #e8e8e8)"
        },
        ...style
      },
      children: [
        /* @__PURE__ */ jsxs5(
          "div",
          {
            style: unstyled ? {} : {
              padding: "12px 16px",
              background: "var(--agent-color-bg-secondary, #16213e)",
              borderRadius: "var(--agent-radius, 8px)",
              marginBottom: "12px",
              textAlign: "center"
            },
            children: [
              /* @__PURE__ */ jsx6("div", { style: unstyled ? {} : { fontSize: "10px", textTransform: "uppercase", color: "var(--agent-color-text-muted, #6b6b80)" }, children: "Overall Quality" }),
              /* @__PURE__ */ jsxs5(
                "div",
                {
                  style: unstyled ? {} : {
                    fontSize: "24px",
                    fontWeight: 700,
                    color: overallPct >= 80 ? "var(--agent-color-success, #34d399)" : overallPct >= 50 ? "var(--agent-color-warning, #fbbf24)" : "var(--agent-color-error, #f87171)"
                  },
                  children: [
                    quality.overallScore,
                    "/",
                    quality.maxOverallScore
                  ]
                }
              )
            ]
          }
        ),
        quality.scores.map((score) => {
          const pct = score.maxScore > 0 ? score.score / score.maxScore * 100 : 0;
          return /* @__PURE__ */ jsxs5("div", { "data-agent": "quality-row", style: unstyled ? {} : { marginBottom: "8px" }, children: [
            /* @__PURE__ */ jsxs5("div", { style: unstyled ? {} : { display: "flex", justifyContent: "space-between", marginBottom: "4px" }, children: [
              /* @__PURE__ */ jsx6("span", { children: score.dimension }),
              /* @__PURE__ */ jsxs5("span", { style: { fontFamily: "var(--agent-font-mono, monospace)", fontSize: "12px" }, children: [
                score.score,
                "/",
                score.maxScore
              ] })
            ] }),
            /* @__PURE__ */ jsx6(
              "div",
              {
                style: unstyled ? {} : {
                  height: "6px",
                  background: "var(--agent-color-bg-tertiary, #0f3460)",
                  borderRadius: "3px",
                  overflow: "hidden"
                },
                children: /* @__PURE__ */ jsx6(
                  "div",
                  {
                    style: {
                      width: `${pct}%`,
                      height: "100%",
                      background: pct >= 80 ? "var(--agent-color-success, #34d399)" : pct >= 50 ? "var(--agent-color-warning, #fbbf24)" : "var(--agent-color-error, #f87171)",
                      borderRadius: "3px"
                    }
                  }
                )
              }
            ),
            score.reason && /* @__PURE__ */ jsx6("div", { style: unstyled ? {} : { fontSize: "11px", color: "var(--agent-color-text-muted, #6b6b80)", marginTop: "2px" }, children: score.reason })
          ] }, score.dimension);
        })
      ]
    }
  );
}

// src/components/GuardrailPanel.tsx
import { jsx as jsx7, jsxs as jsxs6 } from "react/jsx-runtime";
var severityColors = {
  info: "var(--agent-color-info, #60a5fa)",
  warning: "var(--agent-color-warning, #fbbf24)",
  error: "var(--agent-color-error, #f87171)"
};
var severityIcons = {
  info: "\u2139",
  warning: "\u26A0",
  error: "\u2715"
};
function GuardrailPanel({
  guardrails,
  size = "default",
  unstyled,
  className,
  style
}) {
  const fontSize = size === "compact" ? "12px" : size === "detailed" ? "14px" : "13px";
  return /* @__PURE__ */ jsxs6(
    "div",
    {
      "data-agent": "guardrail-panel",
      className,
      style: {
        ...unstyled ? {} : {
          fontFamily: "var(--agent-font-sans, sans-serif)",
          fontSize,
          color: "var(--agent-color-text-primary, #e8e8e8)"
        },
        ...style
      },
      children: [
        /* @__PURE__ */ jsxs6(
          "div",
          {
            style: unstyled ? {} : {
              display: "flex",
              gap: "16px",
              marginBottom: "12px",
              padding: "8px 12px",
              background: "var(--agent-color-bg-secondary, #16213e)",
              borderRadius: "var(--agent-radius, 8px)"
            },
            children: [
              /* @__PURE__ */ jsxs6("div", { style: { textAlign: "center" }, children: [
                /* @__PURE__ */ jsx7("div", { style: { fontSize: "10px", color: "var(--agent-color-text-muted, #6b6b80)" }, children: "Checks" }),
                /* @__PURE__ */ jsx7("div", { style: { fontWeight: 700 }, children: guardrails.checks })
              ] }),
              /* @__PURE__ */ jsxs6("div", { style: { textAlign: "center" }, children: [
                /* @__PURE__ */ jsx7("div", { style: { fontSize: "10px", color: "var(--agent-color-text-muted, #6b6b80)" }, children: "Passed" }),
                /* @__PURE__ */ jsx7("div", { style: { fontWeight: 700, color: "var(--agent-color-success, #34d399)" }, children: guardrails.passed })
              ] }),
              /* @__PURE__ */ jsxs6("div", { style: { textAlign: "center" }, children: [
                /* @__PURE__ */ jsx7("div", { style: { fontSize: "10px", color: "var(--agent-color-text-muted, #6b6b80)" }, children: "Failed" }),
                /* @__PURE__ */ jsx7(
                  "div",
                  {
                    style: {
                      fontWeight: 700,
                      color: guardrails.failed > 0 ? "var(--agent-color-error, #f87171)" : "var(--agent-color-success, #34d399)"
                    },
                    children: guardrails.failed
                  }
                )
              ] })
            ]
          }
        ),
        guardrails.violations.map((v, i) => /* @__PURE__ */ jsxs6(
          "div",
          {
            "data-agent": "violation",
            style: unstyled ? {} : {
              display: "flex",
              gap: "8px",
              padding: "8px 10px",
              borderLeft: `3px solid ${severityColors[v.severity] ?? severityColors.warning}`,
              background: "var(--agent-color-bg-secondary, #16213e)",
              borderRadius: "0 var(--agent-radius, 8px) var(--agent-radius, 8px) 0",
              marginBottom: "6px"
            },
            children: [
              /* @__PURE__ */ jsx7("span", { style: { color: severityColors[v.severity], fontSize: "14px", flexShrink: 0 }, children: severityIcons[v.severity] ?? "?" }),
              /* @__PURE__ */ jsxs6("div", { children: [
                /* @__PURE__ */ jsx7("div", { style: { fontWeight: 600 }, children: v.rule }),
                /* @__PURE__ */ jsx7("div", { style: { fontSize: "12px", color: "var(--agent-color-text-secondary, #a0a0b8)" }, children: v.message }),
                v.turnNumber !== void 0 && /* @__PURE__ */ jsxs6("div", { style: { fontSize: "11px", color: "var(--agent-color-text-muted, #6b6b80)" }, children: [
                  "Turn ",
                  v.turnNumber
                ] })
              ] })
            ]
          },
          i
        )),
        guardrails.violations.length === 0 && /* @__PURE__ */ jsx7(
          "div",
          {
            style: unstyled ? {} : {
              textAlign: "center",
              padding: "20px",
              color: "var(--agent-color-success, #34d399)"
            },
            children: "All checks passed"
          }
        )
      ]
    }
  );
}

// src/components/AgentExplainableShell.tsx
import { useState as useState2 } from "react";
import { jsx as jsx8, jsxs as jsxs7 } from "react/jsx-runtime";
function AgentExplainableShell({
  snapshot,
  defaultTab = "conversation",
  size = "default",
  unstyled,
  className,
  style
}) {
  const [activeTab, setActiveTab] = useState2(defaultTab);
  const fontSize = size === "compact" ? "12px" : size === "detailed" ? "14px" : "13px";
  const tabs = [
    { id: "conversation", label: "Conversation" },
    { id: "metrics", label: "Metrics" }
  ];
  if (snapshot.quality || snapshot.guardrails) {
    tabs.push({ id: "quality", label: "Quality" });
  }
  return /* @__PURE__ */ jsxs7(
    "div",
    {
      "data-agent": "explainable-shell",
      className,
      style: {
        ...unstyled ? {} : {
          fontFamily: "var(--agent-font-sans, sans-serif)",
          fontSize,
          color: "var(--agent-color-text-primary, #e8e8e8)",
          background: "var(--agent-color-bg-primary, #1a1a2e)",
          borderRadius: "var(--agent-radius, 8px)",
          border: "1px solid var(--agent-color-border, #2a2a40)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column"
        },
        ...style
      },
      children: [
        /* @__PURE__ */ jsxs7(
          "div",
          {
            "data-agent": "shell-header",
            style: unstyled ? {} : {
              padding: "12px 16px",
              borderBottom: "1px solid var(--agent-color-border, #2a2a40)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            },
            children: [
              /* @__PURE__ */ jsxs7("div", { children: [
                /* @__PURE__ */ jsx8("span", { style: { fontWeight: 700 }, children: snapshot.agentName }),
                /* @__PURE__ */ jsx8(
                  "span",
                  {
                    style: {
                      marginLeft: "8px",
                      fontSize: "11px",
                      padding: "2px 6px",
                      borderRadius: "4px",
                      background: "var(--agent-color-bg-tertiary, #0f3460)",
                      color: "var(--agent-color-primary, #7c6cf0)"
                    },
                    children: snapshot.concept
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs7(
                "div",
                {
                  style: {
                    fontSize: "12px",
                    color: "var(--agent-color-text-muted, #6b6b80)"
                  },
                  children: [
                    snapshot.turns.length,
                    " turn",
                    snapshot.turns.length !== 1 ? "s" : "",
                    snapshot.durationMs !== void 0 && ` \xB7 ${snapshot.durationMs}ms`
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsx8(
          "div",
          {
            "data-agent": "tab-bar",
            style: unstyled ? {} : {
              display: "flex",
              borderBottom: "1px solid var(--agent-color-border, #2a2a40)"
            },
            children: tabs.map((tab) => /* @__PURE__ */ jsx8(
              "button",
              {
                onClick: () => setActiveTab(tab.id),
                style: unstyled ? {} : {
                  flex: 1,
                  padding: "10px 16px",
                  background: "transparent",
                  border: "none",
                  borderBottom: activeTab === tab.id ? "2px solid var(--agent-color-primary, #7c6cf0)" : "2px solid transparent",
                  color: activeTab === tab.id ? "var(--agent-color-text-primary, #e8e8e8)" : "var(--agent-color-text-muted, #6b6b80)",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  fontSize: "inherit",
                  fontWeight: activeTab === tab.id ? 600 : 400
                },
                children: tab.label
              },
              tab.id
            ))
          }
        ),
        /* @__PURE__ */ jsxs7(
          "div",
          {
            "data-agent": "tab-content",
            style: unstyled ? {} : { padding: "16px", flex: 1, overflow: "auto" },
            children: [
              activeTab === "conversation" && /* @__PURE__ */ jsx8(ConversationView, { turns: snapshot.turns, size, unstyled }),
              activeTab === "metrics" && /* @__PURE__ */ jsxs7("div", { style: { display: "flex", flexDirection: "column", gap: "20px" }, children: [
                /* @__PURE__ */ jsx8(Section, { title: "Token Usage", unstyled, children: /* @__PURE__ */ jsx8(TokenChart, { tokens: snapshot.tokens, size, unstyled }) }),
                /* @__PURE__ */ jsx8(Section, { title: "Cost", unstyled, children: /* @__PURE__ */ jsx8(CostPanel, { cost: snapshot.cost, size, unstyled }) }),
                /* @__PURE__ */ jsx8(Section, { title: "Tool Usage", unstyled, children: /* @__PURE__ */ jsx8(ToolUsagePanel, { toolUsage: snapshot.toolUsage, size, unstyled }) })
              ] }),
              activeTab === "quality" && /* @__PURE__ */ jsxs7("div", { style: { display: "flex", flexDirection: "column", gap: "20px" }, children: [
                snapshot.quality && /* @__PURE__ */ jsx8(Section, { title: "Quality Scores", unstyled, children: /* @__PURE__ */ jsx8(QualityPanel, { quality: snapshot.quality, size, unstyled }) }),
                snapshot.guardrails && /* @__PURE__ */ jsx8(Section, { title: "Guardrails", unstyled, children: /* @__PURE__ */ jsx8(GuardrailPanel, { guardrails: snapshot.guardrails, size, unstyled }) })
              ] })
            ]
          }
        ),
        snapshot.result && /* @__PURE__ */ jsxs7(
          "div",
          {
            "data-agent": "result-footer",
            style: unstyled ? {} : {
              padding: "12px 16px",
              borderTop: "1px solid var(--agent-color-border, #2a2a40)",
              background: "var(--agent-color-bg-secondary, #16213e)"
            },
            children: [
              /* @__PURE__ */ jsx8(
                "div",
                {
                  style: {
                    fontSize: "10px",
                    textTransform: "uppercase",
                    color: "var(--agent-color-text-muted, #6b6b80)",
                    marginBottom: "4px"
                  },
                  children: "Result"
                }
              ),
              /* @__PURE__ */ jsx8("div", { style: { whiteSpace: "pre-wrap" }, children: snapshot.result })
            ]
          }
        )
      ]
    }
  );
}
function Section({
  title,
  children,
  unstyled
}) {
  return /* @__PURE__ */ jsxs7("div", { children: [
    /* @__PURE__ */ jsx8(
      "div",
      {
        style: unstyled ? {} : {
          fontSize: "11px",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.5px",
          color: "var(--agent-color-text-muted, #6b6b80)",
          marginBottom: "8px"
        },
        children: title
      }
    ),
    children
  ] });
}

// src/components/TagTimeline.tsx
import React4 from "react";
import { jsx as jsx9, jsxs as jsxs8 } from "react/jsx-runtime";
var TAG_ICONS = {
  init: "\u2699",
  // ⚙ gear
  llm: "\u{1F916}",
  // 🤖 robot
  tools: "\u{1F527}",
  // 🔧 wrench
  instructions: "\u{1F4CB}",
  // 📋 clipboard
  done: "\u2714"
  // ✔ check
};
function getIcon(tagId) {
  for (const [prefix, icon] of Object.entries(TAG_ICONS)) {
    if (tagId.startsWith(prefix)) return icon;
  }
  return "\u25CF";
}
function TagTimeline({
  tags,
  selectedTagId,
  onSelectTag,
  size = "default",
  unstyled,
  className,
  style
}) {
  const fontSize = size === "compact" ? "11px" : size === "detailed" ? "14px" : "12px";
  if (tags.length === 0) return null;
  return /* @__PURE__ */ jsxs8(
    "div",
    {
      "data-agent": "tag-timeline",
      className,
      style: {
        ...unstyled ? {} : { fontFamily: "var(--agent-font-sans, sans-serif)", fontSize },
        ...style
      },
      children: [
        /* @__PURE__ */ jsx9(
          "div",
          {
            style: unstyled ? {} : {
              display: "flex",
              alignItems: "center",
              gap: "2px",
              padding: "8px 12px",
              overflowX: "auto",
              borderBottom: "1px solid var(--agent-color-border, #2a2a40)",
              background: "var(--agent-color-bg-secondary, #16213e)"
            },
            children: tags.map((tag, i) => {
              const isSelected = tag.id === selectedTagId;
              return /* @__PURE__ */ jsxs8(React4.Fragment, { children: [
                i > 0 && /* @__PURE__ */ jsx9("div", { style: unstyled ? {} : {
                  width: "20px",
                  height: "2px",
                  background: "var(--agent-color-border, #2a2a40)",
                  flexShrink: 0
                } }),
                /* @__PURE__ */ jsxs8(
                  "button",
                  {
                    onClick: () => onSelectTag?.(tag.id),
                    title: `${tag.label} (${tag.entries.length} events, ${tag.timestamp}ms)`,
                    style: unstyled ? {} : {
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      padding: "6px 10px",
                      border: isSelected ? "1px solid var(--agent-color-primary, #7c6cf0)" : "1px solid var(--agent-color-border, #2a2a40)",
                      borderRadius: "16px",
                      background: isSelected ? "var(--agent-color-primary, #7c6cf0)20" : "transparent",
                      color: isSelected ? "var(--agent-color-primary, #7c6cf0)" : "var(--agent-color-text-muted, #6b6b80)",
                      cursor: "pointer",
                      fontFamily: "inherit",
                      fontSize: "inherit",
                      fontWeight: isSelected ? 600 : 400,
                      whiteSpace: "nowrap",
                      flexShrink: 0,
                      transition: "all 0.15s"
                    },
                    children: [
                      /* @__PURE__ */ jsx9("span", { children: getIcon(tag.id) }),
                      /* @__PURE__ */ jsx9("span", { children: tag.label })
                    ]
                  }
                )
              ] }, tag.id);
            })
          }
        ),
        selectedTagId && /* @__PURE__ */ jsx9(
          TagDetail,
          {
            tag: tags.find((t) => t.id === selectedTagId),
            unstyled
          }
        )
      ]
    }
  );
}
function TagDetail({ tag, unstyled }) {
  if (!tag) return null;
  return /* @__PURE__ */ jsxs8(
    "div",
    {
      "data-agent": "tag-detail",
      style: unstyled ? {} : {
        padding: "12px 16px",
        borderBottom: "1px solid var(--agent-color-border, #2a2a40)"
      },
      children: [
        /* @__PURE__ */ jsxs8("div", { style: unstyled ? {} : {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "8px"
        }, children: [
          /* @__PURE__ */ jsx9("span", { style: { fontWeight: 700 }, children: tag.label }),
          /* @__PURE__ */ jsxs8("span", { style: unstyled ? {} : {
            fontSize: "11px",
            color: "var(--agent-color-text-muted, #6b6b80)",
            fontFamily: "var(--agent-font-mono, monospace)"
          }, children: [
            tag.timestamp,
            "ms \xB7 ",
            tag.entries.length,
            " event",
            tag.entries.length !== 1 ? "s" : ""
          ] })
        ] }),
        /* @__PURE__ */ jsx9("div", { style: unstyled ? {} : {
          display: "flex",
          flexDirection: "column",
          gap: "4px"
        }, children: tag.entries.map((entry, i) => /* @__PURE__ */ jsxs8(
          "div",
          {
            style: unstyled ? {} : {
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "4px 8px",
              borderRadius: "4px",
              background: "var(--agent-color-bg-primary, #1a1a2e)",
              fontSize: "11px"
            },
            children: [
              /* @__PURE__ */ jsx9("span", { style: unstyled ? {} : {
                width: "60px",
                flexShrink: 0,
                color: getEntryColor(entry.type),
                fontWeight: 600,
                textTransform: "uppercase",
                fontSize: "9px",
                letterSpacing: "0.5px"
              }, children: entry.type }),
              /* @__PURE__ */ jsx9("span", { style: unstyled ? {} : {
                color: "var(--agent-color-text-primary, #e8e8e8)",
                fontFamily: "var(--agent-font-mono, monospace)"
              }, children: entry.stageName }),
              entry.chosen && /* @__PURE__ */ jsxs8("span", { style: unstyled ? {} : {
                padding: "1px 6px",
                borderRadius: "3px",
                background: "var(--agent-color-primary, #7c6cf0)30",
                color: "var(--agent-color-primary, #7c6cf0)",
                fontSize: "10px"
              }, children: [
                "\u2192 ",
                entry.chosen
              ] }),
              entry.description && /* @__PURE__ */ jsx9("span", { style: unstyled ? {} : {
                color: "var(--agent-color-text-muted, #6b6b80)",
                fontSize: "10px"
              }, children: entry.description })
            ]
          },
          i
        )) })
      ]
    }
  );
}
function getEntryColor(type) {
  switch (type) {
    case "stage":
      return "var(--agent-color-primary, #7c6cf0)";
    case "decision":
      return "#f59e0b";
    case "subflow-entry":
      return "#8b5cf6";
    case "subflow-exit":
      return "#8b5cf6";
    case "loop":
      return "#10b981";
    case "break":
      return "#ef4444";
    case "error":
      return "#ef4444";
    case "pause":
      return "#f59e0b";
    default:
      return "var(--agent-color-text-muted, #6b6b80)";
  }
}

// src/components/TagFlowchart.tsx
import React5 from "react";
import { jsx as jsx10, jsxs as jsxs9 } from "react/jsx-runtime";
var TAG_COLORS = {
  init: { bg: "#1e3a5f", border: "#3b82f6", icon: "\u2699" },
  llm: { bg: "#2d1b69", border: "#7c6cf0", icon: "\u{1F916}" },
  tools: { bg: "#1b4332", border: "#10b981", icon: "\u{1F527}" },
  instructions: { bg: "#4a1d6b", border: "#a855f7", icon: "\u{1F4CB}" },
  done: { bg: "#1a3c2a", border: "#22c55e", icon: "\u2714" }
};
function getColors(tagId) {
  for (const [prefix, colors] of Object.entries(TAG_COLORS)) {
    if (tagId.startsWith(prefix)) return colors;
  }
  return { bg: "#1a1a2e", border: "#4a4a60", icon: "\u25CF" };
}
function TagFlowchart({
  tags,
  selectedIndex,
  onSelectIndex,
  unstyled,
  className,
  style
}) {
  if (tags.length === 0) return null;
  return /* @__PURE__ */ jsxs9(
    "div",
    {
      "data-agent": "tag-flowchart",
      className,
      style: {
        ...unstyled ? {} : {
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          padding: "16px"
        },
        ...style
      },
      children: [
        /* @__PURE__ */ jsx10("div", { style: unstyled ? {} : {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0",
          overflowX: "auto",
          padding: "8px 0"
        }, children: tags.map((tag, i) => {
          const isSelected = i === selectedIndex;
          const isPast = i < selectedIndex;
          const colors = getColors(tag.id);
          return /* @__PURE__ */ jsxs9(React5.Fragment, { children: [
            /* @__PURE__ */ jsxs9(
              "button",
              {
                onClick: () => onSelectIndex(i),
                style: unstyled ? {} : {
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "4px",
                  padding: "10px 14px",
                  borderRadius: "10px",
                  border: `2px solid ${isSelected ? colors.border : isPast ? colors.border + "60" : "#2a2a40"}`,
                  background: isSelected ? colors.bg : "transparent",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  opacity: isPast ? 0.7 : isSelected ? 1 : 0.4,
                  minWidth: "70px",
                  flexShrink: 0
                },
                children: [
                  /* @__PURE__ */ jsx10("span", { style: { fontSize: "18px" }, children: colors.icon }),
                  /* @__PURE__ */ jsx10("span", { style: unstyled ? {} : {
                    fontSize: "10px",
                    fontWeight: isSelected ? 700 : 500,
                    color: isSelected ? "#fff" : "#888",
                    whiteSpace: "nowrap",
                    fontFamily: "var(--agent-font-sans, sans-serif)"
                  }, children: tag.label }),
                  /* @__PURE__ */ jsxs9("span", { style: unstyled ? {} : {
                    fontSize: "9px",
                    color: "#555",
                    fontFamily: "var(--agent-font-mono, monospace)"
                  }, children: [
                    tag.entries.length,
                    " events"
                  ] })
                ]
              }
            ),
            i < tags.length - 1 && /* @__PURE__ */ jsx10("div", { style: unstyled ? {} : {
              width: "30px",
              height: "2px",
              background: isPast ? colors.border + "60" : "#2a2a40",
              position: "relative",
              flexShrink: 0
            }, children: /* @__PURE__ */ jsx10("div", { style: {
              position: "absolute",
              right: "-3px",
              top: "-3px",
              width: "0",
              height: "0",
              borderTop: "4px solid transparent",
              borderBottom: "4px solid transparent",
              borderLeft: `6px solid ${isPast ? colors.border + "60" : "#2a2a40"}`
            } }) })
          ] }, tag.id);
        }) }),
        /* @__PURE__ */ jsxs9("div", { style: unstyled ? {} : {
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "0 12px"
        }, children: [
          /* @__PURE__ */ jsx10(
            "button",
            {
              onClick: () => onSelectIndex(Math.max(0, selectedIndex - 1)),
              disabled: selectedIndex === 0,
              style: unstyled ? {} : {
                background: "transparent",
                border: "none",
                color: selectedIndex === 0 ? "#333" : "#7c6cf0",
                cursor: selectedIndex === 0 ? "default" : "pointer",
                fontSize: "16px",
                fontWeight: 700,
                padding: "4px 8px"
              },
              children: "\u2190"
            }
          ),
          /* @__PURE__ */ jsx10(
            "input",
            {
              type: "range",
              min: 0,
              max: tags.length - 1,
              value: selectedIndex,
              onChange: (e) => onSelectIndex(Number(e.target.value)),
              style: unstyled ? {} : {
                flex: 1,
                accentColor: "#7c6cf0"
              }
            }
          ),
          /* @__PURE__ */ jsx10(
            "button",
            {
              onClick: () => onSelectIndex(Math.min(tags.length - 1, selectedIndex + 1)),
              disabled: selectedIndex >= tags.length - 1,
              style: unstyled ? {} : {
                background: "transparent",
                border: "none",
                color: selectedIndex >= tags.length - 1 ? "#333" : "#7c6cf0",
                cursor: selectedIndex >= tags.length - 1 ? "default" : "pointer",
                fontSize: "16px",
                fontWeight: 700,
                padding: "4px 8px"
              },
              children: "\u2192"
            }
          ),
          /* @__PURE__ */ jsxs9("span", { style: unstyled ? {} : {
            fontSize: "11px",
            color: "#888",
            fontFamily: "var(--agent-font-mono, monospace)",
            whiteSpace: "nowrap"
          }, children: [
            selectedIndex + 1,
            "/",
            tags.length
          ] })
        ] })
      ]
    }
  );
}

// src/adapters/agentfootprintAdapter.ts
function toAgentSnapshot(input) {
  const { result, recorders } = input;
  const turns = buildTurns(result.messages);
  const tokenStats = recorders?.tokens?.getStats();
  const tokens = {
    totalInput: tokenStats?.totalInputTokens ?? 0,
    totalOutput: tokenStats?.totalOutputTokens ?? 0,
    totalTokens: (tokenStats?.totalInputTokens ?? 0) + (tokenStats?.totalOutputTokens ?? 0),
    perTurn: tokenStats?.calls?.map((c, i) => ({
      turn: c.turnNumber ?? i + 1,
      input: c.inputTokens,
      output: c.outputTokens
    }))
  };
  const cost = {
    totalCost: recorders?.cost?.getTotalCost() ?? 0,
    currency: "USD",
    perTurn: recorders?.cost?.getEntries?.()?.map((e, i) => ({
      turn: e.turnNumber ?? i + 1,
      cost: e.totalCost
    }))
  };
  const toolStats = recorders?.toolUsage?.getStats();
  const toolUsage = {
    totalCalls: toolStats?.totalCalls ?? 0,
    uniqueTools: toolStats ? Object.keys(toolStats.byTool).length : 0,
    perTool: toolStats ? Object.entries(toolStats.byTool).map(([name, stats]) => ({
      name,
      calls: stats.calls,
      avgDurationMs: stats.averageLatencyMs,
      errors: stats.errors
    })) : []
  };
  let quality;
  if (recorders?.quality) {
    const scores = recorders.quality.getScores();
    quality = {
      scores: scores.map((s) => ({
        dimension: s.label ?? "overall",
        score: s.score,
        maxScore: 1
      })),
      overallScore: recorders.quality.getAverageScore(),
      maxOverallScore: 1
    };
  }
  let guardrails;
  if (recorders?.guardrails) {
    const violations = recorders.guardrails.getViolations();
    guardrails = {
      violations: violations.map((v) => ({
        rule: v.rule,
        severity: v.severity,
        message: v.message,
        turnNumber: v.turnNumber
      })),
      checks: violations.length + (recorders.guardrails.hasViolations() ? 0 : 1),
      passed: recorders.guardrails.hasViolations() ? 0 : 1,
      failed: violations.length
    };
  }
  return {
    concept: input.concept ?? "Agent",
    agentId: input.agentName ?? "agent",
    agentName: input.agentName ?? "Agent",
    turns,
    tokens,
    cost,
    toolUsage,
    quality,
    guardrails,
    result: result.content,
    durationMs: input.durationMs
  };
}
function buildTurns(messages) {
  const turns = [];
  let currentTurn = { turnNumber: 1, messages: [], toolCalls: [], tokens: { input: 0, output: 0 } };
  for (const msg of messages) {
    const messageSnap = {
      role: msg.role,
      content: typeof msg.content === "string" ? msg.content : JSON.stringify(msg.content),
      toolCallId: msg.toolCallId
    };
    currentTurn.messages.push(messageSnap);
    if (msg.role === "tool" && msg.toolCallId) {
      currentTurn.toolCalls.push({
        id: msg.toolCallId,
        name: msg.toolCallId,
        // Will be overridden if we have richer data
        arguments: {},
        result: typeof msg.content === "string" ? msg.content : JSON.stringify(msg.content)
      });
    }
    if (msg.role === "assistant" && !messages[messages.indexOf(msg) + 1]?.toolCallId) {
      const nextMsg = messages[messages.indexOf(msg) + 1];
      if (!nextMsg || nextMsg.role === "user") {
        turns.push(currentTurn);
        currentTurn = {
          turnNumber: turns.length + 1,
          messages: [],
          toolCalls: [],
          tokens: { input: 0, output: 0 }
        };
      }
    }
  }
  if (currentTurn.messages.length > 0) {
    turns.push(currentTurn);
  }
  return turns;
}

// src/adapters/filterSpecByTags.ts
function tagsToSpec(tags) {
  if (tags.length === 0) return null;
  let root = null;
  let current = null;
  for (const tag of tags) {
    const node = {
      name: tag.label,
      id: tag.id,
      type: "stage",
      description: `${tag.entries.length} events`
    };
    if (!root) {
      root = node;
    } else if (current) {
      current.next = node;
    }
    current = node;
  }
  return root;
}
export {
  AgentExplainableShell,
  AgentTheme,
  ConversationView,
  CostPanel,
  GuardrailPanel,
  QualityPanel,
  TagFlowchart,
  TagTimeline,
  TokenChart,
  ToolUsagePanel,
  coolDark,
  coolLight,
  defaultTokens,
  tagsToSpec,
  themePresets,
  toAgentSnapshot,
  tokensToCSSVars,
  useAgentTheme,
  warmDark
};
//# sourceMappingURL=index.js.map