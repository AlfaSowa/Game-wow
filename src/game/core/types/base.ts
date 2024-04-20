export interface CustomCoreOptions {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
}

export type CustomMouseType = {
  x: number;
  y: number;
  down: boolean;
};

export type CoordsType = {
  x: number;
  y: number;
};

export type MouseCoordType = {
  x: number;
  y: number;
  down: boolean;
};

export type MovesKeys = "KeyW" | "KeyA" | "KeyS" | "KeyD";

export type UnitBaseConstructor = {
  maxHp: number;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
};

export type TargetType = {
  position: CoordsType;
  radius: number;
};
