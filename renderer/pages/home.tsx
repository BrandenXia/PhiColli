import { Canvas } from "@react-three/fiber";
import React from "react";
import Floor from "../components/Floor";
import Shape from "../components/Shape";
import OrbitControls from "../components/OrbitControls";
import {Icon} from "@iconify/react";
import { ShapeProps } from "../utils/types";
import ShapeConfig from "../components/ShapeConfig";
import config from "tailwindcss/defaultConfig";


export default function Home() {
  const [configOpen, setConfigOpen] = React.useState<boolean>(false);
  const [shape, setShape] = React.useState<ShapeProps>(new ShapeProps(0));

  return (
    <React.Fragment>
      <div
        className={"w-12 h-12 rounded-br-xl fixed top-16 drop-shadow-lg z-40 bg-white/30 dark:bg-zinc-800/70 " +
          "backdrop-blur-xl dark:backdrop-blur-2xl transition-all overflow-hidden whitespace-nowrap p-2 " + (configOpen ? "w-1/5 h-full" : "")}
      >
        <div className="flex justify-between text-right mb-2.5">
          <span className="mr-3" onClick={() => setConfigOpen(!configOpen)}>
            <Icon icon="icon-park-outline:setting-config" height={31} width={31} className={"text-zinc-700 dark:text-slate-300 transition-transform " + (configOpen ? "rotate-180" : "")}/>
          </span>
          <button className="group bg-sky-400 dark:bg-blue-500 hover:bg-sky-500 dark:hover:bg-blue-600 active:bg-sky-600 dark:active:bg-blue-700 pl-0.5 pr-2.5 py-0.5 rounded-full block">
            <Icon icon="material-symbols:add-rounded" height={23} width={23} className="text-slate-50 inline group-hover:rotate-90 group-hover:scale-110 transition-transform"/>
            <span className="text-md text-slate-50 align-middle">Add Object</span>
          </button>
        </div>
        <ShapeConfig props={shape} setProps={setShape}/>
      </div>
      <Canvas
        shadows={true}
        camera={{
          position: [-6, 7, 7],
        }}
        className="z-0 dark:brightness-75 transition-colors h-full"
      >
        <ambientLight color={"white"} intensity={0.2} />
        <pointLight position={[1, 9, -1]} castShadow={true} />
        <Shape {...shape}/>
        <OrbitControls />
        <Floor position={[0, -1, 0]} />
      </Canvas>
    </React.Fragment>
  );
}