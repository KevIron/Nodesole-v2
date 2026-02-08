import { useRef, useState, type ReactNode } from "react";
import Vec2 from "../../utils/Vec2";
import useDrag from "../../hooks/useDrag";
import useViewportContext from "../../hooks/useViewportContext";

type NodeWrapperProps = {
  children: ReactNode[] | ReactNode
}

function createNodeTransform(pos: Vec2) {
  return `translate(${pos.x}px, ${pos.y}px)`;
}

export default function NodeWrapper({children}: NodeWrapperProps) {
  const [nodePosition, setNodePosition] = useState<Vec2>(new Vec2(0, 0));
  
  const nodeClickOffset = useRef<Vec2 | null>(null);
  const { convertToViewportPos } = useViewportContext();

  const { handlers } = useDrag({ 
    onClick: handleClickNode,
    onMove: handleMoveNode 
  });

  function handleClickNode(e: MouseEvent) {
    const currentPos = new Vec2(
        e.clientX, 
        e.clientY
    );

    const currentViewportPos = convertToViewportPos(currentPos);
    const offset = currentViewportPos.subtract(nodePosition);
    
    nodeClickOffset.current = offset;
  }

  function handleMoveNode(e: MouseEvent) {
    if (nodeClickOffset.current) {
      const currentPos = new Vec2(
        e.clientX, 
        e.clientY
      );

      const currentViewportPos = convertToViewportPos(currentPos);
      const newNodePos = currentViewportPos.subtract(nodeClickOffset.current);

      setNodePosition(newNodePos);
    }
  }  

  const nodeTransform = createNodeTransform(nodePosition);

  return (
    <div 
      className="node" 
      style={{ transform: nodeTransform }} 
      {...handlers}
    >
      {children}
    </div>
  );
}