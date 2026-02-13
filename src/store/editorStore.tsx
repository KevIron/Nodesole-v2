import { create } from "zustand";
import type { ConnectionData, NodeData, NodeTypes } from "../types/EditorTypes";
import type { ViewportParams } from "../contexts/ViewportContext";
import Vec2 from "../utils/Vec2";

export const useEditorStore = create<{
  viewportParams: ViewportParams

  nodes: Record<string, NodeData<NodeTypes>>,
  connections: Record<string, ConnectionData>

  addNode: <T extends NodeTypes>(node: NodeData<T>) => void
  removeNode: (nodeId: string) => void
}>((set) => ({
  viewportParams: {
    offset: new Vec2(0, 0),
    scaleFactor: 0
  },

  nodes: {},
  connections: {},

  addNode<T extends NodeTypes>(node: NodeData<T>) {
    set(prev => ({
      nodes: {
        ...prev.nodes,
        [node.id]: node
      }
    }));
  }, 

  removeNode(nodeId: string) {
    set(prev => {
      const { [nodeId]: _, ...nodes } = prev.nodes;
      return nodes;
    });
  }

  connectNodes() {
    
  }
}));