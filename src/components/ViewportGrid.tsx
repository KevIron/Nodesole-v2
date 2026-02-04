import { useEffect, useRef, useState } from "react";
import { getElementDimensions } from "../utils/Elements";
import { drawGrid } from "../utils/Grid";

import type { Dimensions } from "../utils/Elements";
import type { ViewportParams } from "./Viewport";

type ViewportGridProps = {
  spacing: number,
  lineColor?: string
  viewportParams: ViewportParams
}

export default function ViewportGrid({ spacing, lineColor = "black", viewportParams }: ViewportGridProps) {
  const [gridDimensions, setGridDimensions] = useState<Dimensions>({ width: 0, height: 0 });

  const canvasContainerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    function handleResize() {
      if (!canvasContainerRef.current) return;
      setGridDimensions(getElementDimensions(canvasContainerRef.current)); 
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [spacing]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d")!;

    drawGrid(context, gridDimensions, spacing, lineColor, viewportParams);
  }, [gridDimensions, spacing, lineColor, viewportParams]);

  return (
    <div 
      ref={canvasContainerRef} 
      className="grid-container"
    >
      <canvas 
        ref={canvasRef}
        width={gridDimensions.width}  
        height={gridDimensions.height}
      />
    </div>
  );
}