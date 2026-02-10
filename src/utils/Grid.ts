import type { ViewportParams } from "../contexts/ViewportContext";
import type { Dimensions } from "./Elements";

import Vec2 from "./Vec2";

export type GridOptions = {
  spacing: number,
  lineColor: string,
}

export function drawGrid(context: CanvasRenderingContext2D, dimensions: Dimensions, viewportParams: ViewportParams, options: GridOptions) {
  const spacing = options.spacing * viewportParams.scaleFactor;

  const drawingOffset = new Vec2(
    (viewportParams.offset.x % spacing),
    (viewportParams.offset.y % spacing) 
  );

  context.clearRect(0, 0, dimensions.width, dimensions.height);
  context.strokeStyle = options.lineColor;

  const correctionOffset = 0.5;

  for (let i = drawingOffset.x; i < dimensions.width; i += spacing) {
    const pos = Math.round(i) + correctionOffset;

    context.beginPath();
    context.moveTo(pos, 0);
    context.lineTo(pos, dimensions.height);
    context.stroke();
  }

  for (let i = drawingOffset.y; i < dimensions.height; i += spacing) {
    const pos = Math.round(i) + correctionOffset;

    context.beginPath();
    context.moveTo(0, pos);
    context.lineTo(dimensions.width, pos);
    context.stroke();
  }
}