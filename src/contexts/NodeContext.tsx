import { createContext } from "react";

export type NodeContext = {
    id: string
}

export const NodeContext = createContext<NodeContext>({
    id: ""
});