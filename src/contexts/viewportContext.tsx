import { createContext } from "react";
import Vec2 from "../utils/Vec2";

export type ViewportParams = {
  offset: Vec2,
  scaleFactor: number
}

export type ViewportContext = {
  getViewportParams: () => ViewportParams
  convertToViewportPos: (pos: Vec2) => Vec2,
  convertToContainerPos: (pos: Vec2) => Vec2,

  updateViewportOffset: (offset: Vec2) => void,
  updateScaleFactor: (factor: number) => void
  updateViewportParams: (params: ViewportParams) => void
}

export const ViewportContext = createContext<ViewportContext>({
  getViewportParams: () => { throw new Error("Method not implemented!"); },
  convertToViewportPos: () => { throw new Error("Method not implemented!"); },
  convertToContainerPos: () => { throw new Error("Method not implemented!"); },

  updateViewportOffset: () => { throw new Error("Method not implemented!"); },
  updateScaleFactor: () => { throw new Error("Method not implemented!"); },
  updateViewportParams: () => { throw new Error("Method not implemented"); }
});