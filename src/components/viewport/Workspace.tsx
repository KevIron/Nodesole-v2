import EntryNode from "../nodes/EntryNode";

type WorkspaceProps = {
  workspaceRef: React.RefObject<HTMLDivElement | null>
}

export default function Workspace({ workspaceRef }: WorkspaceProps) {
  return (
    <div className="viewport-workspace" ref={workspaceRef}>
      <div className="nodes-container">
        <EntryNode />
      </div>
      <div className="connections-container"></div>
    </div>
  )
}