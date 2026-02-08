import { useRef, useState } from "react";
import { ViewportContext, type ViewportParams } from "../../contexts/viewportContext";
import Vec2 from "../../utils/Vec2";

export default function ViewportContainer({ children, ...props }: React.ComponentPropsWithoutRef<"div">) {
  const [viewportParams, setViewportParams] = useState<ViewportParams>({
    offset: new Vec2(0, 0),
    scaleFactor: 1
  });
  const viewportRef = useRef<HTMLDivElement | null>(null);

  function convertToViewportPos(pos: Vec2) {
    if (!viewportRef.current) throw new Error("Viewport not found!");

    const viewportContainerRect = viewportRef.current.getBoundingClientRect();
    const viewportContainerPos = new Vec2(viewportContainerRect.x, viewportContainerRect.y);

    const containerRelativePos = pos.subtract(viewportContainerPos);
    const viewportRelativePos = containerRelativePos.subtract(viewportParams.offset);

    return viewportRelativePos;
  }

  function updateViewportOffset(newOffset: Vec2) {
    setViewportParams(prev => ({
      ...prev,
      offset: newOffset
    }));
  } 

  const viewportContextValue = {
    viewportParams: viewportParams,
    convertToViewportPos: convertToViewportPos,
    updateViewportOffset: updateViewportOffset
  };

  return (
    <div className="viewport" ref={viewportRef} {...props}>
      <ViewportContext value={viewportContextValue}>
        {children}
      </ViewportContext>
    </div>
  );
}