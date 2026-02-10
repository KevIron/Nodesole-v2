import type { ViewportParams } from "../../contexts/viewportContext";
import useViewportContext from "../../hooks/useViewportContext";
import EntryNode from "../nodes/EntryNode";

function createViewportTransform(params: ViewportParams) {
  const translate = `translate(${params.offset.x}px, ${params.offset.y}px)`;
  const scale = `scale(${params.scaleFactor})`;

  return `${translate} ${scale}`;
}

export default function ViewportWorkspace() {
  const { viewportParams } = useViewportContext();
  const viewportTransform = createViewportTransform(viewportParams);

  return (
    <div className="viewport-workspace" style={{ transformOrigin: "top left", transform: viewportTransform }}>
      <div className="nodes-container">
        <EntryNode />
      </div>
      <div className="connections-container"></div>
    </div>
  )
}