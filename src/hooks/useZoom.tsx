import { clamp } from "../utils/Math";
import Vec2 from "../utils/Vec2";
import useViewportContext from "./useViewportContext";

type ZoomOptions = {
  minZoom: number,
  maxZoom: number,
  zoomSpeed: number
}

export default function useZoom({ minZoom, maxZoom, zoomSpeed }: ZoomOptions) {
  const { setViewportParams } = useViewportContext();

  function handleZoom(e: React.WheelEvent) {
    setViewportParams(prev => {
      const prevScaleFactor = prev.scaleFactor;

      const delta = Math.exp(-e.deltaY * zoomSpeed);
      const newScaleFactor = clamp(minZoom, maxZoom, prevScaleFactor * delta);

      const ratio = 1 - newScaleFactor / prevScaleFactor;

      const target = e.target as HTMLElement;
      const viewportCnt= target.closest<HTMLDivElement>(".viewport");

      if (!viewportCnt) return {
        ...prev
      };

      const viewportCntRect = viewportCnt.getBoundingClientRect();

      const viewportCntPos = new Vec2(viewportCntRect.x, viewportCntRect.y);
      const mousePosCntRelative = new Vec2(e.clientX, e.clientY).subtract(viewportCntPos);

      console.log(mousePosCntRelative)

      const newOffset = mousePosCntRelative
        .subtract(prev.offset)
        .multiplyAll(ratio)
        .add(prev.offset);

      return {
        offset: newOffset,
        scaleFactor: newScaleFactor
      }
    });
  }

  return { 
    onwWheel: handleZoom
  }
}