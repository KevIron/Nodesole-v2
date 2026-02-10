import { useRef } from "react";
import { drawGrid, type GridOptions } from "../../utils/Grid";
import { useAnimationTask } from "../../hooks/useAnimationTask";

import useViewportContext from "../../hooks/useViewportContext";
import useViewportDrag from "../../hooks/useViewportDrag";
import useZoom from "../../hooks/useZoom";
import useContainerDimensions from "../../hooks/useDimensionsRef";

type ViewportGridProps = React.ComponentPropsWithRef<"div"> & {
  gridOptions: GridOptions,
}

export default function Grid({ gridOptions, ...props }: ViewportGridProps) {
  const { getViewportParams } = useViewportContext();
  const { containerRef, dimensionsRef } = useContainerDimensions<HTMLDivElement>();

  const { handlers: dragHandlers } = useViewportDrag();
  const { onWheel } = useZoom({ minZoom: 0.5, maxZoom: 3.75, zoomSpeed: 0.003 });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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
  
  useAnimationTask(redrawGrid);

  return (
    <div 
      className="grid-container"
      ref={containerRef} 
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