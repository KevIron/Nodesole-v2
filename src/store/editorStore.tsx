import { create } from "zustand";
import type { Connection, NodeData, NodeTypes } from "../types/EditorTypes";
import Vec2 from "../utils/Vec2";

export const useEditorStore = create<{
  nodes: Array<NodeData<NodeTypes>>,
  connections: Array<Connection>

  addNode: <T extends NodeTypes>(node: NodeData<T>) => void
  removeNode: (nodeId: string) => void
}>((set) => ({
  nodes: [ {
    id: "",
    type: "ENTRY_NODE",
    data: {
      pos: new Vec2(0, 0)
    }
  } ],
  connections: [],

  addNode<T extends NodeTypes>(node: NodeData<T>) {
    set(prev => ({
      nodes: [ ...prev.nodes, node ]
    }));
  }, 

  removeNode(nodeId: string) {
    set(prev => ({
      nodes: prev.nodes.filter(node => node.id !== nodeId)
    }));
  }
}));