import { useEditorStore } from "../store/editorStore";
import type { NodeData, NodeTypes } from "../types/EditorTypes";
import Vec2 from "../utils/Vec2";

export default function SidePanel() {
  const addNode = useEditorStore((state) => state.addNode);

  function handleAddNode<T extends NodeTypes>(data: NodeData<T>) {
    addNode(data);
  }

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
      </div>
    </aside>
  );
}