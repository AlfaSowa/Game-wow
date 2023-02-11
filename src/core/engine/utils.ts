import { MouseType } from "../interfaces";

export const randomNumber = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

export const isOnCanavasField = (
  x: number,
  y: number,
  radius: number
): boolean => {
  return (
    x >= radius &&
    x <= window.innerWidth - radius &&
    y >= radius &&
    y <= window.innerHeight - radius
  );
};

export const isTargetsColision = (targetA: any, targetB: any): boolean => {
  let delta = {
    x: targetA.coord.x - targetB.coord.x,
    y: targetA.coord.y - targetB.coord.y,
  };
  let dist = Math.sqrt(delta.x * delta.x + delta.y * delta.y);

  if (
    dist <
    (targetA.curRadius || targetA.radius) +
      (targetB.curRadius || targetB.radius)
  ) {
    return true;
  }
  return false;
};

export const isMouseOnTarget = (mouse: MouseType, target: any): boolean => {
  if (
    mouse.x > target.coord.x - target.radius &&
    mouse.x < target.coord.x + target.radius &&
    mouse.y > target.coord.y - target.radius &&
    mouse.y < target.coord.y + target.radius
  ) {
    return true;
  }

  return false;
};
