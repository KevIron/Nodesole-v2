import { createContext } from "react";
import Vec2 from "../utils/Vec2";

export type ViewportParams = {
  offset: Vec2,
  scaleFactor: number
}

export type ViewportContext = {
  viewportParams: ViewportParams,
  convertToViewportPos: (pos: Vec2) => Vec2,
  updateViewportOffset: (offset: Vec2) => void,
  updateScaleFactor: (factor: number) => void
}

export const ViewportContext = createContext<ViewportContext>({
  viewportParams: {
    offset: new Vec2(0, 0),
    scaleFactor: 0
  },
  convertToViewportPos: () => { throw new Error("Method not implemented!"); },
  updateViewportOffset: () => { throw new Error("Method not implemented!"); },
  updateScaleFactor: () => { throw new Error("Method not implemented!"); }
});