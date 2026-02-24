// import { useEffect } from "react";
import { useEditorStore } from "../store/editorStore";
import Vec2 from "../utils/Vec2";

export default function SidePanel() {
  const addNode = useEditorStore((state) => state.addNode);
  
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

  // useEffect(() => {
  //   for (let i = 0; i < 5000; ++i) handleAddEndNode();
  // });

  return (
    <aside id="side-panel">
      <h2>Development options:</h2>
      <button onClick={handleAddEndNode}>Add end node</button>
      <button onClick={handleAddEntryNode}>Add entry node</button>
    </aside>
  );
}