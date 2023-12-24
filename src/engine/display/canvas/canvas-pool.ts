import { CanvasPoolCreate, CanvasPoolCreateReturn } from "./types";

export class CanvasPool {
  create({ parent, width = 1, height = 1 }: CanvasPoolCreate): CanvasPoolCreateReturn {
    let canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d") as CanvasRenderingContext2D;

    document.body.appendChild(canvas);
    return {
      canvas,
      context,
    };
  }
}
