import NodeWrapper from "./NodeWrapper";

type MinimalNodeWrapperProps = React.PropsWithChildren<React.ComponentProps<"div">> & {
  color: string
};

export default function MinimalNodeWrapper({ className, color, children, ...props }: MinimalNodeWrapperProps) {
  return (
    <NodeWrapper 
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