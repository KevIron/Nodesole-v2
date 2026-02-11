import DataConnector from "../../assets/data_connector.svg?react"
import FlowConnector from "../../assets/flow_connector.svg?react"

type ConnectorProps = {
  type: "data" | "flow",
  direction: "input" | "output",
  name: string
}

export default function Connector({ type, direction, name }: ConnectorProps) {
  // const { isDragging, handlers } = useDrag<SVGSVGElement>();

  const connectorStyle: React.CSSProperties = {
    
  }

  return (
    <>
      {type === "data" ? (
        <DataConnector 
          data-connector-name={name}
          data-connector-direction={direction}

          className="connector"
          style={connectorStyle}
        />
      ) : ( 
        <FlowConnector 
          data-connector-name={name}
          data-connector-direction={direction}
          
          className="connector"
          style={connectorStyle}
        /> 
      )} 
    </>
  );
}