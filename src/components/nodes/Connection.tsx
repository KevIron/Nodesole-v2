import { memo } from "react";
import { smoothConnection } from "../../utils/Connections";
import type { ConnectionData } from "../../types/EditorTypes";

type ConnectionProps = {
  data: ConnectionData
}

function Connection({ data }: ConnectionProps) {
  const connectionPath = smoothConnection(
    data.inputConnector.pos,
    data.outputConnector.pos,
  );

  const connectionStyle = {
    stroke: "red",
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