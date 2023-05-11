import React from "react";

export default function Floor(props) {
    return (
        <mesh {...props} receiveShadow={true}>
          <boxBufferGeometry args={[20,1,20]} />
          <meshPhysicalMaterial color='white' />
        </mesh>
    )
}