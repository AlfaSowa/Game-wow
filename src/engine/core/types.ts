export type GameInit = {
  width: number;
  height: number;
};

export type GameInitReturn = {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
};
