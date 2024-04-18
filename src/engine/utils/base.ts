import { PosotionType } from "../types";

export type DrawCircleType = {
  ctx: CanvasRenderingContext2D;
  position: PosotionType;
  radius: number;
  color?: string;
  fill?: boolean;
};

export type DrawImageType = {
  ctx: CanvasRenderingContext2D;
  position: PosotionType;
  src: string; //./path/to/assets Name_img.png
  parts?: number;
};

export const PI2: number = 2 * Math.PI;

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

export const drawImage = (args: DrawImageType) => {
  const { ctx, position, src, parts = 1 } = args;

  const img = new Image();
  img.src = src;

  if (ctx) {
    ctx.drawImage(img, 0, 0, img.width / parts, img.height, position.x, position.y, img.width / parts, img.height);
  }
};
