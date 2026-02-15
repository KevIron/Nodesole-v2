import { memo } from "react";
import type { NodeProps } from "../../../types/EditorTypes";
import { NODE_COLORS } from "../../../utils/NodeColors";
import Connector from "../Connector";
import RegularNodeWrapper from "../nodeWrappers/RegularNodeWrapper";

function EndNode({ id }: NodeProps) {
  return (
    <RegularNodeWrapper
      nodeId={id} 
      className="node__end"  
      title="End Point"
      color={NODE_COLORS.NODE_END}
    >
      <Connector 
        type="flow"
        direction="input"
        name="test END"
      />
    </RegularNodeWrapper>
  );
}

export default memo(EndNode);