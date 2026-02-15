import { memo, useRef } from "react"
import { useEditorStore } from "../../store/editorStore"

import DataConnector from "../../assets/icons/data_connector.svg?react"
import FlowConnector from "../../assets/icons/flow_connector.svg?react"

import useDrag from "../../hooks/useDrag"
import useNodeContext from "../../hooks/useNodeContext"
import useViewportContext from "../../hooks/useViewportContext"

import Vec2 from "../../utils/Vec2"
import { getElementCenter } from "../../utils/Elements"

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
  const removeConnection = useEditorStore((state) => state.removeConnection);

  const { handlers } = useDrag<HTMLDivElement>({ 
    onClick: handleConnectorClick,
    onMove: handleConnectorDrag,
    onRelease: handleConnectorRelease
  });

  function handleConnectorClick() {
    if (!connectorRef.current) return;

    const viewportParams = useEditorStore.getState().viewportParams;

    const connectionId = crypto.randomUUID();
    const connectorCenter = convertToViewportPos(getElementCenter(connectorRef.current), viewportParams)

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
    
    addConnection({
      id: connectionId,
      isVisible: true,
      sourceConnector: connectors[0],
      targetConnector: connectors[1]
    });

    drawnConnectionIdRef.current = connectionId;
  }

  function handleConnectorDrag(e: MouseEvent) {
    if (!drawnConnectionIdRef.current) return;

    const currentPos = new Vec2(e.clientX, e.clientY);
    const currentViewportPos = convertToViewportPos(currentPos, useEditorStore.getState().viewportParams);

    const connectorType = direction === "input" ? "sourceConnector" : "targetConnector";

    updateConnection(drawnConnectionIdRef.current, (prev) => ({
      ...prev,
      [connectorType]: {
        ...prev[connectorType],
        pos: currentViewportPos
      }
    }));
  }

  function handleConnectorRelease(e: MouseEvent) {
    if (!drawnConnectionIdRef.current) return;

    const target = e.target as HTMLElement;
    const connector = target.closest<HTMLElement>(".connector-wrapper");

    if (connector) {
      const viewportParams = useEditorStore.getState().viewportParams;
      const connectorSvg = connector.querySelector("svg")!;
      const connectorCenter = convertToViewportPos(getElementCenter(connectorSvg), viewportParams);

      const connectorType = direction === "input" ? "sourceConnector" : "targetConnector";

      updateConnection(drawnConnectionIdRef.current, (prev) => ({
        ...prev,
        [connectorType]: {
          nodeId: connector.dataset.nodeId,
          name: connector.dataset.connectorName,
          pos: connectorCenter
        }
      }));
    } else {
      removeConnection(drawnConnectionIdRef.current);
    }
  }

  const isConnected = useEditorStore((state) => {
    const inputNames = state.graph[nodeId].inputs.map(conn => state.connections[conn].targetConnector.name);
    const outputNames = state.graph[nodeId].outputs.map(conn => state.connections[conn].sourceConnector.name);

    const names = [...inputNames, ...outputNames];
    return names.includes(name);
  });

  const connectorProps = {
    "className": "connector-wrapper" ,
    "data-node-id": nodeId,
    "data-connector-name": name,
    "data-connector-direction": direction,
  }

  const connectorStyle: React.CSSProperties = {
    
  }

  return (
    <div 
      {...connectorProps}
      {...handlers}
    >
      {direction === "output" && <span>{description}</span>}
      {type === "data" ? (
        <DataConnector 
          className={`connector ${isConnected ? "connected" : ""}`}
          style={connectorStyle}
          ref={connectorRef}
        />
      ) : ( 
        <FlowConnector 
          className={`connector ${isConnected ? "connected" : ""}`}
          style={connectorStyle}
          ref={connectorRef}
        /> 
      )} 
      {direction === "input" && <span>{description}</span> }
    </div>
  );
}

export default memo(Connector);