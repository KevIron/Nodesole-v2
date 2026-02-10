import { useEffect, useRef } from "react";
import { getElementDimensions, type Dimensions } from "../utils/Elements";

export default function useDimensionsRef<T extends HTMLElement>() {
  const containerRef = useRef<T | null>(null);
  const dimensionsRef = useRef<Dimensions>({ width: 0, height: 0 });

  useEffect(() => {
    function handleResize() {
      if (!containerRef.current) return;
      dimensionsRef.current = getElementDimensions(containerRef.current); 
    } 

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return {
    containerRef,
    dimensionsRef
  }
}