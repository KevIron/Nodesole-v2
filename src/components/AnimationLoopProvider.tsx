import { useEffect, useRef } from "react";
import { AnimationLoopContext, type AnimationTask } from "../contexts/AnimationLoopContext";

export default function AnimationLoopProvider({ children }: React.PropsWithChildren) {
  const animationTasks = useRef<Set<AnimationTask>>(new Set());

  function addAnimationTask(task: AnimationTask) {
    animationTasks.current.add(task);
  }

  function removeAnimationTask(task: AnimationTask) {
    animationTasks.current.delete(task);
  }

  useEffect(() => {
    let frameId: number | null = null;

    function animationLoop() {
      for (const task of animationTasks.current.values()) {
        task();
      }

      frameId = requestAnimationFrame(animationLoop);
    }

    animationLoop();

    return () => {
      if (frameId != null) cancelAnimationFrame(frameId);
    }
  }, []);
  
  const animationContextValue = {
    addAnimationTask,
    removeAnimationTask
  }

  return (
    <AnimationLoopContext value={animationContextValue}>
      {children}
    </AnimationLoopContext>
  );
}