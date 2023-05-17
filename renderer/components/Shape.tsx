import React from "react";
import {ShapeProps} from "../utils/types";
import {BoxGeometry, BufferGeometry, CylinderGeometry, SphereGeometry, TorusGeometry} from "three";


export default function Shape(props: ShapeProps) {
  let shape: BufferGeometry = new BoxGeometry(1, 1, 1);
  switch (props.shape) {
    case "cube":
      break;
    case "sphere":
      shape = new SphereGeometry(1, 32, 32)
      break;
    case "cylinder":
      shape = new CylinderGeometry(1, 1, 1, 32)
      break;
    case "cone":
      shape = new CylinderGeometry(1, 0, 1, 32)
      break;
    case "torus":
      shape = new TorusGeometry(1, 0.4, 32, 100)
  }


  return (
    <mesh
      position={props.position}
      receiveShadow={true}
      castShadow={true}

    >
      <primitive object={shape} attach={"geometry"}/>
      <meshPhysicalMaterial color={props.color} reflectivity={0.5}/>
    </mesh>
  )
}