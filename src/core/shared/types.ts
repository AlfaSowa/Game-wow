export type CreateFillCircleType = {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  radius: number;
  color?: string;
};

export type CreateStrokeCircleType = {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  radius: number;
  color?: string;
  lineWidth?: number;
};

export type CreateCurrentValueType = {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  radius: number;
  maxValue: number;
  curValue: number;
  color?: string;
  lineWidth?: number;
};

export type RandomNumberType = {
  min: number;
  max: number;
};

export type IsOnCanavasFieldType = {
  x: number;
  y: number;
  radius: number;
};

export type IsTargetsColisionType = {
  targetA: any;
  targetB: any;
};

export type IsMouseOnTargetType = {
  mouse: MouseType;
  target: any;
};

export type MoveElementToTargetType = {
  element: any;
  target: any;
};

export type CoordsType = {
  x: number;
  y: number;
};

export type MouseType = {
  x: number;
  y: number;
  down: boolean;
};
