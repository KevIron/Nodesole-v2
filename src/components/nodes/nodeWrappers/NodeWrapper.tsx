import { useRef } from "react";
import Vec2 from "../../../utils/Vec2";
import useDrag from "../../../hooks/useDrag";
import useViewportContext from "../../../hooks/useViewportContext";
import { useAnimationTask } from "../../../hooks/useAnimationTask";
import { NodeContext } from "../../../contexts/NodeContext";

type NodeWrapperProps = React.PropsWithChildren<React.ComponentProps<"div">> & {
  color: string
  nodeId: string
};

function createNodeTransform(pos: Vec2) {
  return `translate(${pos.x}px, ${pos.y}px)`;
}

export default function NodeWrapper({ nodeId, className, style, color, children, ...props }: NodeWrapperProps) {
  const nodeRef = useRef<HTMLDivElement | null>(null);  

  const nodePositionRef = useRef<Vec2>(new Vec2(0, 0));
  const nodeClickOffset = useRef<Vec2 | null>(null);

  const { convertToViewportPos } = useViewportContext();
  const { attach, detach } = useAnimationTask(updateNodeTransform);
  const { handlers } = useDrag({ 
    onClick: handleClickNode,
    onMove: handleMoveNode, 
    onRelease: detach
  });

  function handleClickNode(e: MouseEvent) {
    const currentPos = new Vec2(
        e.clientX, 
        e.clientY
    );

    const currentViewportPos = convertToViewportPos(currentPos);
    const offset = currentViewportPos.subtract(nodePositionRef.current);
    
    nodeClickOffset.current = offset;
    attach();
  }

  function handleMoveNode(e: MouseEvent) {
    if (nodeClickOffset.current) {
      const currentPos = new Vec2(
        e.clientX, 
        e.clientY
      );

      const currentViewportPos = convertToViewportPos(currentPos);
      const newNodePos = currentViewportPos.subtract(nodeClickOffset.current);

      nodePositionRef.current = newNodePos;
    }
  } 

  function updateNodeTransform() {
    if (!nodeRef.current) return;

    const node = nodeRef.current;
    const nodeTransform = createNodeTransform(nodePositionRef.current);

    node.style.transform = nodeTransform;
  }

  
  const nodeStyle = { 
    "--node-color": color,
    ...style
  } as React.CSSProperties

  const nodeContextValue = {
    id: nodeId
  }

  return (
    <NodeContext value={nodeContextValue}>
      <div 
        ref={nodeRef}
        className={`node ${className}`} 
        style={nodeStyle} 
        {...handlers}
        {...props}
      >
        {children}
      </div>
    </NodeContext>
  );
}