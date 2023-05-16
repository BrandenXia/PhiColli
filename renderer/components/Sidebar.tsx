import {ShapeProps} from "../utils/types";
import style from "../styles/home.module.css";
import {Icon} from "@iconify/react";
import ShapeConfig from "./ShapeConfig";
import React from "react";

interface SidebarProps {
  shapes: ShapeProps[],
  createShape: () => void,
  setShape: (index: number, prop: ShapeProps) => void,
  deleteShape: (index: number) => void
}

export default function Sidebar(props: SidebarProps) {
  const [configOpen, setConfigOpen] = React.useState<boolean>(false);
  return (
    <div
        className={"w-full sm:w-12 h-12 rounded-br-xl fixed bottom-0 sm:top-16 drop-shadow-lg z-40 bg-white/30 dark:bg-zinc-800/70 " +
          "backdrop-blur-xl dark:backdrop-blur-2xl transition-all overflow-hidden select-none whitespace-nowrap " +
          (configOpen ? "sm:w-1/5 h-64 overflow-y-auto " + style.sidebar : "")}
      >
        <div className="flex justify-between text-right mb-3 sticky top-0 bg-slate-100 dark:bg-zinc-800/70 backdrop-blur-2xl p-2">
          <span className="mr-3" onClick={() => setConfigOpen(!configOpen)}>
            <Icon icon="icon-park-outline:setting-config" height={31} width={31} className={"text-zinc-700 dark:text-slate-300 transition-transform " + (configOpen ? "rotate-180" : "")}/>
          </span>
          <button className="group bg-sky-400 dark:bg-blue-500 hover:bg-sky-500 dark:hover:bg-blue-600 active:bg-sky-600 dark:active:bg-blue-700 pl-1 pr-2.5 sm:pr-1 lg:pr-2.5 py-0.5 rounded-full block" onClick={() => props.createShape()}>
            <Icon icon="material-symbols:add-rounded" height={23} width={23} className="text-slate-50 inline group-hover:rotate-90 group-hover:scale-110 transition-transform"/>
            <span className="text-md text-slate-50 align-middle inline sm:hidden lg:inline">Add Object</span>
          </button>
        </div>
        <div className="divide-y-2 divide-gray-400/40">
          {
            props.shapes.length > 0 &&
            props.shapes.map((shape, index) => (
              <ShapeConfig
                key={index}
                props={shape}
                setProps={(prop) => props.setShape(index, prop)}
                deleteShape={() => props.deleteShape(index)}
              />
              ))
          }
          {
            props.shapes.length === 0 &&
            <div className="text-center text-gray-500 dark:text-zinc-700">
              <span className="text-lg md:text-xl lg:text-2xl">No objects</span>
            </div>
          }
        </div>
      </div>
  )
}