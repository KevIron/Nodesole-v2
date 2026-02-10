import { useContext, useEffect, useEffectEvent } from "react";
import { AnimationLoopContext, type AnimationTask } from "../contexts/AnimationLoopContext";

export function useAnimationTask(callback: AnimationTask) {
  const animationContext = useContext(AnimationLoopContext);
  if (!animationContext) throw new Error("This hook must be used inside of an animationLoop context");

  const task = useEffectEvent(callback);

  useEffect(() => {
    animationContext.addAnimationTask(task);
    return () => animationContext.removeAnimationTask(task);
  }, [animationContext]);
}