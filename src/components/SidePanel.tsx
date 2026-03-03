import { useEffect, useState } from "react";
import { useEditorStore } from "../store/editorStore";
import type { NodeData, NodeDataTypesMap, NodeTypes } from "../types/EditorTypes";
import Vec2 from "../utils/Vec2";

export default function SidePanel() {
  const addNode = useEditorStore((state) => state.addNode);
  const removeNode = useEditorStore((state) => state.removeNode);
  const [operatorOperation, setOperatorOperation] = useState<NodeDataTypesMap["OPERATOR_NODE"]["operation"]>("equal");

  function handleAddNode<T extends NodeTypes>(data: NodeData<T>) {
    addNode(data);
  }

  // useEffect(() => {
  //   for (let i = 0; i < 5000; ++i) handleAddEndNode();
  // });

  useEffect(() => {
    const id = crypto.randomUUID();

    addNode({
      id: id,
      type: "ENTRY_NODE",
      data: {
        pos: new Vec2(0, 0)
      }
    }) 

    return () => {
      removeNode(id);
    }
  })

  return (
    <aside id="side-panel">
      <h2>Development options:</h2>
      <div className="dev-menu">
        <button onClick={() => handleAddNode({
          id: crypto.randomUUID(),
          type: "ENTRY_NODE",
          data: {
            pos: new Vec2(0, 0)
          }
        })}>
          Add end node
        </button>
        <button onClick={() => handleAddNode({
          id: crypto.randomUUID(),
          type: "END_NODE",
          data: {
            pos: new Vec2(0, 0)
          }
        })}>
          Add entry node
        </button>
        <button onClick={() => handleAddNode({
          id: crypto.randomUUID(),
          type: "CONDITION_NODE",
          data: {
            pos: new Vec2(0, 0)
          }
        })}>
          Add condition node
        </button>
        <button onClick={() => handleAddNode({
          id: crypto.randomUUID(),
          type: "CONSTANT_EMITTER_NODE",
          data: {
            pos: new Vec2(0, 0),
            type: "string", 
            value: ""
          }
        })}>
          Add emitter node
        </button>
        <div className="operator-addition">
          <button onClick={() => handleAddNode({
            id: crypto.randomUUID(),
            type: "OPERATOR_NODE",
            data: {
              pos: new Vec2(0, 0),
              operation: operatorOperation
            }
          })}>
            Add operator node
          </button>
          <select onChange={(e) => setOperatorOperation(e.target.value as NodeDataTypesMap["OPERATOR_NODE"]["operation"])} value={operatorOperation}>
            <option value="equal">EQ</option>
            <option value="greaterThan">GT</option>
            <option value="lessThan">LT</option>
          </select>
        </div>
      </div>
    </aside>
  );
}