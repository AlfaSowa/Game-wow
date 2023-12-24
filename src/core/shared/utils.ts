import { CreateCurrentValueType, CreateFillCircleType, CreateStrokeCircleType } from "./types";

export const PI2: number = 2 * Math.PI;

export const createFillCircle = (args: CreateFillCircleType) => {
  const { ctx, radius, x, y, color } = args;

  if (ctx) {
    ctx.fillStyle = color || "#f5f7";
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, PI2);
    ctx.closePath();
    ctx.fill();
  }
};

export const createStrokeCircle = (args: CreateStrokeCircleType) => {
  const { color, ctx, lineWidth, radius, x, y } = args;

  if (ctx) {
    ctx.beginPath();
    ctx.strokeStyle = color || "rgba(255,255,255,0.1)";
    //   ctx.lineJoin = "none";
    ctx.lineWidth = lineWidth || 2;
    ctx.arc(x, y, radius, 0, PI2);
    ctx.stroke();
    ctx.closePath();
  }
};

export const createCurrentValue = (args: CreateCurrentValueType) => {
  const { color, ctx, lineWidth, radius, x, y, curValue, maxValue } = args;

  if (ctx) {
    ctx.beginPath();
    ctx.strokeStyle = color || "#fff";
    //   ctx.lineJoin = "none";
    ctx.lineWidth = lineWidth || 2;
    ctx.arc(x, y, radius, 0, (PI2 / 100) * ((100 / maxValue) * curValue));
    ctx.stroke();
    ctx.closePath();
  }
};
