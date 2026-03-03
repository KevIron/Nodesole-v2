import { memo } from "react";
import type { NodeDataTypesMap, NodeProps } from "../../../types/EditorTypes";
import MinimalNodeWrapper from "../nodeWrappers/MinimalNodeWrapper";
import { NODE_COLORS } from "../../../utils/NodeColors";
import { useEditorStore } from "../../../store/editorStore";
import Connector from "../Connector";

type OperatorNodeProps = NodeProps & {

}

function OperatorNode({ id }: OperatorNodeProps) {
  const nodeData = useEditorStore((state) => state.nodes[id].data) as NodeDataTypesMap["OPERATOR_NODE"];

  let operatorSign = "";
  let fontFamily = "Fira Code, sans-serif";

  switch (nodeData.operation) {
    case "lessThan":
      operatorSign = "<";
      break;
    case "greaterThan":
      operatorSign = ">";
      break;
    case "equal":
      operatorSign = "==";
      fontFamily = "Fira Mono, sans-serif";
      break;
  }

  return (
    <MinimalNodeWrapper 
      className="node__operator"
      color={NODE_COLORS.NODE_OPERATOR}
      nodeId={id} 
    >
      <div className="operator-inputs">
        <Connector 
          type="data"
          direction="input"
          name="A"
          description="A"
        />
        <Connector 
          type="data"
          direction="input" 
          name="B"
          description="B"
        />
      </div>
      <span className="operator-icon" style={{ fontFamily }}>
        {operatorSign}
      </span>
      <div className="operator-outputs">
        <Connector 
          type="data"
          direction="output"
          name="C"
          description="->"          
        />
      </div>
    </MinimalNodeWrapper>
  );
}

export default memo(OperatorNode);