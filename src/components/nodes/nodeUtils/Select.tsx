type SelectProps = React.ComponentProps<"select"> & {
  text?: string
  options: string[]
}

export default function Select({ text, options, ...props }: SelectProps) {
  return (
    <div className="node-select">
      {text !== undefined && <label>{text}</label> }
      <select {...props}>
        {options.map(option => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}