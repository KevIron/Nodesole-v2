import { createContext } from "react";

export type AnimationTask = () => void;

export type AnimationLoopContext = {
  addAnimationTask: (task: AnimationTask) => void,
  removeAnimationTask: (task: AnimationTask) => void
};

export const AnimationLoopContext = createContext<AnimationLoopContext>({
  addAnimationTask: () => () => { throw new Error("Method not implemented!"); },
  removeAnimationTask: () => () => { throw new Error("Method not implemented!"); }
});