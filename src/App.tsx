import Viewport from "./components/viewport/Viewport";

import "./styles/index.css";
import "./styles/editor.css";
import "./styles/viewport.css";
import "./styles/nodes.css";

import ActionBar from "./components/ActonBar";
import SidePanel from "./components/SidePanel";

export default function App() {
  return (
    <div id="editor">
      <ActionBar />
      <main id="main-panel">
          <Viewport />
      </main>
      <SidePanel />
    </div>
  );
}