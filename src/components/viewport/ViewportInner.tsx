import Grid from "../Grid";
import ViewportWorkspace from "./ViewportWorkspace";
import useViewportDrag from "../../hooks/useViewportDrag";
import useZoom from "../../hooks/useZoom";

export default function ViewportInner() {
  const { handlers: dragHandlers } = useViewportDrag();
  const { onwWheel: zoomHandler } = useZoom({ minZoom: 0.5, maxZoom: 3, zoomSpeed: 0.0008 });

  const gridOptions = {
    spacing: 20,
    lineColor: "#868e96"
  };

  return (
    <>
      <Grid 
        gridOptions={gridOptions}
        onWheel={zoomHandler}
        {...dragHandlers}
      />
      <ViewportWorkspace />
    </>
  );
}