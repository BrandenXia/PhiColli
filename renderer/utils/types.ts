export class ShapeProps {
    index: number;
    shape: string;
    position: [number, number, number] = [0, 0, 0];
    color: number = 0x66ccff;

    constructor(index: number) {
      this.index = index;
    }
  }