import { memo, useRef } from "react";
import Vec2 from "../../../utils/Vec2";
import useDrag from "../../../hooks/useDrag";
import useViewportContext from "../../../hooks/useViewportContext";
import { NodeContext } from "../../../contexts/NodeContext";
import { useEditorStore } from "../../../store/editorStore";

type NodeWrapperProps = React.PropsWithChildren<React.ComponentProps<"div">> & {
  color: string
  nodeId: string
};

function createNodeTransform(pos: Vec2) {
  return `translate(${pos.x}px, ${pos.y}px)`;
}

function NodeWrapper({ nodeId, className, style, color, children, ...props }: NodeWrapperProps) { 
  const nodePosition = useEditorStore((state) => state.nodes[nodeId].data.pos);
  const updateNodePosition = useEditorStore((state) => state.updateNodePosition);

  const nodeContainerRef = useRef<HTMLDivElement | null>(null);
  const nodeClickOffsetRef = useRef<Vec2 | null>(null);

  const { convertToViewportPos } = useViewportContext();
  const { handlers } = useDrag({ 
    onClick: handleClickNode,
    onMove: handleMoveNode, 
  });

  function handleClickNode(e: MouseEvent) {
    if (!nodeContainerRef.current) return;

    const clickPos = new Vec2(e.clientX, e.clientY);

    const nodeRect = nodeContainerRef.current.getBoundingClientRect();
    const nodePos = new Vec2(nodeRect.x, nodeRect.y);

    const offset = clickPos.subtract(nodePos);
    
    nodeClickOffsetRef.current = offset;
  }

  function handleMoveNode(e: MouseEvent) {
    if (!nodeClickOffsetRef.current) return;

    const currentPos = new Vec2(
      e.clientX, 
      e.clientY
    );

    const offsetPos = currentPos.subtract(nodeClickOffsetRef.current);
    
    updateNodePosition(nodeId, prev => {
      return convertToViewportPos(offsetPos, prev);
    });
  }
  
  const nodeStyle = { 
    ...style,
    "transform": createNodeTransform(nodePosition),
    "--node-color": color,
  } as React.CSSProperties

  const nodeContextValue = {
    id: nodeId
  }

  return (
    <NodeContext value={nodeContextValue}>
      <div 
        ref={nodeContainerRef}
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

export default memo(NodeWrapper);