import ShapeProps from "../utils/types";
import {Icon} from "@iconify/react";
import React from "react";

interface ShapeConfigProps {
  index: number;
  shape: ShapeProps;
  setShape: (shape: ShapeProps) => void;
  deleteShape: () => void;
}

export default function ShapeConfig(props: ShapeConfigProps) {
  function setShape(event: React.ChangeEvent<HTMLInputElement>) {
    props.setShape({
      ...props.shape,
      [event.target.name]: event.target.value
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
      className="rounded-xl bg-slate-100 dark:bg-zinc-500 mx-3 my-3 px-3 py-2 drop-shadow-sm dark:drop-shadow-lg z-10"
    >
      <div className="flex justify-between">
        <h3
          className="text-zinc-700 dark:text-slate-300 text-lg before:content-[''] before:h-1 before:w-1 before:bg-sky-400 before:rounded-full before:inline-block before:mr-2 before:mt-1 before:ml-1 before:mb-0.5 w-8/12 truncate"
        >
          {props.shape.shape} {props.shape.id}
        </h3>
        <button onClick={() => props.deleteShape()}>
          <Icon icon="octicon:trash-24" height={16} width={16}/>
        </button>
      </div>
      <div className="flex flex-wrap mt-2">
        <label htmlFor="color" className="flex align-middle">
          <span className="mr-2">Color</span>
          <input
            type="color"
            name="color"
            id="color"
            value={props.shape.color}
            onChange={setShape}
          />
        </label>
        <label htmlFor="mass" className="flex align-middle">
          <span className="mr-2">Mass</span>
          <input
            type="number"
            name="mass"
            id="mass"
            min={0}
            max={100}
            value={props.shape.shapeState.mass}
            onChange={setShapeState}
            className="w-12 p-0.5 mr-2"
          />
          <input
            type="range"
            name="mass"
            id="mass"
            value={props.shape.shapeState.mass}
            onChange={setShapeState}
          />
        </label>
        <label htmlFor="position">
          <span>Position</span>
          <br/>
          <label htmlFor="0" className="flex align-middle">
            <span className="mr-2">X</span>
            <input
              type="number"
              name="0"
              id="0"
              value={props.shape.shapeState.position[0]}
              onChange={setShapeStatePosition}
              className="w-12 p-0.5 mr-2"
            />
            <input
              type="range"
              name="0"
              id="0"
              min={0}
              max={50}
              value={props.shape.shapeState.position[0]}
              onChange={setShapeStatePosition}
            />
          </label>
          <br/>
          <label htmlFor="1" className="flex align-middle">
            <span className="mr-2">Y</span>
            <input
              type="number"
              name="1"
              id="1"
              value={props.shape.shapeState.position[1]}
              onChange={setShapeStatePosition}
              className="w-12 p-0.5 mr-2"
            />
            <input
              type="range"
              name="1"
              id="1"
              min={0}
              max={10}
              value={props.shape.shapeState.position[1]}
              onChange={setShapeStatePosition}
            />
          </label>
          <br/>
          <label htmlFor="2" className="flex align-middle">
            <span className="mr-2">Z</span>
            <input
              type="number"
              name="2"
              id="2"
              value={props.shape.shapeState.position[2]}
              onChange={setShapeStatePosition}
              className="w-12 p-0.5 mr-2"
            />
            <input
              type="range"
              name="2"
              id="2"
              min={0}
              max={50}
              value={props.shape.shapeState.position[2]}
              onChange={setShapeStatePosition}
            />
          </label>
        </label>
        <label htmlFor="rotation">
          <span className="mr-2">Rotation</span>
          <br/>
          <label htmlFor="0" className="flex align-middle">
            <span className="mr-2">X</span>
            <input
              type="number"
              name="0"
              id="0"
              value={props.shape.shapeState.rotation[0]}
              onChange={setShapeStateRotation}
              className="w-12 p-0.5 mr-2"
            />
            <input
              type="range"
              name="0"
              id="0"
              min={0}
              max={360}
              value={props.shape.shapeState.rotation[0]}
              onChange={setShapeStateRotation}
            />
          </label>
          <br/>
          <label htmlFor="1" className="flex align-middle">
            <span className="mr-2">Y</span>
            <input
              type="number"
              name="1"
              id="1"
              value={props.shape.shapeState.rotation[1]}
              onChange={setShapeStateRotation}
              className="w-12 p-0.5 mr-2"
            />
            <input
              type="range"
              name="1"
              id="1"
              min={0}
              max={360}
              value={props.shape.shapeState.rotation[1]}
              onChange={setShapeStateRotation}
            />
          </label>
          <br/>
          <label htmlFor="2" className="flex align-middle">
            <span className="mr-2">Z</span>
            <input
              type="number"
              name="2"
              id="2"
              value={props.shape.shapeState.rotation[2]}
              onChange={setShapeStateRotation}
              className="w-12 p-0.5 mr-2"
            />
            <input
              type="range"
              name="2"
              id="2"
              min={0}
              max={360}
              value={props.shape.shapeState.rotation[2]}
              onChange={setShapeStateRotation}
            />
          </label>
        </label>
      </div>
    </div>
  )
}