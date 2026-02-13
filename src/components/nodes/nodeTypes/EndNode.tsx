import type { NodeProps } from "../../../types/EditorTypes";
import { NODE_COLORS } from "../../../utils/NodeColors";
import Connector from "../Connector";
import RegularNodeWrapper from "../nodeWrappers/RegularNodeWrapper";

export default function EndNode({ data }: NodeProps<"END_NODE">) {
  

  return (
    <RegularNodeWrapper
      nodeId={data.id} 
      className="node__end"  
      title="End Point"
      color={NODE_COLORS.NODE_END}
    >
      <Connector 
        type="flow"
        direction="input"
        name="test"
      />
    </RegularNodeWrapper>
  );
}