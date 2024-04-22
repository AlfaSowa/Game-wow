import { CustomCoreOptions, CustomMouseType } from "./base";

export class CustomCoreBaseWithoutMouse implements CustomCoreOptions {
  ctx: CanvasRenderingContext2D;

  constructor({ ctx }: CustomCoreOptions) {
    this.ctx = ctx;
  }
}

export class CustomCoreBase implements CustomCoreOptions {
  ctx: CanvasRenderingContext2D;
  mouse: CustomMouseType;

  constructor({ ctx, mouse }: CustomCoreOptions & { mouse: CustomMouseType }) {
    this.ctx = ctx;
    this.mouse = mouse;
  }
}
