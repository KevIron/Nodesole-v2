import { useEditorStore } from "../../store/editorStore";
import createNodeComponent from "../../utils/NodeFactory";

import type { ViewportParams } from "../../contexts/ViewportContext";

function createViewportTransform(params: ViewportParams) {
  const translate = `translate3d(${params.offset.x}px, ${params.offset.y}px, 0px)`;
  const scale = `scale(${params.scaleFactor})`;

  return `${translate} ${scale}`;
}

export default function Workspace() {
  const viewportParams = useEditorStore((state) => state.viewportParams)
  const nodes = useEditorStore((state) => state.nodes);

  const workspaceStyle = {
    transform: createViewportTransform(viewportParams)
  } as React.CSSProperties

  return (
    <div className="viewport-workspace" style={workspaceStyle}>
      {Object.values(nodes).map(node => createNodeComponent(node))}
    </div>
  )
}