import EndNode from "../components/nodes/nodeTypes/EndNode";
import EntryNode from "../components/nodes/nodeTypes/EntryNode";

import type { NodeData, NodeProps, NodeTypes } from "../types/EditorTypes";

const NODE_COMPONENT_MAP = {
  ENTRY_NODE: EntryNode,
  END_NODE: EndNode,
} satisfies {
  [K in NodeTypes]: React.ComponentType<NodeProps<K>>;
};

export default function createNodeComponent<T extends NodeTypes>(node: NodeData<T>) {
  const Component = NODE_COMPONENT_MAP[node.type] as React.ComponentType<NodeProps<T>>;
  return <Component data={node} />
}