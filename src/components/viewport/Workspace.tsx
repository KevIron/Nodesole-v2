import { useRef } from "react";
import { useAnimationTask } from "../../hooks/useAnimationTask";
import { useEditorStore } from "../../store/editorStore";

import useViewportContext from "../../hooks/useViewportContext";

import type { ViewportParams } from "../../contexts/ViewportContext";
import createNodeComponent from "../../utils/NodeFactory";

function createViewportTransform(params: ViewportParams) {
  const translate = `translate(${params.offset.x}px, ${params.offset.y}px)`;
  const scale = `scale(${params.scaleFactor})`;

  return `${translate} ${scale}`;
}

export default function Workspace() {
  const nodes = useEditorStore((state) => state.nodes);

  const workspaceRef = useRef<HTMLDivElement | null>(null);
  const { getViewportParams } = useViewportContext();

  function updateWorkspaceTransform() {
    if (!workspaceRef.current) return;

    const viewportParams = getViewportParams();
    const viewportTransform = createViewportTransform(viewportParams);
    
    workspaceRef.current.style.transform = viewportTransform;
  }
  
  useAnimationTask(updateWorkspaceTransform);

  return (
    <div className="viewport-workspace" ref={workspaceRef}>
      {nodes.map(node => createNodeComponent(node))}
    </div>
  )
}