import { useRef } from "react";
import { useEditorStore } from "../../store/editorStore";

import useDimensionsRef from "../../hooks/useDimensions";
import useViewportContext from "../../hooks/useViewportContext";

import type { ViewportParams } from "../../contexts/ViewportContext";
import Connection from "../nodes/Connection";

function createGroupTransform(params: ViewportParams) {
  const translate = `translate(${params.offset.x}, ${params.offset.y})`;
  const scale = `scale(${params.scaleFactor})`;

  return `${translate} ${scale}`;
}

export default function Connections() {
  const connections = useEditorStore((state) => state.connections);

  const { containerRef, dimensionsRef } = useDimensionsRef<HTMLDivElement>();
  const { getViewportParams } = useViewportContext();

  const svgRef = useRef<SVGSVGElement | null>(null);
  const svgGroupRef = useRef<SVGGElement | null>(null);

  function updateConnectionsTransform() {
    if (!svgRef.current) return;
    if (!svgGroupRef.current) return;

    const width = dimensionsRef.current.width.toString();
    const height = dimensionsRef.current.height.toString();

    const viewportParams = getViewportParams();

    svgRef.current.setAttribute("width", width);
    svgRef.current.setAttribute("height", height);
    svgRef.current.setAttribute("viewbox", `0 0 ${width} ${height}`);

    svgGroupRef.current.setAttribute("transform", createGroupTransform(viewportParams));
  }


  return (
    <div className="connections-container" ref={containerRef}>
      <svg xmlns="http://www.w3.org/2000/svg" ref={svgRef}>
        <g name="connections-group" ref={svgGroupRef}>
          {Object.values(connections).map(conn => (
            <Connection key={conn.id} data={conn} />
          ))}
        </g>
      </svg>
    </div>
  ); 
}