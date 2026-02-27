import { useRef } from "react";

import Vec2 from "../../utils/Vec2";
import Grid from "./Grid";
import Workspace from "./Workspace";
import Connections from "./Connections";

import { ViewportContext, type ViewportParams } from "../../contexts/viewportContext";

export default function Viewport() {
  const viewportRef = useRef<HTMLDivElement | null>(null);

  function convertToContainerPos(pos: Vec2) {
    if (!viewportRef.current) throw new Error("Viewport not found!");

    const viewportContainerRect = viewportRef.current.getBoundingClientRect();
    const viewportContainerPos = new Vec2(viewportContainerRect.x, viewportContainerRect.y);

    const containerRelativePos = pos.subtract(viewportContainerPos);

    return containerRelativePos;
  }

  function convertToViewportPos(pos: Vec2, params: ViewportParams) {
    const containerRelativePos = convertToContainerPos(pos);
    const viewportRelativePos = containerRelativePos.subtract(params.offset);

    return viewportRelativePos.divideAll(params.scaleFactor);
  }

  const viewportAPI = {
    convertToViewportPos,
    convertToContainerPos,
  };

  // Grid initialization

  const gridOptions = {
    spacing: 20,
    lineColor: "#000000"
  };

  return (
    <ViewportContext value={viewportAPI}>
      <div className="viewport" ref={viewportRef}>
        <Grid gridOptions={gridOptions} />
        <Connections />
        <Workspace />
      </div>
    </ViewportContext>
  );
}