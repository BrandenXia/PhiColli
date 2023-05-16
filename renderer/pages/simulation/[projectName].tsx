import { Canvas } from "@react-three/fiber";
import React, {useEffect} from "react";
import Floor from "../../components/Floor";
import Shape from "../../components/Shape";
import OrbitControls from "../../components/OrbitControls";
import Sidebar from "../../components/Sidebar";
import { ShapeProps } from "../../utils/types";
import Head from "next/head";
import { useRouter } from "next/router";

const Store = require("electron-store");
const store = new Store();

export default function Simulation() {
  const { projectName } = useRouter().query;

  const [shapes, setShapes] = React.useState<ShapeProps[]>([]);

  const [count, setCount] = React.useState(0);

  useEffect(() => {
    if (projectName === undefined) return;
    setShapes(store.get(projectName));
  }, []);

  useEffect(() => {
    if (projectName === undefined) return;
    if (store.get("projects") === undefined) store.set("projects", []);
    store.set("projects", [...store.get("projects"), projectName]);
    store.set(projectName, shapes);
  }, [shapes]);

  function createShape() {
    setShapes([...shapes, new ShapeProps(count)]);
    setCount(count + 1);
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