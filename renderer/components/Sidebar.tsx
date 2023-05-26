import style from "../styles/sidebar.module.css";
import {Icon} from "@iconify/react";
import React from "react";
import ShapeProps from "../utils/types";
import ShapeConfig from "./ShapeConfig";
import randomName from "../utils/randomName";

interface SidebarProps {
  shapes: ShapeProps[];
  setShapes: React.Dispatch<React.SetStateAction<ShapeProps[]>>;
}

export default function Sidebar(props: SidebarProps) {
  const [configOpen, setConfigOpen] = React.useState<boolean>(false);

  function newShape() {
    props.setShapes([...props.shapes, {
      id: randomName(),
      shape: "box",
      color: 0x000000,
      velocity: [0, 0, 0],
      shapeState: {
        position: [0, 1, 0],
        mass: 1,
        rotation: [0, 0, 0],
      }
    }])
  }

  function deleteShape(index: number) {
    let newShapes = props.shapes;
    newShapes.splice(index, 1);
    props.setShapes([...newShapes]);
  }

  function changeShape(index: number, shape: ShapeProps) {
    let newShapes = props.shapes;
    newShapes[index] = shape;
    props.setShapes([...newShapes]);
  }

  return (
    <div
      className={"w-full sm:w-12 h-12 sm:rounded-br-xl fixed bottom-0 sm:top-16 drop-shadow-lg z-40 bg-white/30 dark:bg-zinc-800/70 " +
        "backdrop-blur-xl dark:backdrop-blur-2xl transition-all overflow-hidden select-none whitespace-nowrap " +
        (configOpen ? "sm:w-1/5 h-64 overflow-y-auto " + style.sidebar : "")}
    >
      <div
        className="z-30 flex justify-between text-right mb-3 sticky top-0 bg-slate-100 dark:bg-zinc-800 p-2 drop-shadow-sm dark:border-b dark:border-b-zinc-500"
      >
          <span className="mr-3" onClick={() => setConfigOpen(!configOpen)}>
            <Icon icon="icon-park-outline:setting-config" height={31} width={31}
                  className={"text-zinc-700 dark:text-slate-300 transition-transform " + (configOpen ? "rotate-180" : "")}/>
          </span>
        <button
          className="group bg-sky-400 dark:bg-blue-500 hover:bg-sky-500 dark:hover:bg-blue-600 active:bg-sky-600 dark:active:bg-blue-700 pl-1 pr-2.5 sm:pr-1 lg:pr-2.5 py-0.5 rounded-full block"
          onClick={() => newShape()}
        >
          <Icon icon="material-symbols:add-rounded" height={23} width={23}
                className="text-slate-50 inline group-hover:rotate-90 group-hover:scale-110 transition-transform"/>
          <span className="text-md text-slate-50 align-middle inline sm:hidden lg:inline">Add Object</span>
        </button>
      </div>
      <div>
        {
          props.shapes.length > 0 && props.shapes.map((shape, index) => {
            return (
              <ShapeConfig
                key={index}
                index={index}
                shape={shape}
                setShape={(shape: ShapeProps) => changeShape(index, shape)}
                deleteShape={() => deleteShape(index)}
              />
            )
          })
        }
        {
          props.shapes.length === 0 &&
          <div className="text-center text-gray-500 dark:text-slate-300">
            <span className="text-lg md:text-xl lg:text-2xl">No objects</span>
          </div>
        }
      </div>
    </div>
  )
}