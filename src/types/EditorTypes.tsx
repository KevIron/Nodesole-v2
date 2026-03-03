import type Vec2 from "../utils/Vec2";

// NODE TYPES

type NodeDataBase = {
  pos: Vec2
};

type ConstantEmitterData = NodeDataBase & {
  type: "string" | "boolean" | "number", 
  value: string
}

type OperatorNodeData = NodeDataBase & {
  operation: "lessThan" | "greaterThan" | "equal"
}

export type NodeDataTypesMap = {
  "ENTRY_NODE": NodeDataBase,
  "END_NODE": NodeDataBase,
  "CONDITION_NODE": NodeDataBase,
  "CONSTANT_EMITTER_NODE": ConstantEmitterData,
  "OPERATOR_NODE": OperatorNodeData
}

export type NodeTypes = keyof NodeDataTypesMap;

export type NodeData<T extends NodeTypes> = {
  id: string,
  type: T,
  data:  NodeDataTypesMap[T]
}

export type NodeProps = {
  id: string
}

// CONNECTION TYPES

type Connector = {
  nodeId: string | null,
  name: string | null,
  direction: "input" | "output" | null,
  type: ConnectionTypes | null
  pos: Vec2
}

export type ConnectionTypes = "data" | "flow" | "variable-flow"; 

export type ConnectionData = {
  id: string,
  type: ConnectionTypes,
  isVisible: boolean,
  sourceConnector: Connector,
  targetConnector: Connector,
}