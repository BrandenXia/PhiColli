import ShapeProps from "../utils/types";
import {Icon} from "@iconify/react";

interface ShapeConfigProps {
  index: number;
  shape: ShapeProps;
  setShape: (shape: ShapeProps) => void;
  deleteShape: () => void;
}

export default function ShapeConfig(props: ShapeConfigProps) {
  return (
    <div
      className="rounded-xl bg-slate-100 dark:bg-zinc-500 mx-3 my-3 px-2 py-1 drop-shadow-sm dark:drop-shadow-lg"
    >
      <div className="flex justify-between">
        <h3
          className="text-zinc-700 dark:text-slate-300 text-md before:content-[''] before:h-1 before:w-1 before:bg-sky-400 before:rounded-full before:inline-block before:mr-2 before:mt-1 before:ml-1 before:mb-0.5 w-8/12 overflow-hidden"
        >
          {props.shape.shape} {props.shape.id}
        </h3>
        <button onClick={() => props.deleteShape()}>
          <Icon icon="octicon:trash-24" height={16} width={16}/>
        </button>
      </div>
      <div className="flex justify-between">
      </div>
    </div>
  )
}