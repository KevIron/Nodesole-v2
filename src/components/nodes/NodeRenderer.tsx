import EndNode from "./nodeTypes/EndNode";
import EntryNode from "./nodeTypes/EntryNode";
import { memo } from "react";
import { useEditorStore } from "../../store/editorStore";

import type { NodeProps, NodeTypes } from "../../types/EditorTypes";

type NodeRendererProps = {
  id: string
}

const NODE_COMPONENT_MAP = {
  ENTRY_NODE: EntryNode,
  END_NODE: EndNode,
} satisfies {
  [K in NodeTypes]: React.ComponentType<NodeProps>;
};

function NodeRenderer({ id }: NodeRendererProps) {
  const type = useEditorStore((state) => state.nodes[id].type);
  if (!type) throw new Error("Cannot get the node type!");
  
  const Component = NODE_COMPONENT_MAP[type] as React.ComponentType<NodeProps>;
  return <Component id={id} />
}

export default memo(NodeRenderer);