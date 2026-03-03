import type { connections, Graph, Nodes } from "../store/editorStore";

function findExecutionOrder(graph: Graph, connections: connections, order: Array<string>, visited: Set<string>, cur: string) {
    const { inputs, outputs} = graph[cur];

    visited.add(cur);

    for (const conn of inputs) {
        const data = connections[conn];
        const inputNode = data.sourceConnector.nodeId;

        if (!inputNode) throw new Error("Execution error!");
        if (visited.has(inputNode)) continue;

        findExecutionOrder(graph, connections, order, visited, inputNode);
    }

    for (const conn of outputs) {
        const data = connections[conn];
        const outputNode = data.sourceConnector.nodeId;

        if (!outputNode) throw new Error("Execution error!");
        if (visited.has(outputNode)) continue;

        findExecutionOrder(graph, connections, order, visited, outputNode);
    }
}

function executeGraph(graph: Graph, nodes: Nodes, connections: connections) {
    const entryPoint = Object.values(nodes).find((el) => el.type === "ENTRY_NODE");
    
}