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

  const connectionLenght = pos2.absoluteDistance(pos1);

  const cnt1 = new Vec2(
    pos1.x + (connectionLenght.x / 2),
    pos1.y
  );
  const cnt2 = new Vec2(
    pos2.x - (connectionLenght.x / 2),
    pos2.y
  );
  
  return `
    M ${pos1.x} ${pos1.y}
    C ${cnt1.x} ${cnt1.y}, 
    ${cnt2.x} ${cnt2.y}, 
    ${pos2.x} ${pos2.y}
  `;
}