import { BoxGeometry, SphereGeometry } from "three";
import { ShapeProps } from "../utils/types";
import React from "react";

interface ShapeConfigProps {
  props: ShapeProps,
  setProps: React.Dispatch<React.SetStateAction<ShapeProps>>
}

export default function ShapeConfig(props: ShapeConfigProps) {
  function handleShapeChange(event: any) {
    if (event.target.value === "cube") {
      props.setProps({
        ...props.props,
        shape: new BoxGeometry(1, 1, 1)
      });
    } else if (event.target.value === "sphere") {
      props.setProps({
        ...props.props,
        shape: new SphereGeometry(1, 16, 16)
      });
    }
  }

  function handleColorChange(event: any) {
    console.log(event.target.value);
    props.setProps({
      ...props.props,
      color: event.target.value
    });
  }

  function handlePosition0Change(event: any) {
    props.setProps({
      ...props.props,
      position: [event.target.value, props.props.position[1], props.props.position[2]]
    });
  }

  function handlePosition1Change(event: any) {
    props.setProps({
      ...props.props,
      position: [props.props.position[0], event.target.value, props.props.position[2]]
    });
  }

  function handlePosition2Change(event: any) {
    props.setProps({
      ...props.props,
      position: [props.props.position[0], props.props.position[1], event.target.value]
    });
  }
  return (
    <div className="p-2 text-zinc-700 dark:text-slate-200">
      <h2>Object { props.props.index }</h2>
      <label htmlFor="shape">
        Shape:
        <select
          name="shape"
          id="shape"
          onChange={handleShapeChange}
          className="bg-transparent"
        >
          <option value="cube">Cube</option>
          <option value="sphere">Sphere</option>
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
          className="bg-transparent"
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
          className="bg-transparent"
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
          className="bg-transparent"
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
          className="bg-transparent"
        />
        <br/>
      </label>
    </div>
  )
}