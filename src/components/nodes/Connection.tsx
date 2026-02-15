import { memo } from "react";
import { smoothConnection } from "../../utils/Connections";
import { useEditorStore } from "../../store/editorStore";

type ConnectionProps = {
  id: string
}

function Connection({ id }: ConnectionProps) {
  const data = useEditorStore((state) => state.connections[id]);
  const connectionPath = smoothConnection(
    data.sourceConnector.pos,
    data.targetConnector.pos,
  );

  const connectionStyle = {
    stroke: "white",
    strokeWidth: "2",
    fill: "transparent",
    visibility: data.isVisible ? "visible" : "hidden"
  } as React.CSSProperties

  return (
    <path 
      d={connectionPath} 
      style={connectionStyle}
    />
  );
}

export default memo(Connection);