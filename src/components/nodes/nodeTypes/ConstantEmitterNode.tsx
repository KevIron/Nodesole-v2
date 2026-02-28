import type { NodeProps } from "../../../types/EditorTypes";
import { NODE_COLORS } from "../../../utils/NodeColors";
import Select from "../nodeUtils/Select";
import RegularNodeWrapper from "../nodeWrappers/RegularNodeWrapper";

export default function ConstantEmitterNode({ id }: NodeProps) {


  return (
    <RegularNodeWrapper 
      title="Constant Emitter" 
      color={NODE_COLORS.NODE_DATA} 
      nodeId={id}
    >
      <Select 
        text="Type:" 
        options={[ "s" ]}  
      />
    </RegularNodeWrapper>
  );
}