import { memo } from "react";
import type { NodeProps } from "../../../types/EditorTypes";
import { NODE_COLORS } from "../../../utils/NodeColors";
import Connector from "../Connector";
import RegularNodeWrapper from "../nodeWrappers/RegularNodeWrapper";

function EntryNode({ id }: NodeProps) {
  return (
    <RegularNodeWrapper 
      nodeId={id}
      className="node__entry"  
      title="Entry Point"
      color={NODE_COLORS.NODE_ENTRY}
    >
      <Connector 
        type="flow"
        direction="output"
        name="test ENTRY"
      />
    </RegularNodeWrapper>
  );
}

export default memo(EntryNode);