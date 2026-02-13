import type { ConnectionData } from "../../types/EditorTypes";
import { smoothConnection } from "../../utils/Connections";

type ConnectionProps = {
  data: ConnectionData
}

export default function Connection({ data }: ConnectionProps) {
  const connectionPath = smoothConnection(
    data.inputConnector.pos,
    data.outputConnector.pos
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