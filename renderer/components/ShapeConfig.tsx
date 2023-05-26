import ShapeProps from "../utils/types";
import {Icon} from "@iconify/react";
import React from "react";

interface ShapeConfigProps {
  index: number;
  shape: ShapeProps;
  setShape: (shape: ShapeProps) => void;
  deleteShape: () => void;
}

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function ShapeConfig(props: ShapeConfigProps) {
  function setShape(event: React.ChangeEvent<HTMLInputElement>) {
    props.setShape({
      ...props.shape,
      [event.target.name]: event.target.value
    })
  }

  function setShapeShape(event: React.ChangeEvent<HTMLSelectElement>) {
    props.setShape({
      ...props.shape,
      shape: event.target.value
    })
  }

  function setShapeState(event: React.ChangeEvent<HTMLInputElement>) {
    props.setShape({
      ...props.shape,
      shapeState: {
        ...props.shape.shapeState,
        [event.target.name]: event.target.value
      }
    })
  }

  function setShapeVelocity(event: React.ChangeEvent<HTMLInputElement>) {
    const newVelocity = props.shape.velocity
    newVelocity[parseInt(event.target.name)] = Number(event.target.value);
    props.setShape({
      ...props.shape,
      velocity: newVelocity
    })
  }

  function setShapeStatePosition(event: React.ChangeEvent<HTMLInputElement>) {
    const newPosition = props.shape.shapeState.position;
    newPosition[parseInt(event.target.name)] = Number(event.target.value);
    props.setShape({
      ...props.shape,
      shapeState: {
        ...props.shape.shapeState,
        position: newPosition
      }
    })
  }

  function setShapeStateRotation(event: React.ChangeEvent<HTMLInputElement>) {
    const newRotation = props.shape.shapeState.rotation;
    newRotation[parseInt(event.target.name)] = Number(event.target.value);
    props.setShape({
      ...props.shape,
      shapeState: {
        ...props.shape.shapeState,
        rotation: newRotation
      }
    })
  }

  return (
    <div
      className="rounded-xl bg-slate-100 dark:bg-zinc-800 border border-transparent dark:border-zinc-400 mx-3 my-3 px-3 py-2 drop-shadow-sm dark:drop-shadow-lg z-10"
    >
      <div className="flex justify-between">
        <span className="mr-1 py-0.5 px-1 rounded-lg bg-sky-400 dark:bg-blue-500 text-slate-100 font-light italic font-serif shadow-md shadow-sky-400/50 dark:shadow-blue-500/50">
          {capitalizeFirstLetter(props.shape.shape)}
        </span>
        <h3
          className="text-zinc-700 dark:text-slate-300 text-lg before:content-[''] before:h-1 before:w-1 before:bg-sky-400 dark:before:bg-blue-500 before:rounded-full before:inline-block before:mr-2 before:mt-1 before:ml-1 before:mb-0.5 w-8/12 truncate"
        >
          {props.shape.id}
        </h3>
        <button onClick={() => props.deleteShape()} className="px-1.5 py-0.5 rounded-lg hover:bg-slate-200 dark:hover:bg-zinc-500">
          <Icon icon="octicon:trash-24" height={16} width={16} className="text-zinc-700 dark:text-slate-300"/>
        </button>
      </div>
      <div>
        <label htmlFor="shape" className="flex mt-2">
          <span className="mr-2 my-auto text-zinc-700 dark:text-slate-300">Shape:</span>
          <select
            name="shape"
            id="shape"
            value={props.shape.shape}
            onChange={setShapeShape}
            className={"p-0.5 mr-2 my-auto text-center rounded-lg focus-visible:outline-none bg-slate-200 dark:bg-zinc-600 " +
                "border border-transparent hover:border-blue-300 dark:hover:border-blue-400 focus-visible:border-blue-400 " +
                "dark:focus-visible:border-blue-500 transition-colors text-slate-800 dark:text-slate-200"}
          >
            <option value="box">Box</option>
            <option value="sphere">Sphere</option>
            <option value="cylinder">Cylinder</option>
          </select>
        </label>
        <label htmlFor="color" className="flex mt-2">
          <span className="mr-2 my-auto text-zinc-700 dark:text-slate-300">Color:</span>
          <input
            type="color"
            name="color"
            id="color"
            value={props.shape.color}
            onChange={setShape}
            className="my-auto bg-transparent dark:backdrop-filter dark:backdrop-blur-sm dark:bg-zinc-800"
          />
        </label>
        <SingleKeyInputWithRange
            name="mass"
            value={props.shape.shapeState.mass}
            eventHandler={setShapeState}
        />
        <ThreeKeyInputWithRange
            name="position"
            subName0="X"
            subName1="Y"
            subName2="Z"
            value={props.shape.shapeState.position}
            eventHandler={setShapeStatePosition}
            max={50}
            min={-50}
        />
        <ThreeKeyInputWithRange
            name="rotation"
            subName0="X"
            subName1="Y"
            subName2="Z"
            value={props.shape.shapeState.rotation}
            eventHandler={setShapeStateRotation}
            max={360}
            min={-360}
        />
        <ThreeKeyInputWithRange
            name="velocity"
            subName0="X"
            subName1="Y"
            subName2="Z"
            value={props.shape.velocity}
            eventHandler={setShapeVelocity}
            max={30}
            min={-30}
        />
      </div>
    </div>
  )
}

function SingleKeyInputWithRange(props: {
  name: string,
  value: number,
  eventHandler: (event: React.ChangeEvent<HTMLInputElement>) => void,
  min?: number,
  max?: number,
}) {
  return (
      <label htmlFor={props.name} className="flex mt-2">
          <span className="mr-2 my-auto text-zinc-700 dark:text-slate-300">{capitalizeFirstLetter(props.name)}:</span>
          <input
            type="number"
            name={props.name}
            id={props.name}
            min={props.min}
            max={props.max}
            value={props.value}
            onChange={props.eventHandler}
            className={"w-12 p-0.5 mr-2 my-auto text-center rounded-lg focus-visible:outline-none bg-slate-200 dark:bg-zinc-600 " +
                "border border-transparent hover:border-blue-300 dark:hover:border-blue-400 focus-visible:border-blue-400 " +
                "dark:focus-visible:border-blue-500 transition-colors text-slate-800 dark:text-slate-200"}
          />
          <input
            type="range"
            name={props.name}
            id={props.name}
            value={props.value}
            onChange={props.eventHandler}
            className="my-auto block sm:hidden h-2 lg:block w-1/2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
        </label>
  )
}

function ThreeKeyInputWithRange(props: {
  name: string,
  subName0: string,
  subName1: string,
  subName2: string,
  value: number[],
  eventHandler: (event: React.ChangeEvent<HTMLInputElement>) => void,
  min?: number,
  max?: number,
}) {
  return (
    <div className="mt-2">
      <label htmlFor={props.name}>
        <span className="text-zinc-700 dark:text-slate-300">{capitalizeFirstLetter(props.name)}:</span>
        <br/>
        <label htmlFor="0" className="flex">
          <span className="mr-2 my-auto text-zinc-700 dark:text-slate-300">{props.subName0}:</span>
          <input
            type="number"
            name="0"
            id="0"
            value={props.value[0]}
            onChange={props.eventHandler}
            className={"w-12 p-0.5 mr-2 my-auto text-center rounded-lg focus-visible:outline-none bg-slate-200 dark:bg-zinc-600 " +
              "border border-transparent hover:border-blue-300 dark:hover:border-blue-400 focus-visible:border-blue-400 " +
              "dark:focus-visible:border-blue-500 transition-colors text-slate-800 dark:text-slate-200"}
          />
          <input
            type="range"
            name="0"
            id="0"
            min={props.min}
            max={props.max}
            value={props.value[0]}
            onChange={props.eventHandler}
            className="my-auto block sm:hidden h-2 lg:block w-1/2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
        </label>
        <br/>
        <label htmlFor="1" className="flex">
          <span className="mr-2 my-auto text-zinc-700 dark:text-slate-300">{props.subName1}:</span>
          <input
            type="number"
            name="1"
            id="1"
            value={props.value[1]}
            onChange={props.eventHandler}
            className={"w-12 p-0.5 mr-2 my-auto text-center rounded-lg focus-visible:outline-none bg-slate-200 dark:bg-zinc-600 " +
              "border border-transparent hover:border-blue-300 dark:hover:border-blue-400 focus-visible:border-blue-400 " +
              "dark:focus-visible:border-blue-500 transition-colors text-slate-800 dark:text-slate-200"}
          />
          <input
            type="range"
            name="1"
            id="1"
            min={props.min}
            max={props.max}
            value={props.value[1]}
            onChange={props.eventHandler}
            className="my-auto block sm:hidden h-2 lg:block w-1/2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
        </label>
        <br/>
        <label htmlFor="2" className="flex">
          <span className="mr-2 my-auto text-zinc-700 dark:text-slate-300">{props.subName2}:</span>
          <input
            type="number"
            name="2"
            id="2"
            value={props.value[2]}
            onChange={props.eventHandler}
            className={"w-12 p-0.5 mr-2 my-auto text-center rounded-lg focus-visible:outline-none bg-slate-200 dark:bg-zinc-600 " +
              "border border-transparent hover:border-blue-300 dark:hover:border-blue-400 focus-visible:border-blue-400 " +
              "dark:focus-visible:border-blue-500 transition-colors text-slate-800 dark:text-slate-200"}
          />
          <input
            type="range"
            name="2"
            id="2"
            min={props.min}
            max={props.max}
            value={props.value[2]}
            onChange={props.eventHandler}
            className="my-auto block sm:hidden h-2 lg:block w-1/2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
        </label>
      </label>
    </div>
  )
}