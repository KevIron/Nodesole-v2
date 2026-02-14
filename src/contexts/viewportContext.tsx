import { createContext } from "react";

import type Vec2 from "../utils/Vec2";

export type ViewportParams = {
  offset: Vec2,
  scaleFactor: number
}

export type ViewportContext = {
  convertToViewportPos: (pos: Vec2, params: ViewportParams) => Vec2,
  convertToContainerPos: (pos: Vec2) => Vec2,
}

export const ViewportContext = createContext<ViewportContext>({
  convertToViewportPos: () => { throw new Error("Method not implemented!"); },
  convertToContainerPos: () => { throw new Error("Method not implemented!"); },
});