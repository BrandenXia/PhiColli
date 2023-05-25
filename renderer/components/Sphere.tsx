import ShapeProps from "../utils/types";
import {Mesh} from "three";
import {useSphere} from "@react-three/cannon";

export default function Sphere(props: ShapeProps) {
  const [ref, api] = useSphere<Mesh>(() => ({ ...props.shapeState }));

  return (
    <mesh ref={ref} castShadow={true} receiveShadow={true}>
      <sphereGeometry/>
      <meshStandardMaterial color={props.color}/>
    </mesh>
  )
}