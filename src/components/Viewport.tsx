// import { useEffect, useRef, useState } from "react";
// import ViewportGrid from "./ViewportGrid";
// import Vec2 from "../utils/Vec2";
// import EntryNode from "./nodes/EntryNode";
// import { ViewportContext } from "../contexts/viewportContext";

// export type ViewportParams = {
//   offset: Vec2,
//   scaleFactor: number
// }

// function createViewportTransform(params: ViewportParams) {
//   const translate = `translate(${params.offset.x}px, ${params.offset.y}px)`;
//   const scale = `scale(${params.scaleFactor})`;

//   return `${translate} ${scale}`;
// }

// export default function Viewport() {
//   const [viewportParams, setViewportParams] = useState<ViewportParams>({
//     offset: new Vec2(0, 0),
//     scaleFactor: 1
//   });

//   const currentOffset = useRef<Vec2 | null>(null);
//   const dragStartPos = useRef<Vec2 | null>(null);
//   const dragStartOffset = useRef<Vec2 | null>(null);

//   const viewportRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     currentOffset.current = viewportParams.offset
//   }, [viewportParams.offset]);

//   useEffect(() => {
//     function handleViewportClick(e: MouseEvent) {
//       const clickedElement = e.target as HTMLElement;
//       if (clickedElement.tagName !== "CANVAS") return;

//       dragStartPos.current = new Vec2(e.clientX, e.clientY);
//       dragStartOffset.current = currentOffset.current;
//     }

//     function handleViewportRelease() {
//       if (!dragStartPos.current) return;
//       dragStartPos.current = null;
//     }

//     document.addEventListener("mousedown", handleViewportClick);
//     document.addEventListener("mouseup", handleViewportRelease);

//     return () => { 
//       document.removeEventListener("mousedown", handleViewportClick);
//       document.removeEventListener("mouseup", handleViewportRelease);
//     }
//   }, []);

//   useThrottledWindowEvent("mousemove", (e) => {
//     if (!dragStartPos.current || !dragStartOffset.current) return;

//     const currentPos = new Vec2(e.clientX, e.clientY);
//     const distance =  dragStartOffset.current.add(currentPos.subtract(dragStartPos.current));

//     setViewportParams(prev => ({
//       ...prev,
//       offset: distance
//     }));
//   });

//   function convertToViewportPos(pos: Vec2) {
//     if (!viewportRef.current) throw new Error("Viewport not found!");

//     const viewportContainerRect = viewportRef.current.getBoundingClientRect();
//     const viewportContainerPos = new Vec2(viewportContainerRect.x, viewportContainerRect.y);

//     const containerRelativePos = pos.subtract(viewportContainerPos);
//     const viewportRelativePos = containerRelativePos.subtract(viewportParams.offset);

//     return viewportRelativePos;
//   }

//   const viewportTransform = createViewportTransform(viewportParams);

//   return (
//     <ViewportContext value={{ viewportParams, convertToViewportPos }}>
//       <div className="viewport" ref={viewportRef}>
//         <ViewportGrid
//           viewportParams={viewportParams} 
//           gridOptions={{
//             spacing: 16,
//             lineColor: "black"
//           }}        
//         />
//         <div className="viewport-workspace" style={{ transform: viewportTransform }}>
//           <div className="nodes-container">
//             <EntryNode />
//           </div>
//           <div className="connections-container"></div>
//         </div>
//       </div>
//     </ViewportContext>
//   );
// }