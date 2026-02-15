import { memo, useRef } from "react"
import { useEditorStore } from "../../store/editorStore"

import DataConnector from "../../assets/icons/data_connector.svg?react"
import FlowConnector from "../../assets/icons/flow_connector.svg?react"

import useDrag from "../../hooks/useDrag"
import useNodeContext from "../../hooks/useNodeContext"
import useViewportContext from "../../hooks/useViewportContext"

import Vec2 from "../../utils/Vec2"

type ConnectorProps = {
  type: "data" | "flow",
  direction: "input" | "output",
  name: string
  description?: string
}

function Connector({ type, direction, name, description }: ConnectorProps) {
  const drawnConnectionIdRef = useRef<string | null>(null);
  const connectorRef = useRef<SVGSVGElement | null>(null);

  const { id: nodeId } = useNodeContext();
  const { convertToViewportPos } = useViewportContext();

  const addConnection = useEditorStore((state) => state.addConnection);
  const updateConnection = useEditorStore((state) => state.updateConnection);

  const { handlers } = useDrag<HTMLDivElement>({ 
    onClick: handleConnectorClick,
    onMove: handleConnectorDrag,
    onRelease: handleConnectorRelease
  });

  function handleConnectorClick() {
    if (!connectorRef.current) return;

    const connectionId = crypto.randomUUID();
    
    const connectorRect = connectorRef.current.getBoundingClientRect();
    const connectorPos = new Vec2(connectorRect.x, connectorRect.y);
    const connectorCenter = convertToViewportPos(connectorPos.add(new Vec2(
      connectorRect.width / 2,
      connectorRect.height / 2
    )), useEditorStore.getState().viewportParams);

    const connectors = [
      {
        nodeId: nodeId,
        name: name,
        pos: connectorCenter
      },
      {
        nodeId: null,
        name: null,
        pos: connectorCenter
      },
    ]

    if (direction === "input") connectors.reverse();

    console.log(connectors);
    
    addConnection({
      id: connectionId,
      isVisible: true,
      inputConnector: connectors[0],
      outputConnector: connectors[1]
    });

    drawnConnectionIdRef.current = connectionId;
  }

  function handleConnectorDrag(e: MouseEvent) {
    if (!drawnConnectionIdRef.current) return;

    const currentPos = new Vec2(e.clientX, e.clientY);
    const currentViewportPos = convertToViewportPos(currentPos, useEditorStore.getState().viewportParams);

    updateConnection(drawnConnectionIdRef.current, (prev) => ({
      ...prev,
      [direction === "input" ? "inputConnector" : "outputConnector"]: {
        ...prev.outputConnector,
        pos: currentViewportPos
      }
    }));
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
          ref={connectorRef}
        />
      ) : ( 
        <FlowConnector 
          {...connectorProps}
          style={connectorStyle}
          ref={connectorRef}
        /> 
      )} 
      {direction === "input" && <span>{description}</span> }
    </div>
  );
}

export default memo(Connector);