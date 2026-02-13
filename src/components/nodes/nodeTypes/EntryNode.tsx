import type { NodeProps } from "../../../types/EditorTypes";
import { NODE_COLORS } from "../../../utils/NodeColors";
import Connector from "../Connector";
import RegularNodeWrapper from "../nodeWrappers/RegularNodeWrapper";

export default function EntryNode({ data }: NodeProps<"ENTRY_NODE">) {
  console.log(data)

  return (
    <RegularNodeWrapper 
      className="node__entry"  
      title="Entry Point"
      color={NODE_COLORS.NODE_ENTRY}
    >
      <Connector 
        type="flow"
        direction="output"
        name="test"
      />
    </RegularNodeWrapper>
  );
}