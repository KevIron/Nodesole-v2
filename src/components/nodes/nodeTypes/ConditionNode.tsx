import { memo } from "react";
import Connector from "../Connector";
import RegularNodeWrapper from "../nodeWrappers/RegularNodeWrapper";
import type { NodeProps } from "../../../types/EditorTypes";

function ConditionNode({ id }: NodeProps) {
  return (
    <RegularNodeWrapper 
      className="node__condition"
      nodeId={id} 
      title="If Statement" 
      color="hsl(345, 88%, 47%)"
    >
      <div className="input-connectors">
        <Connector 
          type="flow"
          direction="input"
          name="FLOW-IN"
        />
        <Connector 
          type="data"
          direction="input"
          name="CONDITION"
          description="Condition"
        />
      </div>
      <div className="output-connectors">
        <Connector 
          type="flow"
          direction="output"
          name="FLOW-OUT"
        />
        <Connector 
          type="flow"
          direction="output"
          name="THEN"
          description="Then"
        />
        <Connector 
          type="flow"
          direction="output"
          name="ELSE"
          description="Else"
        />
      </div>
    </RegularNodeWrapper>
  );
}

export default memo(ConditionNode);