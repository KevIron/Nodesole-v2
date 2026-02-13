import { useEffect, useRef, useState } from "react";
import { getElementDimensions, type Dimensions } from "../utils/Elements";

export default function useDimensionsRef<T extends HTMLElement>() {
  const [dimensions, setDimensions] = useState<Dimensions>({ width: 0, height: 0 });
  const containerRef = useRef<T | null>(null);

  useEffect(() => {
    function handleResize() {
      if (!containerRef.current) return;
      setDimensions(getElementDimensions(containerRef.current)); 
    } 

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return {
    containerRef,
    dimensions
  }
}