import { BoxGeometry } from "three";

export class ShapeProps {
    index: number;
    shape: THREE.BufferGeometry = new BoxGeometry(1, 1, 1);
    position: [number, number, number] = [0, 0, 0];
    color: number = 0x66ccff;

    constructor(index: number) {
      this.index = index;
    }
  }