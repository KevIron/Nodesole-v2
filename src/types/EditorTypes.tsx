import type Vec2 from "../utils/Vec2";

// NODE TYPES

type NodeDataBase = {
  pos: Vec2
};

export type NodeDataTypesMap = {
  "ENTRY_NODE": NodeDataBase,
  "END_NODE": NodeDataBase,
  "CONDITION_NODE": NodeDataBase,
  "CONSTANT_EMITTER_NODE": NodeDataBase
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
  pos: Vec2
}

export type ConnectionData = {
  id: string,
  isVisible: boolean,
  sourceConnector: Connector,
  targetConnector: Connector,
}