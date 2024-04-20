import { PositionType } from "../types";

export const PI2: number = 2 * Math.PI;

//--drawRectangle--//
export type DrawRectangleType = {
  ctx: CanvasRenderingContext2D;
  position: PositionType;
  width: number;
  height: number;
  color?: string;
  fill?: boolean;
};

export const drawRectangle = (args: DrawRectangleType) => {
  const { ctx, position, width, height, color, fill = true } = args;

  if (ctx) {
    ctx.fillStyle = color || "#f5f7";
    ctx.strokeStyle = color || "#f5f7";
    ctx.beginPath();
    ctx.fillRect(position.x, position.y, width, height);
    if (fill) {
      ctx.fill();
    } else {
      ctx.stroke();
    }
  }
};

//--drawCircle--//
export type DrawCircleType = {
  ctx: CanvasRenderingContext2D;
  position: PositionType;
  radius: number;
  color?: string;
  fill?: boolean;
};

export const drawCircle = (args: DrawCircleType) => {
  const { ctx, radius, position, color, fill = true } = args;

  if (ctx) {
    ctx.fillStyle = color || "#f5f7";
    ctx.strokeStyle = color || "#f5f7";
    ctx.beginPath();
    ctx.arc(position.x, position.y, radius, 0, PI2);
    if (fill) {
      ctx.fill();
    } else {
      ctx.stroke();
    }
  }
};

//--drawImage--//
export type DrawImageType = {
  ctx: CanvasRenderingContext2D;
  position: PositionType;
  src: string; //./path/to/assets Name_img.png
  parts?: number;
};

export const drawImage = (args: DrawImageType) => {
  const { ctx, position, src, parts = 1 } = args;

  const img = new Image();
  img.src = src;

  if (ctx) {
    ctx.drawImage(img, 0, 0, img.width / parts, img.height, position.x, position.y, img.width / parts, img.height);
  }
};
