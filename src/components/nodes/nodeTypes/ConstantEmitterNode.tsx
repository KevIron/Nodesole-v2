import type { NodeProps } from "../../../types/EditorTypes";
import { NODE_COLORS } from "../../../utils/NodeColors";
import Connector from "../Connector";
import Input from "../nodeUtils/Input";
import Select from "../nodeUtils/Select";
import RegularNodeWrapper from "../nodeWrappers/RegularNodeWrapper";

export default function ConstantEmitterNode({ id }: NodeProps) {


  return (
    <RegularNodeWrapper 
      className="node__constant-emitter"
      title="Constant Emitter" 
      color={NODE_COLORS.NODE_DATA} 
      nodeId={id}
    >
      <Select 
        value="string"
        options={[ 
          "string",
          "boolean",
          "number",
        ]}  
      />
      <Input  />
      <Connector 
        type="data"
        direction="output"
        name=""
      />
    </RegularNodeWrapper>
  );
}