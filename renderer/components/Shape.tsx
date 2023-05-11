import React from "react";
import { ShapeProps } from "../utils/types";


export default function Shape(props: ShapeProps) {
  return (
      <mesh position={props.position} receiveShadow={true} castShadow={true}>
        <primitive object={props.shape} attach={"geometry"} />
        <meshPhysicalMaterial color={props.color} reflectivity={0.5}/>
      </mesh>
  )
}