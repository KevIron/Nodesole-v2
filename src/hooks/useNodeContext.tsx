import { useContext } from "react"
import { NodeContext } from "../contexts/NodeContext";

export default function useNodeContext() {
  const nodeContext = useContext(NodeContext);
  if (!nodeContext) throw new Error("Not inside of an node context!");

  return nodeContext;
}