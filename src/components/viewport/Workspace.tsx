import { useEditorStore } from "../../store/editorStore";
import type { ViewportParams } from "../../contexts/ViewportContext";
import NodesContainer from "./NodesContainer";

function createViewportTransform(params: ViewportParams) {
  const translate = `translate3d(${params.offset.x}px, ${params.offset.y}px, 0px)`;
  const scale = `scale(${params.scaleFactor})`;

  return `${translate} ${scale}`;
}

export default function Workspace() {
  const viewportParams = useEditorStore((state) => state.viewportParams)

  const workspaceStyle = {
    transform: createViewportTransform(viewportParams)
  } as React.CSSProperties

  return (
    <div className="viewport-workspace" style={workspaceStyle}>
      <NodesContainer />
    </div>
  )
}