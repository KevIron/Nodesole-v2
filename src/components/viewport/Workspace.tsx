import { useRef } from "react";
import type { ViewportParams } from "../../contexts/ViewportContext";
import EntryNode from "../nodes/EntryNode";
import useViewportContext from "../../hooks/useViewportContext";
import { useAnimationTask } from "../../hooks/useAnimationTask";

function createViewportTransform(params: ViewportParams) {
  const translate = `translate(${params.offset.x}px, ${params.offset.y}px)`;
  const scale = `scale(${params.scaleFactor})`;

  return `${translate} ${scale}`;
}


export default function Workspace() {
  const workspaceRef = useRef<HTMLDivElement | null>(null);
  const { getViewportParams } = useViewportContext();

  function updateViewportTransform() {
    if (!workspaceRef.current) return;

    const viewportParams = getViewportParams();
    const viewportTransform = createViewportTransform(viewportParams);
    
    workspaceRef.current.style.transform = viewportTransform;
  }
  
  useAnimationTask(updateViewportTransform);

  return (
    <div className="viewport-workspace" ref={workspaceRef}>
      <div className="nodes-container">
        <EntryNode />
      </div>
      <div className="connections-container"></div>
    </div>
  )
}