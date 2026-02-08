import { useRef } from "react";
import useDrag from "../../hooks/useDrag";
import useViewportContext from "../../hooks/useViewportContext";
import Grid from "../Grid";
import ViewportWorkspace from "./ViewportWorkspace";
import Vec2 from "../../utils/Vec2";

export default function ViewportInner() {
  const { updateViewportOffset, viewportParams } = useViewportContext();
  const { handlers } = useDrag({ 
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

  const gridOptions = {
    spacing: 20,
    lineColor: "#868e96"
  };

  return (
    <>
      <Grid 
        gridOptions={gridOptions} 
        {...handlers}
      />
      <ViewportWorkspace />
    </>
  );
}