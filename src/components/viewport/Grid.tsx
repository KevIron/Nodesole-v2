import { useEffect, useRef } from "react";
import { drawGrid, type GridOptions } from "../../utils/Grid";
import { getElementDimensions, type Dimensions } from "../../utils/Elements";
import { useAnimationTask } from "../../hooks/useAnimationTask";

import useViewportContext from "../../hooks/useViewportContext";
import useViewportDrag from "../../hooks/useViewportDrag";
import useZoom from "../../hooks/useZoom";

type ViewportGridProps = React.ComponentPropsWithRef<"div"> & {
  gridOptions: GridOptions,
}

export default function Grid({ gridOptions, ...props }: ViewportGridProps) {
  const { handlers: dragHandlers } = useViewportDrag();
  const { onWheel } = useZoom({ minZoom: 0.5, maxZoom: 3.75, zoomSpeed: 0.003 });

  const dimensionsRef = useRef<Dimensions>({ width: 0, height: 0 });

  const canvasContainerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const { getViewportParams } = useViewportContext();

  function redrawGrid() {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d")!;

    const viewportParams = getViewportParams();
    const gridDimensions = dimensionsRef.current;

    canvasRef.current.width = dimensionsRef.current.width;
    canvasRef.current.height = dimensionsRef.current.height;

    drawGrid(context, gridDimensions, viewportParams, gridOptions);
  }

  useEffect(() => {
    function handleResize() {
      if (!canvasContainerRef.current || !canvasRef.current) return;
      dimensionsRef.current = getElementDimensions(canvasContainerRef.current); 
    } 

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  useAnimationTask(redrawGrid);

  return (
    <div 
      ref={canvasContainerRef} 
      className="grid-container"
      onWheel={onWheel}
      {...dragHandlers}
      {...props}
    >
      <canvas 
        ref={canvasRef}
      />
    </div>
  );
}