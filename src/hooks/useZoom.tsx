import { clamp } from "../utils/Math";

import Vec2 from "../utils/Vec2";
import useViewportContext from "./useViewportContext";

type ZoomOptions = {
  minZoom: number,
  maxZoom: number,
  zoomSpeed: number
}

export default function useZoom({ minZoom, maxZoom, zoomSpeed }: ZoomOptions) {
  const { getViewportParams, updateViewportParams, convertToContainerPos } = useViewportContext();

  function handleZoom(e: React.WheelEvent) {
    const params = getViewportParams();

    const prevScaleFactor = params.scaleFactor;
    const scaleFactor = clamp(minZoom, maxZoom, prevScaleFactor * Math.exp(-e.deltaY * zoomSpeed));

    const ratio = 1 - scaleFactor / prevScaleFactor;
    
    const mousePos = new Vec2(e.clientX, e.clientY);
    const mouseContainerPos = convertToContainerPos(mousePos);

    const offsetModifier = mouseContainerPos.subtract(params.offset).multiplyAll(ratio);
    const newOffset = params.offset.add(offsetModifier);

    updateViewportParams({
      offset: newOffset,
      scaleFactor: scaleFactor
    });
  }

  return { 
    onWheel: handleZoom
  }
}