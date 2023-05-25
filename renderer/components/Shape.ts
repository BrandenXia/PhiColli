import ShapeProps from "../utils/types";
import Box from "./Box";
import Sphere from "./Sphere";
import Cylinder from "./Cylinder";

export default function Shape(props: ShapeProps) {
  if (props.shape === "box") {
    return Box(props);
  } else if (props.shape === "sphere") {
    return Sphere(props);
  } else if (props.shape === "cylinder") {
    return Cylinder(props);
  } else {
    return null;
  }
}