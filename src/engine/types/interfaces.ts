import { ICoreOptions, MouseType } from "./base";

export class CoreBaseWithoutMouse implements ICoreOptions {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  constructor({ canvas, ctx }: ICoreOptions) {
    this.canvas = canvas;
    this.ctx = ctx;
  }
}

export class CoreBase implements ICoreOptions {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  mouse: MouseType;

  constructor({ canvas, ctx, mouse }: ICoreOptions & { mouse: MouseType }) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.mouse = mouse;
  }
}
