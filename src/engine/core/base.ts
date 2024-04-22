import { ICoreOptions } from "../types";

export class CoreBase implements ICoreOptions {
  ctx: CanvasRenderingContext2D;

  constructor({ ctx }: ICoreOptions) {
    this.ctx = ctx;
  }
}
