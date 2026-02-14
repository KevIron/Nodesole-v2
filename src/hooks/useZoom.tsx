import { useEditorStore } from "../store/editorStore";
import { clamp } from "../utils/Math";

import Vec2 from "../utils/Vec2";
import useViewportContext from "./useViewportContext";

type ZoomOptions = {
  minZoom: number,
  maxZoom: number,
  zoomSpeed: number
}

export default function useZoom({ minZoom, maxZoom, zoomSpeed }: ZoomOptions) {
  const updateViewportParams = useEditorStore((state) => state.updateViewportParams);
  const { convertToContainerPos } = useViewportContext();

  function handleZoom(e: React.WheelEvent) {
    updateViewportParams(prev => {
      const prevScaleFactor = prev.scaleFactor;
      const scaleFactor = clamp(minZoom, maxZoom, prevScaleFactor * Math.exp(-e.deltaY * zoomSpeed));

      const ratio = 1 - scaleFactor / prevScaleFactor;
      
      const mousePos = new Vec2(e.clientX, e.clientY);
      const mouseContainerPos = convertToContainerPos(mousePos);

      const offsetModifier = mouseContainerPos.subtract(prev.offset).multiplyAll(ratio);
      const newOffset = prev.offset.add(offsetModifier);

      return {
        offset: newOffset,
        scaleFactor: scaleFactor
      }
    });
  }

  return { 
    onWheel: handleZoom
  }
}