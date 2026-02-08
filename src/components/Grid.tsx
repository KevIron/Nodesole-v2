import { useEffect, useRef, useState } from "react";
import { getElementDimensions } from "../utils/Elements";
import { drawGrid, type GridOptions } from "../utils/Grid";

import type { Dimensions } from "../utils/Elements";
import useViewportContext from "../hooks/useViewportContext";

type ViewportGridProps = React.ComponentProps<"div"> & {
  gridOptions: GridOptions,
}

export default function Grid({ gridOptions, ...props }: ViewportGridProps) {
  const [gridDimensions, setGridDimensions] = useState<Dimensions>({ width: 0, height: 0 });

  const canvasContainerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const { viewportParams } = useViewportContext();
  
  // Redraw the grid if any of the dependency change
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d")!;

    drawGrid(context, gridDimensions, viewportParams, {
      spacing: gridOptions.spacing,
      lineColor: gridOptions.lineColor
    });
  }, [gridDimensions, viewportParams, gridOptions]);

  // Resize the grid when mounted
  useEffect(() => {
    if (canvasContainerRef.current) {
      setGridDimensions(getElementDimensions(canvasContainerRef.current)); 
    }
  }, []);

  // Resize the grid when page size changes
  useEffect(() => {
    function handleResize() {
      if (canvasContainerRef.current) {
        setGridDimensions(getElementDimensions(canvasContainerRef.current)); 
      }
    } 

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  return (
    <div 
      ref={canvasContainerRef} 
      className="grid-container"
      {...props}
    >
      <canvas 
        ref={canvasRef}
        width={gridDimensions.width}  
        height={gridDimensions.height}
      />
    </div>
  );
}