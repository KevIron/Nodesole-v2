import Viewport from "./components/viewport/Viewport";
import AnimationLoopProvider from "./components/AnimationLoopProvider";

import "./styles/index.css";
import "./styles/editor.css";
import "./styles/viewport.css";
import "./styles/nodes.css";

export default function App() {
  return (
    <div id="editor">
      <nav id="action-bar">
        <button>Start</button>
        <button>Stop</button>
        <button>Restart</button>
      </nav>
      <main id="main-panel">
        <AnimationLoopProvider>
          <Viewport />
        </AnimationLoopProvider>
      </main>
      <aside id="side-panel"></aside>
    </div>
  );
}