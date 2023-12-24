import { CustomCoreOptions, CustomMouseType } from "./base";

export class CustomCoreBaseWithoutMouse implements CustomCoreOptions {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  constructor({ canvas, ctx }: CustomCoreOptions) {
    this.canvas = canvas;
    this.ctx = ctx;
  }
}

export class CustomCoreBase implements CustomCoreOptions {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  mouse: CustomMouseType;

  constructor({ canvas, ctx, mouse }: CustomCoreOptions & { mouse: CustomMouseType }) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.mouse = mouse;
  }
}
