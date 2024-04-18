export interface ICoreOptions {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
}

export type MouseType = {
  x: number;
  y: number;
  down: boolean;
};

export type PosotionType = {
  x: number;
  y: number;
};
