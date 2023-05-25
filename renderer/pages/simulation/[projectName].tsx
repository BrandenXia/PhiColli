import {Canvas} from "@react-three/fiber";
import React, {useEffect} from "react";
import OrbitControls from "../../components/OrbitControls";
import Sidebar from "../../components/Sidebar";
import Head from "next/head";
import {useRouter} from "next/router";
import {Physics} from "@react-three/cannon";
import Floor from "../../components/Floor";
import Shape from "../../components/Shape";
import ShapeProps from "../../utils/types";

const Store = require("electron-store");
const store = new Store();

export default function Simulation() {
  const router = useRouter();

  const [projectName, setProjectName] = React.useState<string>(null);

  const [shapes, setShapes] = React.useState<ShapeProps[]>([]);

  useEffect(() => {
    console.log("Reading project")
    readProject();
  }, []);

  useEffect(() => {
    console.log("Saving project")
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
    }
  }

  function saveProject() {
    let projects = store.get("projects");
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

  return (
    <React.Fragment>
      <Head>
        <title>{projectName} - PhiColli</title>
      </Head>
      <Sidebar
        shapes={shapes}
        setShapes={setShapes}
      />
      <Canvas
        shadows={true}
        camera={{
          position: [0, 10, 10],
        }}
        className={"z-0 dark:brightness-75 transition-colors"}
      >
        <Physics gravity={[0, -9.8, 0]} allowSleep={true}>
          <ambientLight color={"white"} intensity={0.2}/>
          <pointLight position={[1, 10, -1]} castShadow={true} intensity={5}/>
          <OrbitControls/>
          <gridHelper args={[100, 100]}/>
          <axesHelper args={[100]}/>
          <Floor/>
          {
            shapes.length > 0 && shapes.map((shape, index) => {
              return (
                <Shape id={shape.id} key={index} shape={shape.shape} color={shape.color} velocity={shape.velocity} shapeState={shape.shapeState}/>
              )
            })
          }
        </Physics>
      </Canvas>
    </React.Fragment>
  );
}