import { create } from "zustand";
import type { Connection, NodeData, NodeTypes } from "../types/EditorTypes";

export const useEditorStore = create<{
  nodes: Array<NodeData<NodeTypes>>,
  connections: Array<Connection>

  addNode: <T extends NodeTypes>(node: NodeData<T>) => void
  removeNode: (nodeId: string) => void
}>((set) => ({
  nodes: [],
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