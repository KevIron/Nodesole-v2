import type { ViewportParams } from "../components/Viewport";
import type { Dimensions } from "./Elements";
import Vec2 from "./Vec2";

export function drawGrid(context: CanvasRenderingContext2D, dimensions: Dimensions, spacing: number, lineColor: string, viewportParams: ViewportParams) {
  spacing = Math.ceil(spacing * viewportParams.scaleFactor);

  const numOfHorizontalLines = Math.ceil(dimensions.height / spacing);
  const numOfVerticalLines = Math.ceil(dimensions.width / spacing)

  const drawingOffset = new Vec2(
    (viewportParams.offset.x % spacing) * viewportParams.scaleFactor,
    (viewportParams.offset.y % spacing) * viewportParams.scaleFactor
  );

  context.clearRect(0, 0, dimensions.width, dimensions.height);
  context.strokeStyle = lineColor;

  for (let i = 0; i < numOfHorizontalLines; ++i) {
    const pos = i * spacing;

    context.beginPath();
    context.moveTo(0, pos + 0.5 + drawingOffset.y);
    context.lineTo(dimensions.width, pos + 0.5 + drawingOffset.y);
    context.stroke();
  }

  for (let i = 0; i < numOfVerticalLines; ++i) {
    const pos = i * spacing;

    context.beginPath();
    context.moveTo(pos + 0.5 + drawingOffset.x, 0);
    context.lineTo(pos + 0.5 + drawingOffset.x, dimensions.height);
    context.stroke();
  }
}