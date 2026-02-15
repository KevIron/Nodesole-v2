import Vec2 from "./Vec2";

export type Dimensions = {
  width: number,
  height: number
}

export function getElementDimensions(element: HTMLElement) {
  const rect = element.getBoundingClientRect();

  return {
    width: rect.width,
    height: rect.height
  };
}

export function getElementCenter(element: HTMLElement | SVGElement) {
  const elementRect = element.getBoundingClientRect();
  const elementPos = new Vec2(elementRect.x, elementRect.y);
  const elementCenter = elementPos.add(new Vec2(
    elementRect.width / 2,
    elementRect.height / 2
  ));

  return elementCenter;
}