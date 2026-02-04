import Viewport from "./components/Viewport";

import "./styles/index.css";
import "./styles/editor.css";
import "./styles/viewport.css";

export default function App() {
  return (
    <div id="editor">
      <nav id="action-bar">
        <button>Start</button>
        <button>Stop</button>
        <button>Restart</button>
      </nav>
      <main id="main-panel">
        <Viewport />
      </main>
      <aside id="side-panel"></aside>
    </div>
  );
}