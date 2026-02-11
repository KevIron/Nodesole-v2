import Connector from "../Connector";
import RegularNodeWrapper from "../nodeWrappers/RegularNodeWrapper";

export default function EntryNode() {
  return (
    <RegularNodeWrapper 
      className="node__entry"  
      title="Entry Point"
    >
      <Connector 
        type="flow"
        direction="input"
        name="test"
      />
    </RegularNodeWrapper>
  );
}