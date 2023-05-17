import {ShapeProps} from "../utils/types";
import React from "react";

interface ShapeConfigProps {
  props: ShapeProps,
  setProps: (props: ShapeProps) => void
  deleteShape: () => void
}

export default function ShapeConfig(props: ShapeConfigProps) {
  function deleteShape(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    props.deleteShape();
  }

  function setProp(prop: string, value: any) {
    props.setProps({
      ...props.props,
      [prop]: value
    });
  }

  function handleShapeChange(event: any) {
    setProp("shape", event.target.value)
  }

  function handleColorChange(event: any) {
    setProp("color", event.target.value)
  }

  function handlePosition0Change(event: any) {
    setProp("position", [event.target.value, props.props.position[1], props.props.position[2]])
  }

  function handlePosition1Change(event: any) {
    setProp("position", [props.props.position[0], event.target.value, props.props.position[2]])
  }

  function handlePosition2Change(event: any) {
    setProp("position", [props.props.position[0], props.props.position[1], event.target.value])
  }

  return (
    <div className="p-2 justify-between">
      <span className="">Object {props.props.index}</span>
      <button className="" onClick={deleteShape}>Delete</button>
      <br/>
      <label htmlFor="shape">
        Shape:
        <select
          name="shape"
          id="shape"
          onChange={handleShapeChange}
          className=""
        >
          <option value="cube">Cube</option>
          <option value="sphere">Sphere</option>
          <option value="cylinder">Cylinder</option>
          <option value="cone">Cone</option>
          <option value="torus">Torus</option>
        </select>
      </label>
      <br/>
      <label htmlFor="color">
        Color:
        <input
          type="color"
          name="color"
          id="color"
          value={props.props.color}
          onChange={handleColorChange}
          className=""
        />
      </label>
      <br/>
      <label htmlFor="position" className="">
        Position:
        <br/>
        <input
          type="range"
          name="position0"
          id="position0"
          min={-9}
          max={9}
          value={props.props.position[0]}
          onChange={handlePosition0Change}
          className=""
        />
        <br/>
        <input
          type="range"
          name="position1"
          id="position1"
          min={0}
          max={10}
          value={props.props.position[1]}
          onChange={handlePosition1Change}
          className=""
        />
        <br/>
        <input
          type="range"
          name="position2"
          id="position2"
          min={-9}
          max={9}
          value={props.props.position[2]}
          onChange={handlePosition2Change}
          className=""
        />
        <br/>
      </label>
    </div>
  )
}