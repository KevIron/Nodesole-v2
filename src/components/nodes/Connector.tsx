import DataConnector from "../../assets/icons/data_connector.svg?react"
import FlowConnector from "../../assets/icons/flow_connector.svg?react"

import useDrag from "../../hooks/useDrag"

type ConnectorProps = {
  type: "data" | "flow",
  direction: "input" | "output",
  name: string
  description?: string
}

export default function Connector({ type, direction, name, description }: ConnectorProps) {
  const { handlers } = useDrag<HTMLDivElement>({ 
    onClick: handleConnectorClick,
    onMove: handleConnectorDrag,
    onRelease: handleConnectorRelease
  });

  function handleConnectorClick(e: MouseEvent) {
    
  }

  function handleConnectorDrag(e: MouseEvent) {
  }

  function handleConnectorRelease(e: MouseEvent) {
  }

  const connectorProps = {
    "data-connector-name": name,
    "data-connector-direction": direction,
    "className": "connector"
  }

  const connectorStyle: React.CSSProperties = {
    
  }

  return (
    <div className="connector-wrapper" {...handlers}>
      {direction === "output" && <span>{description}</span>}
      {type === "data" ? (
        <DataConnector 
          {...connectorProps}
          style={connectorStyle}
        />
      ) : ( 
        <FlowConnector 
          {...connectorProps}
          style={connectorStyle}
        /> 
      )} 
      {direction === "input" && <span>{description}</span> }
    </div>
  );
}