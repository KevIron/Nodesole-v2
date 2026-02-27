import { useContext } from "react"
import { ViewportContext } from "../contexts/viewportContext";

export default function useViewportContext() {
  const viewportContext = useContext(ViewportContext);
  if (!viewportContext) throw new Error("Not inside of a viewport context!");

  return viewportContext;
}