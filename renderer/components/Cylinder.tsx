import ShapeProps from "../utils/types";
import {useCylinder} from "@react-three/cannon";
import {Mesh} from "three";

export default function Cylinder(props: ShapeProps) {
  const [ref, api] = useCylinder<Mesh>(() => ({...props.shapeState}));

  return (
    <mesh ref={ref} castShadow={true} receiveShadow={true}>
      <cylinderGeometry/>
      <meshStandardMaterial color={props.color}/>
    </mesh>
  )
}