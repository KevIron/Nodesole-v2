import { create } from "zustand";
import Vec2 from "../utils/Vec2";

import type { ConnectionData, NodeData, NodeTypes } from "../types/EditorTypes";
import type { ViewportParams } from "../contexts/ViewportContext";

type EditorStateUpdater<T, K = T> = (prev: T) => K;

type NodeId = string;
type ConnectionId = string;

export const useEditorStore = create<{
  viewportParams: ViewportParams,

  graph: Record<NodeId, { 
    inputs: Array<ConnectionId>, 
    outputs: Array<ConnectionId> 
  }>,
  nodes: Record<string, NodeData<NodeTypes>>,
  connections: Record<string, ConnectionData>,

  addConnection: (data: ConnectionData) => void,
  removeConnection: (connId: ConnectionId) => void,
  updateConnection: (connId: ConnectionId, updater: EditorStateUpdater<ConnectionData>) => void,

  addNode: <T extends NodeTypes>(node: NodeData<T>) => void,
  removeNode: (nodeId: NodeId) => void,
  updateNodePosition: (nodeId: NodeId, updater: EditorStateUpdater<ViewportParams, Vec2>) => void

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

    set(prev => {
      if (Object.hasOwn(prev.nodes, node.id)) throw new Error("Node id's must be unique!");

      return {
        graph: {
          ...prev.graph,
          [node.id]: {
            inputs: [],
            outputs: []
          }
        },
        nodes: {
          ...prev.nodes,
          [node.id]: node
        }
      }
    });
  }, 

  removeNode(nodeId: NodeId) {
    set(prev => {
      const nodes = { ...prev.nodes };
      const graph = { ...prev.graph };
      const connections = { ...prev.connections };

      const deletedNodeConnections = graph[nodeId];

      for (const connectionId of deletedNodeConnections.inputs) {
        const deletedConnection = connections[connectionId];
        const sourceNodeId = deletedConnection.sourceConnector.nodeId;

        if (sourceNodeId) {
          graph[sourceNodeId] = {
            ...graph[sourceNodeId],
            outputs: graph[sourceNodeId].outputs.filter(id => id !== connectionId)
          }
        }

        delete connections[connectionId];
      }

      for (const connectionId of deletedNodeConnections.outputs) {
        const deletedConnection = connections[connectionId];
        const targetNodeId = deletedConnection.targetConnector.nodeId;

        if (targetNodeId) {
          graph[targetNodeId] = {
            ...graph[targetNodeId],
            inputs: graph[targetNodeId].inputs.filter(id => id !== connectionId)
          }
        }


        delete connections[connectionId];
      }

      delete graph[nodeId];
      delete nodes[nodeId];

      return { nodes, graph }
    });
  },

  updateNodePosition(nodeId: NodeId, callback: (prevParams: ViewportParams) => Vec2) {
    set(prev => {
      const oldNodePos = prev.nodes[nodeId].data.pos;
      const newNodePos = callback(prev.viewportParams);

      const delta = newNodePos.subtract(oldNodePos);

      const connections = { ...prev.connections };
      const nodeConnections = prev.graph[nodeId];

      for (const connectionId of nodeConnections.inputs) {
        connections[connectionId] = {
          ...connections[connectionId],
          targetConnector: {
            ...connections[connectionId].targetConnector,
            pos: connections[connectionId].targetConnector.pos.add(delta)
          }
        }
      }

      for (const connectionId of nodeConnections.outputs) {
        connections[connectionId] = {
          ...connections[connectionId],
          sourceConnector: {
            ...connections[connectionId].sourceConnector,
            pos: connections[connectionId].sourceConnector.pos.add(delta)
          }
        }
      }

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
      const connectionId = data.id;

      const sourceNodeId = data.sourceConnector.nodeId;
      const targeNodeId = data.targetConnector.nodeId;

      const mutatedGraph = { ...prev.graph };

      if (sourceNodeId) {
        mutatedGraph[sourceNodeId] = {
          ...mutatedGraph[sourceNodeId],
          outputs: [ ...mutatedGraph[sourceNodeId].outputs, connectionId ],
        }
      }

      if (targeNodeId) {
        mutatedGraph[targeNodeId] = {
          ...mutatedGraph[targeNodeId],
          inputs: [ ...mutatedGraph[targeNodeId].inputs, connectionId ],
        }
      }

      return {
        graph: mutatedGraph,
        connections: {
          ...prev.connections,
          [connectionId]: data
        }
      }
    });
  },

  removeConnection(connId: ConnectionId) {
    set(prev => {
      const { [connId]: removedConnection , ...connections }  = { ...prev.connections };

      const graph = { ...prev.graph };

      const sourceNodeId = removedConnection.sourceConnector.nodeId;
      const targetNodeId = removedConnection.targetConnector.nodeId;
      
      if (sourceNodeId) {
        graph[sourceNodeId] = {
          ...graph[sourceNodeId],
          outputs: graph[sourceNodeId].outputs.filter(conn => conn !== connId)
        }
      }

      if (targetNodeId) {
        graph[targetNodeId] = {
          ...graph[targetNodeId],
          inputs: graph[targetNodeId].inputs.filter(conn => conn !== connId)
        }
      }
      
      return { connections, graph }
    });
  },

  updateConnection(connId: ConnectionId, updater: EditorStateUpdater<ConnectionData>) {
    set(prev => {
      const oldConnectionData = prev.connections[connId];
      const newConnectionData = updater(oldConnectionData);

      if (newConnectionData.id !== connId) throw new Error("Connection id cannot be changed!");

      const [oldSourceNodeId, newSourceNodeId] = [ oldConnectionData.sourceConnector.nodeId, newConnectionData.sourceConnector.nodeId ];
      const [oldTargetNodeId, newTargetNodeId] = [ oldConnectionData.targetConnector.nodeId, newConnectionData.targetConnector.nodeId ];

      const modifiedGraph = { ...prev.graph };

      if (oldSourceNodeId !== newSourceNodeId) {
        if (oldSourceNodeId) {
          modifiedGraph[oldSourceNodeId] = {
            ...modifiedGraph[oldSourceNodeId],
            outputs: modifiedGraph[oldSourceNodeId].outputs.filter(id => id !== connId)
          }
        }

        if (newSourceNodeId) {
          modifiedGraph[newSourceNodeId] = {
            ...modifiedGraph[newSourceNodeId],
            outputs: [ ...modifiedGraph[newSourceNodeId].outputs, connId ]
          }
        }
      }

      if (oldTargetNodeId !== newTargetNodeId) {
        if (oldTargetNodeId) {
          modifiedGraph[oldTargetNodeId] = {
            ...modifiedGraph[oldTargetNodeId],
            inputs: modifiedGraph[oldTargetNodeId].inputs.filter(id => id !== connId)
          }
        }

        if (newTargetNodeId) {
          modifiedGraph[newTargetNodeId] = {
            ...modifiedGraph[newTargetNodeId],
            inputs: [ ...modifiedGraph[newTargetNodeId].inputs, connId ]
          }
        }
      }

      return {
        graph: modifiedGraph,
        connections: {
          ...prev.connections,
          [connId]: newConnectionData
        }
      }
    });
  },

  updateViewportParams(callback: (prevParams: ViewportParams) => ViewportParams) {
    set(prev => ({
      viewportParams: callback(prev.viewportParams)
    }));
  }
}));