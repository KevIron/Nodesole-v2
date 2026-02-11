import { NODE_COLORS } from "../../../utils/NodeColors";
import Connector from "../Connector";
import RegularNodeWrapper from "../nodeWrappers/RegularNodeWrapper";

export default function EndNode() {
  return (
    <RegularNodeWrapper 
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