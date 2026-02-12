import { useEffect, useEffectEvent, useState } from "react";

type DragOptions = {
  onClick?: (e: MouseEvent) => void,
  onMove?: (e: MouseEvent) => void,
  onRelease?: (e: MouseEvent) => void,
}

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
    
    if (isDragging) onMove?.(e);
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