import { create } from "zustand";
import Vec2 from "../utils/Vec2";

import type { ConnectionData, NodeData, NodeTypes } from "../types/EditorTypes";
import type { ViewportParams } from "../contexts/ViewportContext";

type EditorStateUpdater<T, K = T> = (prev: T) => K;

export const useEditorStore = create<{
  viewportParams: ViewportParams,

  graph: Record<string, Array<{ nodeId: string, connId: string }>>
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

  graph: {},
  nodes: {},
  connections: {},

  addNode<T extends NodeTypes>(node: NodeData<T>) {
    set(prev => ({
      graph: {
        ...prev.graph,
        [node.id]: []
      },
      nodes: {
        ...prev.nodes,
        [node.id]: node
      }
    }));
  }, 

  removeNode(nodeId: string) {
    set(prev => {
      const { [nodeId]: _, ...nodes } = prev.nodes;
      const { [nodeId]: __, ...graph } = prev.graph;

      return { nodes, graph };
    });
  },

  updateViewportParams(callback: (prevParams: ViewportParams) => ViewportParams) {
    set(prev => ({
      viewportParams: callback(prev.viewportParams)
    }));
  },

  updateNodePosition(nodeId: string, callback: (prevParams: ViewportParams) => Vec2) {
    set(prev => {
      const oldNodePos = prev.nodes[nodeId].data.pos;
      const newNodePos = callback(prev.viewportParams);
      const delta = newNodePos.subtract(oldNodePos);

      const nodeConnections = prev.graph[nodeId].map(el => el.connId);
      const connections = { ...prev.connections };

      nodeConnections.forEach((connId) => {
        connections[connId] = {
          ...connections[connId],
          inputConnector: {
            ...connections[connId].inputConnector,
            pos: connections[connId].inputConnector.pos.add(delta)
          },
          outputConnector: {
            ...connections[connId].outputConnector,
            pos: connections[connId].outputConnector.pos.add(delta)
          }
        }
      });

      const nodes = {
        ...prev.nodes,
        [nodeId]: {
          ...prev.nodes[nodeId],
          data: {
            ...prev.nodes[nodeId].data,
            pos: newNodePos
          }
        }
      }

      return { connections, nodes }
    });
  },

  addConnection(data: ConnectionData) {
    set(prev => {
      const connections = {
        ...prev.connections,
        [data.id]: data
      }

      const graph = {
        ...prev.graph
      }

      if (data.inputConnector.nodeId !== null)
      //if (da[1]) graph[nodeIds[1]] = graph[nodeIds[1]].filter(el => el.connId !== connId);

       

      return { connections, graph }      
    });
  },

  removeConnection(connId: string) {
    set(prev => {
      const { [connId]: removedConnection, ...connections } = prev.connections;
      const nodeIds = [removedConnection.inputConnector.nodeId, removedConnection.outputConnector.nodeId];

      const graph = { ...prev.graph };

      if (nodeIds[0]) graph[nodeIds[0]] = graph[nodeIds[0]].filter(el => el.connId !== connId);
      if (nodeIds[1]) graph[nodeIds[1]] = graph[nodeIds[1]].filter(el => el.connId !== connId);

      return { connections, graph }
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