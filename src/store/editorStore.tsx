import { create } from "zustand";
import type { ConnectionData, NodeData, NodeTypes } from "../types/EditorTypes";
import type { ViewportParams } from "../contexts/ViewportContext";
import Vec2 from "../utils/Vec2";

export const useEditorStore = create<{
  viewportParams: ViewportParams,

  nodes: Record<string, NodeData<NodeTypes>>,
  connections: Record<string, ConnectionData>,

  addNode: <T extends NodeTypes>(node: NodeData<T>) => void,
  removeNode: (nodeId: string) => void,
  updateNodePosition: (nodeId: string, callback: (prevParams: ViewportParams) => Vec2) => void

  updateViewportParams: (callback: (prevParams: ViewportParams) => ViewportParams) => void
}>((set) => ({
  viewportParams: {
    offset: new Vec2(0, 0),
    scaleFactor: 1
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
  },

  connectNodes() {
    
  },

  updateViewportParams(callback: (prevParams: ViewportParams) => ViewportParams) {
    set(prev => ({
      viewportParams: callback(prev.viewportParams)
    }));
  },

  updateNodePosition(nodeId: string, callback: (prevParams: ViewportParams) => Vec2) {
    set(prev => ({
      nodes: {
        ...prev.nodes,
        [nodeId]: {
          ...prev.nodes[nodeId],
          data: {
            ...prev.nodes[nodeId].data,
            pos: callback(prev.viewportParams)
          }
        }
      }
    }));
  }
}));