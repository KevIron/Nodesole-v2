import { useEffect, useRef } from "react";
import { drawGrid, type GridOptions } from "../../utils/Grid";

import useViewportDrag from "../../hooks/useViewportDrag";
import useZoom from "../../hooks/useZoom";
import useContainerDimensions from "../../hooks/useDimensions";
import { useEditorStore } from "../../store/editorStore";

type ViewportGridProps = React.ComponentPropsWithRef<"div"> & {
  gridOptions: GridOptions,
}

export default function Grid({ gridOptions, ...props }: ViewportGridProps) {
  const viewportParams = useEditorStore((state) => state.viewportParams);

  const { containerRef, dimensions } = useContainerDimensions<HTMLDivElement>();
  const { handlers: dragHandlers } = useViewportDrag();
  const { onWheel } = useZoom({ minZoom: 0.5, maxZoom: 3.75, zoomSpeed: 0.003 });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d")!;

    canvasRef.current.width = dimensions.width;
    canvasRef.current.height = dimensions.height;

    drawGrid(context, dimensions, viewportParams, gridOptions);
  }, [viewportParams, dimensions]);

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