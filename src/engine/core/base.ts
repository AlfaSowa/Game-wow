import { ICoreOptions } from "../types";

export class CoreBase implements ICoreOptions {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  constructor({ canvas, ctx }: ICoreOptions) {
    this.canvas = canvas;
    this.ctx = ctx;
  }
}
