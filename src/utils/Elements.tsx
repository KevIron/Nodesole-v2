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