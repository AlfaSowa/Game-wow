export interface CustomCoreOptions {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
}

export type CustomMouseType = {
  x: number;
  y: number;
  down: boolean;
};
