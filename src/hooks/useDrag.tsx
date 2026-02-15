import { useEffect, useEffectEvent, useState } from "react";

type DragOptions = {
  onClick?: (e: MouseEvent) => void,
  onMove?: (e: MouseEvent) => void,
  onRelease?: (e: MouseEvent) => void,
}

// TODO: Apply a permanent fix over this hook by moving all interactions to a global event listener
// and make an state machine like system out of them
export default function useDrag<T = HTMLElement>({ onClick, onRelease, onMove }: DragOptions = {}) {
  const [isDragging, setIsDragging] = useState(false);

  function handleDragStart(e: React.MouseEvent<T>) {
    e.preventDefault();
    e.stopPropagation();

    onClick?.(e.nativeEvent);
    setIsDragging(true);
  }

  const handleDrag = useEffectEvent((e: MouseEvent) => {
    e.preventDefault();
    
    onMove?.(e);
  });

  const handleDragEnd = useEffectEvent((e: MouseEvent) => {
    onRelease?.(e);
    setIsDragging(false);
  });

  useEffect(() => {
    function attachEventListeners() {
      window.addEventListener("mousemove", handleDrag);
      window.addEventListener("mouseup", handleDragEnd);
    }
    
    function removeEventListeners() {
      window.removeEventListener("mousemove", handleDrag);
      window.removeEventListener("mouseup", handleDragEnd);
    }

    if (isDragging) { 
      attachEventListeners();
    }

    return () => {
      removeEventListeners();
    }
  }, [isDragging]);

  return {
    isDragging: isDragging,
    handlers: {
      onMouseDown: handleDragStart,
    }
  };
}