import { useEffect, useRef, useState } from "react";
import ViewportGrid from "./ViewportGrid";
import Vec2 from "../utils/Vec2";

export type ViewportParams = {
  offset: Vec2,
  scaleFactor: number
}

function createViewportTransform(params: ViewportParams) {
  const translate = `translate(${params.offset.x}px, ${params.offset.y}px)`;
  const scale = `scale(${params.scaleFactor})`;

  return `${translate} ${scale}`;
}

export default function Viewport() {
  const [viewportParams, setViewportParams] = useState<ViewportParams>({
    offset: new Vec2(0, 0),
    scaleFactor: 1
  });

  const dragStartPos = useRef<Vec2 | null>(null);
  const dragStartOffset = useRef<Vec2 | null>(null);

  const viewportTransform = createViewportTransform(viewportParams);

  useEffect(() => {
    function handleViewportClick(e: MouseEvent) {
      dragStartPos.current = new Vec2(e.clientX, e.clientY);
      dragStartOffset.current = viewportParams.offset;
    }

    function handleViewportRelease() {
      if (!dragStartPos.current || !dragStartOffset.current) return;

      dragStartPos.current = null;
      dragStartOffset.current = null;
    }

    function handleViewportDrag(e: MouseEvent) {
      if (!dragStartPos.current || !dragStartOffset.current) return;

      const currentPos = new Vec2(e.clientX, e.clientY);
      const distance = dragStartOffset.current.add(dragStartPos.current.subtract(currentPos));

      setViewportParams(prev => ({
        ...prev,
        offset: distance
      }));
    }

    document.addEventListener("mousedown", handleViewportClick);
    document.addEventListener("mouseup", handleViewportRelease);
    document.addEventListener("mousemove", handleViewportDrag); 

    return () => { 
      document.removeEventListener("mousedown", handleViewportClick);
      document.removeEventListener("mouseup", handleViewportRelease);
      document.removeEventListener("mousemove", handleViewportDrag); 
    }
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="viewport">
      <div className="viewport-workspace" style={{ transform: viewportTransform }}>
        <div className="nodes-container"></div>
        <div className="connections-container"></div>
      </div>
      <ViewportGrid 
        spacing={16} 
        viewportParams={viewportParams}
        lineColor="#575757ff"
      />
    </div>
  );
}