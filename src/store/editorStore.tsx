import { create } from "zustand";
import Vec2 from "../utils/Vec2";

import type { ConnectionData, NodeData, NodeTypes } from "../types/EditorTypes";
import type { ViewportParams } from "../contexts/ViewportContext";

type EditorStateUpdater<T, K = T> = (prev: T) => K;

export const useEditorStore = create<{
  viewportParams: ViewportParams,

  nodes: Record<string, NodeData<NodeTypes>>,
  connections: Record<string, ConnectionData>,

  addConnection: (data: ConnectionData) => void,
  removeConnection: (connId: string) => void,
  updateConnection: (connId: string, updater: EditorStateUpdater<ConnectionData>) => void,

  addNode: <T extends NodeTypes>(node: NodeData<T>) => void,
  removeNode: (nodeId: string) => void,
  updateNodePosition: (nodeId: string, updater: EditorStateUpdater<ViewportParams, Vec2>) => void

  updateViewportParams: (updater: EditorStateUpdater<ViewportParams>) => void
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
      return { nodes };
    });
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
  },

  addConnection(data: ConnectionData) {
    set(prev => ({
      connections: {
        ...prev.connections,
        [data.id]: data
      }
    }));
  },

  removeConnection(connId: string) {
    set(prev => {
      const { [connId]: _, ...connections } = prev.connections;
      return { connections }
    });
  },

  updateConnection(connId: string, updater: EditorStateUpdater<ConnectionData>) {
    set(prev => ({
      connections: {
        ...prev.connections,
        [connId]: updater(prev.connections[connId])
      }
    }));
  }
}));