import type { ViewportParams } from "../components/Viewport";
import type { Dimensions } from "./Elements";
import Vec2 from "./Vec2";

export type GridOptions = {
  spacing: number,
  lineColor: string,
}

export function drawGrid(context: CanvasRenderingContext2D, dimensions: Dimensions, viewportParams: ViewportParams, options: GridOptions) {
  const spacing = Math.ceil(options.spacing * viewportParams.scaleFactor);

  const drawingOffset = new Vec2(
    (viewportParams.offset.x % spacing) * viewportParams.scaleFactor,
    (viewportParams.offset.y % spacing) * viewportParams.scaleFactor
  );

  context.clearRect(0, 0, dimensions.width, dimensions.height);
  context.strokeStyle = options.lineColor;

  const correctionOffset = 0.5;

  for (let i = drawingOffset.x; i < dimensions.width; i += spacing) {
    context.beginPath();
    context.moveTo(i + correctionOffset, 0);
    context.lineTo(i + correctionOffset, dimensions.height);
    context.stroke();

  }

  for (let i = drawingOffset.y; i < dimensions.height; i += spacing) {
    context.beginPath();
    context.moveTo(0, i + correctionOffset);
    context.lineTo(dimensions.width, i + correctionOffset);
    context.stroke();
  }
}