import { useRef } from "react";

import Vec2 from "../../utils/Vec2";
import Grid from "./Grid";
import Workspace from "./Workspace";
import Connections from "./Connections";

import { ViewportContext, type ViewportParams } from "../../contexts/ViewportContext";

export default function Viewport() {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const viewportParamsRef = useRef<ViewportParams>({
    offset: new Vec2(0, 0),
    scaleFactor: 1
  });

  function getViewportParams() {
    return viewportParamsRef.current;
  }

  function convertToContainerPos(pos: Vec2) {
    if (!viewportRef.current) throw new Error("Viewport not found!");

    const viewportContainerRect = viewportRef.current.getBoundingClientRect();
    const viewportContainerPos = new Vec2(viewportContainerRect.x, viewportContainerRect.y);

    const containerRelativePos = pos.subtract(viewportContainerPos);

    return containerRelativePos;
  }

  function convertToViewportPos(pos: Vec2) {
    const params = getViewportParams();
    const containerRelativePos = convertToContainerPos(pos);
    const viewportRelativePos = containerRelativePos.subtract(params.offset);

    return viewportRelativePos.divideAll(params.scaleFactor);
  }

  function updateViewportOffset(offset: Vec2) {
    viewportParamsRef.current.offset = offset;
  }

  function updateScaleFactor(factor: number) {
    viewportParamsRef.current.scaleFactor = factor;
  }

  function updateViewportParams(params: ViewportParams) {
    viewportParamsRef.current = params;
  }

  const viewportAPI = {
    getViewportParams,
    convertToViewportPos,
    convertToContainerPos,

    updateViewportOffset,
    updateScaleFactor,
    updateViewportParams
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