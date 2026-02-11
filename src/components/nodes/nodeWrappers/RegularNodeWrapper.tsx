import NodeWrapper from "./NodeWrapper";

type RegularNodeWrapperProps = React.PropsWithChildren<React.ComponentProps<"div">> & {
  title: string,
  color: string
}

export default function RegularNodeWrapper({ title, children, className, color, ...props }: RegularNodeWrapperProps) {
  return (
    <NodeWrapper 
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