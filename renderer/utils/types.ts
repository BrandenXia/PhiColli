interface ShapeProps {
  id: string,
  shape: string | "box" | "sphere" | "cylinder",
  color: number,
  velocity: [number, number, number],
  shapeState: ShapeState;
}

interface ShapeState {
  position: [number, number, number],
  rotation: [number, number, number],
  mass: number
}

export default ShapeProps;