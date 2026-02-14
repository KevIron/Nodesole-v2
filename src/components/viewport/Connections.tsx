import { useEditorStore } from "../../store/editorStore";

import useDimensionsRef from "../../hooks/useDimensions";

import type { ViewportParams } from "../../contexts/ViewportContext";
import Connection from "../nodes/Connection";

function createGroupTransform(params: ViewportParams) {
  const translate = `translate(${params.offset.x}, ${params.offset.y})`;
  const scale = `scale(${params.scaleFactor})`;

  return `${translate} ${scale}`;
}

export default function Connections() {
  const connections = useEditorStore((state) => state.connections);
  const viewportParams = useEditorStore((state) => state.viewportParams);

  const { containerRef, dimensions } = useDimensionsRef<HTMLDivElement>();

  return (
    <div className="connections-container" ref={containerRef}>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width={dimensions.width}
        height={dimensions.height}
        viewBox={`0, 0, ${dimensions.width} ${dimensions.height}`}
      >
        <g name="connections-group" style={{ transform: createGroupTransform(viewportParams) }}>
          {Object.values(connections).map(conn => (
            <Connection key={conn.id} data={conn} />
          ))}
        </g>
      </svg>
    </div>
  ); 
}