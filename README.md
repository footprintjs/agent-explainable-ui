# agent-explainable-ui

**Beta — APIs may change. Not published on npm; use the source setup below.**

React components for developers displaying recorded agent conversations, token usage, costs and tool activity. Optional quality and guardrail panels display supplied recorder results; they do not evaluate a model themselves.

**Source-only package:** there is currently no npm registry publication. Build this checkout to try the components. React and React DOM 18 or later are the declared peers.

## Build from source

```sh
git clone https://github.com/footprintjs/agent-explainable-ui.git
cd agent-explainable-ui
npm ci --ignore-scripts
npm run build
```

The build writes ESM, CommonJS and declarations to `dist/`. Install a local package artifact into your application to use the package import below.

## Show supplied execution data

```tsx
import {
  AgentTheme, AgentExplainableShell, toAgentSnapshot,
  type AgentfootprintInput,
} from 'agent-explainable-ui';

export function RunPanel({ data }: { data: AgentfootprintInput }) {
  const snapshot = toAgentSnapshot(data);
  return <AgentTheme><AgentExplainableShell snapshot={snapshot} /></AgentTheme>;
}
```

`data` comes from your application: an agent result plus optional recorder outputs. The adapter's [input contract](src/adapters/agentfootprintAdapter.ts) and [snapshot types](src/types/index.ts) define what is consumed. Import the adapter from the root entry; there is no exported `/adapters` subpath.

The [public exports](src/index.ts) also include `ConversationView`, `TokenChart`, `ToolUsagePanel`, `CostPanel`, `QualityPanel`, `GuardrailPanel`, `TagTimeline` and `TagFlowchart`. Themes and `unstyled` props support integration with an application's own presentation.

## Boundaries and related tools

This is a rendering layer, not an agent runtime, recording service or model-safety system. It displays the data supplied to it and does not establish that unrecorded activity did not happen. Applications own collection, privacy, redaction and access control before displaying agent content. The adapter mirrors a particular recorder shape; check the declared input contract when integrating another SDK version.

[AgentFootprint](https://github.com/footprintjs/agentfootprint) runs and records agent workflows. [Lens](https://github.com/footprintjs/agentfootprint-lens) supplies the separate investigation views. This repository is not assumed to be an alias or replacement for those packages.
