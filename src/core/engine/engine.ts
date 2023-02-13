import { ContextType } from "../interfaces";

const PI2: number = 2 * Math.PI;

export const createFillCircle = (
  ctx: ContextType,
  x: number,
  y: number,
  radius: number,
  color?: string
) => {
  if (ctx) {
    ctx.fillStyle = color || "#f5f7";
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, PI2);
    ctx.closePath();
    ctx.fill();
  }
};

export const createStrokeCircle = (
  ctx: ContextType,
  x: number,
  y: number,
  radius: number,
  color: string = "rgba(255,255,255,0.1)",
  lineWidth: number = 2
) => {
  if (ctx) {
    ctx.beginPath();
    ctx.strokeStyle = color;
    //   ctx.lineJoin = "none";
    ctx.lineWidth = lineWidth;
    ctx.arc(x, y, radius, 0, PI2);
    ctx.stroke();
    ctx.closePath();
  }
};

export const createCurrentValue = (
  ctx: ContextType,
  x: number,
  y: number,
  radius: number,
  maxValue: number,
  curValue: number,
  color: string = "#fff",
  lineWidth: number = 2
) => {
  if (ctx) {
    ctx.beginPath();
    ctx.strokeStyle = color;
    //   ctx.lineJoin = "none";
    ctx.lineWidth = lineWidth;
    ctx.arc(x, y, radius, 0, (PI2 / 100) * ((100 / maxValue) * curValue));
    ctx.stroke();
    ctx.closePath();
  }
};
