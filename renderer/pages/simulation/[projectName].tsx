import {Canvas} from "@react-three/fiber";
import React, {useEffect} from "react";
import Shape from "../../components/Shape";
import OrbitControls from "../../components/OrbitControls";
import Sidebar from "../../components/Sidebar";
import {ShapeProps} from "../../utils/types";
import Head from "next/head";
import {useRouter} from "next/router";

const Store = require("electron-store");
const store = new Store();

export default function Simulation() {
  const router = useRouter();

  const [projectName, setProjectName] = React.useState<string>(null);

  const [shapes, setShapes] = React.useState<ShapeProps[]>([]);

  const [count, setCount] = React.useState(0);

  useEffect(() => {
    readProject();
  }, []);

  useEffect(() => {
    saveProject();
  }, [shapes]);

  useEffect(() => {
    if (router.isReady) {
      setProjectName(router.query.projectName as string);
    }
  }, [router.isReady])

  useEffect(() => {
    readProject();
  }, [projectName])

  function readProject() {
    if (!projectName) return;
    const storage = store.get(projectName);
    if (storage) {
      setShapes(storage);
      setCount(storage.length);
    }
  }

  function saveProject() {
    let projects = store.get("projects");
    console.log(projects);
    if (!projectName) return;
    if (!shapes) return;

    if (!projects) {
      store.set("projects", [])
    }

    store.set(projectName, shapes);

    for (let i = 0; i < projects.length; i++) {
      if (projects[i][0] === projectName) {
        const date = new Date();
        projects[i][1] = date.toLocaleDateString() + " " + date.toLocaleTimeString();
        store.set("projects", projects);
        return;
      }
    }

    const date = new Date();
    projects.push([projectName, date.toLocaleDateString() + " " + date.toLocaleTimeString()]);
    store.set("projects", projects);
  }

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
        <title>{projectName} - PhiColli</title>
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
        className={"z-0 dark:brightness-75 transition-colors"}
      >
        <ambientLight color={"white"} intensity={0.2}/>
        <pointLight position={[1, 10, -1]} castShadow={true}/>
        {
          shapes.length > 0 &&
          shapes.map((shape, index) => (
            <Shape key={index} {...shape} />
          ))
        }
        <OrbitControls/>
        <gridHelper args={[100, 100]}/>
      </Canvas>
    </React.Fragment>
  );
}