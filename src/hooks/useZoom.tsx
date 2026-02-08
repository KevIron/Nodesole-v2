import { clamp } from "../utils/Math";
import useViewportContext from "./useViewportContext";

type ZoomOptions = {
  minZoom: number,
  maxZoom: number,
  zoomSpeed: number
}

export default function useZoom({ minZoom, maxZoom, zoomSpeed }: ZoomOptions) {
  const { viewportParams, updateScaleFactor } = useViewportContext();

  function handleZoom(e: React.WheelEvent) {
    const delta = Math.exp(-e.deltaY * zoomSpeed);
    const newScaleFactor = clamp(minZoom, maxZoom, viewportParams.scaleFactor * delta);

    updateScaleFactor(newScaleFactor);
  }

  return { 
    onwWheel: handleZoom
  }
}