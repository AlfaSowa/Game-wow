import { Draw } from "../../engine";
import { PositionType } from "../../engine/types";
import { CustomCoreOptions } from "../core";

type BarConstructorType = CustomCoreOptions & {
  width?: number;
  height?: number;
  position?: PositionType;
};

export class Bar {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  width: number = 400;
  height: number = 20;

  position: PositionType = { x: 0, y: 0 };

  value: number = this.width;

  constructor({ canvas, ctx, height, position, width }: BarConstructorType) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.height = height || 20;
    this.width = width || 400;
    this.position = position || { x: ctx.canvas.width / 2 - this.width / 2, y: 20 };
  }

  init() {}

  draw(comparator: (arg: number) => number) {
    Draw.Rect({
      ctx: this.ctx,
      position: this.position,
      color: "#000",
      height: this.height,
      width: this.width,
      fill: false,
    });

    if (this.value > 0) {
      this.value = comparator(this.width);
    }

    Draw.Rect({
      ctx: this.ctx,
      position: this.position,
      color: "red",
      height: this.height,
      width: this.value,
    });
  }
}
