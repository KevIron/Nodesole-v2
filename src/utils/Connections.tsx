import { clamp } from "./Math";
import Vec2 from "./Vec2";

export type ConnectionOptions = {
  reversed?: boolean
}

export function smoothConnection(pos1: Vec2, pos2: Vec2, { reversed = false }: ConnectionOptions = {}) {
  if (reversed) {
    const temp = pos2;
    pos2 = pos1;
    pos1 = temp;
  }

  const connectionLength = pos2.absoluteDistance(pos1);
  let cntOffset = connectionLength.x / 2;

  if (pos2.x < pos1.x + (connectionLength.y < 120 ? 60 : 120) && connectionLength.y > 20) {
    cntOffset = clamp(180, 600, cntOffset);
  }

  const cnt1 = new Vec2(
    pos1.x + cntOffset,
    pos1.y
  );
  const cnt2 = new Vec2(
    pos2.x - cntOffset,
    pos2.y
  );
  
  return `
    M ${pos1.x} ${pos1.y}
    C ${cnt1.x} ${cnt1.y}, 
    ${cnt2.x} ${cnt2.y}, 
    ${pos2.x} ${pos2.y}
  `;
}