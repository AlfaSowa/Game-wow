export type MovesKeys = "KeyW" | "KeyA" | "KeyS" | "KeyD";

export type CoordsType = {
  x: number;
  y: number;
};

export type UnitBaseConstructor = {
  maxHp: number;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
};
