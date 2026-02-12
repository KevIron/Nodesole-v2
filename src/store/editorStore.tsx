import { create } from "zustand";

export const editorStore = create<{
  nodes: Array<Node>
}>((set) => ({
  nodes: []
}));