import NodeWrapper from "./NodeWrapper";

type RegularNodeWrapperProps = React.PropsWithChildren<React.ComponentProps<"div">> & {
  title: string,
  color: string,
  nodeId: string
}

export default function RegularNodeWrapper({ nodeId, title, children, className, color, ...props }: RegularNodeWrapperProps) {
  return (
    <NodeWrapper 
      nodeId={nodeId}
      color={color}
      className={`node__regular ${className}`}
      {...props}
    >
      <div className="node-header">{title}</div>
      <div className="node-body">
        {children}
      </div>
    </NodeWrapper>
  );
}