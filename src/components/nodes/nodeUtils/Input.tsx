type InputProps = {
  name: string,
  isLabelShown: boolean
}

export default function Input({ name, value,isLabelShown }: InputProps) {
  
  return (
    <div className="node-input">
      {isLabelShown && (<label htmlFor="">name</label>) }
      <input type="text"/>
    </div>
  );
}