export type CreateFillCircleType = {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  radius: number;
  color?: string;
};

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
