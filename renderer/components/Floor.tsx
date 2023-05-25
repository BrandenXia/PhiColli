import {usePlane} from "@react-three/cannon";
import {Mesh} from "three";

export default function Floor() {
  const [ref] = usePlane<Mesh>(() => ({type: "Static", rotation: [-Math.PI / 2, 0, 0], position: [0, 0, 0]}));
  return (
    <mesh ref={ref} receiveShadow={true}>
      <planeGeometry attach="geometry" args={[100, 100]}/>
      <meshStandardMaterial attach="material" color="white"/>
    </mesh>
  )
}