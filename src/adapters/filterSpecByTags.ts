/**
 * Filter a flowchart spec to only show tagged nodes.
 *
 * Takes the full engine spec and a list of tags. Returns a simplified spec
 * where only tag-level nodes appear. Non-tagged stages are collapsed —
 * arrows skip from one tagged node to the next.
 */

import type { TagData } from '../components/TagTimeline';

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
export function tagsToSpec(tags: TagData[]): SpecNode | null {
  if (tags.length === 0) return null;

  // Build a linear chain of tag nodes
  let root: SpecNode | null = null;
  let current: SpecNode | null = null;

  for (const tag of tags) {
    const node: SpecNode = {
      name: tag.label,
      id: tag.id,
      type: 'stage',
      description: `${tag.entries.length} events`,
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
