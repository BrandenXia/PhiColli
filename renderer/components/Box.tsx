import ShapeProps from "../utils/types";
import {useBox} from "@react-three/cannon";
import {Mesh} from "three";

export default function Box(props: ShapeProps) {
  const [ref, api] = useBox<Mesh>(() => ({ ...props.shapeState }));

  return (
    <mesh ref={ref} castShadow={true} receiveShadow={true}>
      <boxGeometry/>
      <meshStandardMaterial color={props.color}/>
    </mesh>
  )
}