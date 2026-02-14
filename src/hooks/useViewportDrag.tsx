import { useRef } from "react";

import useDrag from "./useDrag";
import Vec2 from "../utils/Vec2";

import { useEditorStore } from "../store/editorStore";

export default function useViewportDrag() {
  const updateViewportParams = useEditorStore((state) => state.updateViewportParams)

  const dragObject = useDrag({ 
    onClick: handleViewportClick,
    onMove: handleViewportPan
  });

  const dragStartPos = useRef<Vec2 | null>(null);

  function handleViewportClick(e: MouseEvent) {
    const currentPos = new Vec2(
        e.clientX, 
        e.clientY
    );

    dragStartPos.current = currentPos;
  }

  function handleViewportPan(e: MouseEvent) {
    if (!dragStartPos.current) return;

    const currentPos = new Vec2(
        e.clientX, 
        e.clientY
    );

    const delta = currentPos.subtract(dragStartPos.current);
    dragStartPos.current = currentPos;

    updateViewportParams(prev => ({
      ...prev,
      offset: prev.offset.add(delta)
    }));
  }

  return dragObject;
}