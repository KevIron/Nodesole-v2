type ActionButtonProps = React.ComponentProps<"button"> & {
  Icon: React.ComponentType,
  text?: string
}

export default function ActionButton({ Icon, text, className, ...props }: ActionButtonProps) {
  return (
    <button className={`action-btn ${className !== undefined ? className : ""}`} {...props}>
      <Icon />
      {text !== undefined && <span>{text}</span>}
    </button>
  );
}