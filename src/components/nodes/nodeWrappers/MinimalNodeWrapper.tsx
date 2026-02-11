import NodeWrapper from "./NodeWrapper";

type MinimalNodeWrapperProps = React.PropsWithChildren<React.ComponentProps<"div">>;

export default function MinimalNodeWrapper({ className, children, ...props }: MinimalNodeWrapperProps) {
  return (
    <NodeWrapper 
      className={`node__minimal ${className}`}
      {...props}
    >
      <div className="node-body">
        {children}
      </div>
    </NodeWrapper>
  );
}