import { useContext, useEffect, useEffectEvent, useState } from "react";
import { AnimationLoopContext, type AnimationTask } from "../contexts/AnimationLoopContext";

export function useAnimationTask(callback: AnimationTask, attachOnMount: boolean = true) {
  const [isRunning, setIsRunning] = useState(attachOnMount);

  const animationContext = useContext(AnimationLoopContext);
  if (!animationContext) throw new Error("This hook must be used inside of an animationLoop context");

  const task = useEffectEvent(callback);

  useEffect(() => {
    if (!isRunning) return;

    animationContext.addAnimationTask(task);
    return () => animationContext.removeAnimationTask(task);
  }, [isRunning, animationContext]);

  return {
    attach: () => setIsRunning(true),
    detach: () => setIsRunning(false),
    isRunning
  }
}