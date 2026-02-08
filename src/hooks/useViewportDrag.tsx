import { useRef } from "react";
import useDrag from "./useDrag";
import useViewportContext from "./useViewportContext";
import Vec2 from "../utils/Vec2";

export default function useViewportDrag() {
  const { updateViewportOffset, viewportParams } = useViewportContext();
  const dragObject = useDrag({ 
    onClick: handleViewportClick,
    onMove: handleViewportPan
  });

  const dragStartPos = useRef<Vec2 | null>(null);
  const dragStartOffset = useRef<Vec2 | null>(null);

  function handleViewportClick(e: MouseEvent) {
    const currentPos = new Vec2(
        e.clientX, 
        e.clientY
    );

    dragStartPos.current = currentPos;
    dragStartOffset.current = viewportParams.offset;
  }

  function handleViewportPan(e: MouseEvent) {
    if (!dragStartPos.current || !dragStartOffset.current) return;

    const currentPos = new Vec2(
        e.clientX, 
        e.clientY
    );

    const delta = currentPos.subtract(dragStartPos.current);
    const newOffset = dragStartOffset.current.add(delta);

    updateViewportOffset(newOffset);
  }

  return dragObject;
}