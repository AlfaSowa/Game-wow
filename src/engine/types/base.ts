export interface ICoreOptions {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
}

export type MouseType = {
  x: number;
  y: number;
  down: boolean;
};
