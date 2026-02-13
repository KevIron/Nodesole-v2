import NodeWrapper from "./NodeWrapper";

type MinimalNodeWrapperProps = React.PropsWithChildren<React.ComponentProps<"div">> & {
  color: string
  nodeId: string
};

export default function MinimalNodeWrapper({ nodeId, className, color, children, ...props }: MinimalNodeWrapperProps) {
  return (
    <NodeWrapper 
      nodeId={nodeId}
      color={color}
      className={`node__minimal ${className}`}
      {...props}
    >
      <div className="node-body">
        {children}
      </div>
    </NodeWrapper>
  );
}