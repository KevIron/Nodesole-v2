import { useEditorStore } from "../../store/editorStore";
import NodeRenderer from "../nodes/NodeRenderer";
import { memo } from "react";

function NodesContainer() {
  const nodeIds = useEditorStore((state) => state.nodeIds);
  
  return (
    <>
      {nodeIds.map(id => (
        <NodeRenderer key={id} id={id} />
      ))}
    </>
  )
};

export default memo(NodesContainer);
