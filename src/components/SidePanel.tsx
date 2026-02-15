import { useEditorStore } from "../store/editorStore";
import Vec2 from "../utils/Vec2";

export default function SidePanel() {
  const addNode = useEditorStore((state) => state.addNode);
  const connections = useEditorStore((state) => state);

  function handleAddEntryNode() {
    addNode({
      id: crypto.randomUUID(),
      type: "ENTRY_NODE",
      data: {
        pos: new Vec2(0, 0)
      }
    });
  }

  function handleAddEndNode() {
    addNode({
      id: crypto.randomUUID(),
      type: "END_NODE",
      data: {
        pos: new Vec2(0, 0)
      }
    });
  }

  return (
    <aside id="side-panel">
      <h2>Development options:</h2>
      <button onClick={handleAddEndNode}>Add end node</button>
      <button onClick={handleAddEntryNode}>Add entry node</button>

      <textarea value={JSON.stringify(connections)} readOnly>

      </textarea>
    </aside>
  );
}