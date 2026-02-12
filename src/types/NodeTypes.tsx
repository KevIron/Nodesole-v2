import type Vec2 from "../utils/Vec2";

type NodeBase = {
  id: string,
  pos: Vec2
};

export type EntryNode = NodeBase & {
  type: "ENTRY_NODE"
};

export type EndNode = NodeBase & {
  type: "END_NODE"
};

export type Node = EntryNode | EndNode
export type NodeTypes = Node["type"];