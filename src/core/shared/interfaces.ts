import { MouseType } from "./types";

export type CanvasType = HTMLCanvasElement | null;
export type ContextType = CanvasRenderingContext2D | null;

export interface ICoreOptions {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
}

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

// export type CoordsType = {
//   x: number;
//   y: number;
// };

// export interface CoreOptions {
//   canvas: HTMLCanvasElement;
//   ctx: CanvasRenderingContext2D;
//   mouse: MouseType;
// }

// export interface CoreOptionsWithoutCoord {
//   canvas: HTMLCanvasElement;
//   ctx: CanvasRenderingContext2D;
// }
// export interface CoreOptionsWithNull {
//   canvas: CanvasType;
//   ctx: ContextType;
// }
// export class CoreBase implements CoreOptions {
//   canvas: HTMLCanvasElement;
//   ctx: CanvasRenderingContext2D;
//   mouse: MouseType;

//   constructor({ canvas, ctx, mouse }: CoreOptions) {
//     this.canvas = canvas;
//     this.ctx = ctx;
//     this.mouse = mouse;
//   }
// }

// export class GameCore implements CoreOptionsWithoutCoord {
//   canvas: HTMLCanvasElement;
//   ctx: CanvasRenderingContext2D;

//   constructor({ canvas, ctx }: CoreOptionsWithoutCoord) {
//     this.canvas = canvas;
//     this.ctx = ctx;
//   }
// }

// export type MouseType = {
//   x: number;
//   y: number;
//   down: boolean;
// };
