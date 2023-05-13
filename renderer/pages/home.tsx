import { Canvas } from "@react-three/fiber";
import React from "react";
import Floor from "../components/Floor";
import Shape from "../components/Shape";
import OrbitControls from "../components/OrbitControls";
import Sidebar from "../components/Sidebar";
import { ShapeProps } from "../utils/types";
import Head from "next/head";


export default function Home() {
  const [shapes, setShapes] = React.useState<ShapeProps[]>([]);

  let count: number = 0;

  function createShape() {
    setShapes([...shapes, new ShapeProps(count)]);
    count++;
  }

  function deleteShape(index: number) {
    let newShapes = [...shapes];
    newShapes.splice(index, 1);
    setShapes(newShapes);
  }

  function setShape(index: number, shape: ShapeProps) {
    let newShapes = [...shapes];
    newShapes[index] = shape;
    setShapes(newShapes);
  }
  return (
    <React.Fragment>
      <Head>
        <title>Physical Simulation App</title>
      </Head>
      <Sidebar
        shapes={shapes}
        createShape={createShape}
        setShape={setShape}
        deleteShape={deleteShape}
      />
      <Canvas
        shadows={true}
        camera={{
          position: [-6, 7, 7],
        }}
        className="z-0 dark:brightness-75 transition-colors h-full"
      >
        <ambientLight color={"white"} intensity={0.2} />
        <pointLight position={[1, 10, -1]} castShadow={true} />
        {
          shapes.length > 0 &&
          shapes.map((shape, index) => (
            <Shape key={index} {...shape} />
          ))
        }
        <OrbitControls />
        <Floor position={[0, -1, 0]} />
      </Canvas>
    </React.Fragment>
  );
}