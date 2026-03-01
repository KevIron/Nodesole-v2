import { memo } from "react";
import { useEditorStore } from "../../../store/editorStore";
import { NODE_COLORS } from "../../../utils/NodeColors";

import Connector from "../Connector";
import Input from "../nodeUtils/Input";
import Select from "../nodeUtils/Select";
import RegularNodeWrapper from "../nodeWrappers/RegularNodeWrapper";

import type { NodeDataTypesMap, NodeProps } from "../../../types/EditorTypes";

function ConstantEmitterNode({ id }: NodeProps) {
  const nodeData = useEditorStore((state) => state.nodes[id].data) as NodeDataTypesMap["CONSTANT_EMITTER_NODE"];
  const updateNodeData = useEditorStore((state) => state.updateNodeData);
  
  function handleTypeSelect(e: { newValue: string }) {
    updateNodeData(id, (prev) => ({
      ...prev,
      type: e.newValue,
      value: e.newValue === "boolean" ? "true" : ""
    }));
  }

  function handleValueInput(value: string) {
    updateNodeData(id, (prev) => ({
      ...prev,
      value: value
    }));
  }

  const valueInput = nodeData.type !== "boolean" ? (
    <Input 
      value={nodeData.value}
      onChange={(e) => handleValueInput(e.target.value)}
    />
  ) : (
    <Select 
      options={[
        "true",
        "false"
      ]}
      selectedItem={nodeData.value}
      onChange={(e) => handleValueInput(e.newValue)}
    />
  );

  return (
    <RegularNodeWrapper 
      className="node__constant-emitter"
      title="Constant Emitter" 
      color={NODE_COLORS.NODE_DATA} 
      nodeId={id}
    >
      <Select 
        onChange={handleTypeSelect}
        selectedItem={nodeData.type}
        options={[ 
          "string",
          "boolean",
          "number",
        ]}  
      />
      {valueInput}
      <Connector 
        type="data"
        direction="output"
        name=""
      />
    </RegularNodeWrapper>
  );
}

export default memo(ConstantEmitterNode);