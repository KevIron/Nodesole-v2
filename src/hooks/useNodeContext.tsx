import { useContext } from "react"
import { NodeContext } from "../contexts/NodeContext";

export default function useViewportContext() {
  const nodeContext = useContext(NodeContext);
  if (!nodeContext) throw new Error("Not inside of an node context!");

  return nodeContext;
}