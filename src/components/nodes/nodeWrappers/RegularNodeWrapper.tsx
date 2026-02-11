import NodeWrapper from "./NodeWrapper";

type RegularNodeWrapperProps = React.PropsWithChildren<React.ComponentProps<"div">> & {
  title: string
}

export default function RegularNodeWrapper({ title, children, className, ...props }: RegularNodeWrapperProps) {
  return (
    <NodeWrapper 
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