import { ICoreOptions, MouseType } from "./base";

export class CoreBaseWithoutMouse implements ICoreOptions {
  ctx: CanvasRenderingContext2D;

  constructor({ ctx }: ICoreOptions) {
    this.ctx = ctx;
  }
}

export class CoreBase implements ICoreOptions {
  ctx: CanvasRenderingContext2D;
  mouse: MouseType;

  constructor({ ctx, mouse }: ICoreOptions & { mouse: MouseType }) {
    this.ctx = ctx;
    this.mouse = mouse;
  }
}
