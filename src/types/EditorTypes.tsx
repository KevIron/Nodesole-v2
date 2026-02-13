import type Vec2 from "../utils/Vec2";

// NODE TYPES

type NodeDataBase = {
  pos: Vec2
};

export type NodeDataTypesMap = {
  "ENTRY_NODE": NodeDataBase,
  "END_NODE": NodeDataBase
}

export type NodeTypes = keyof NodeDataTypesMap;

export type NodeData<T extends NodeTypes> = {
  id: string,
  type: T,
  data:  NodeDataTypesMap[T]
}

export type NodeProps<T extends NodeTypes> = {
  data: NodeData<T>
}

// CONNECTION TYPES

type Connector = {
  name: string,
  nodeId: string,
  pos: Vec2
}

export type ConnectionData = {
  id: string
  isVisible: boolean
  inputConnector: Connector,
  outputConnector: Connector
}