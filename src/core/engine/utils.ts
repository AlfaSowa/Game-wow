import { MouseType } from "../interfaces";

export const randomNumber = (min: number, max: number): number => {
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

export const moveElementToTarget = (element: any, target: any) => {
  if (
    element.coord.x !== target.coord.x ||
    element.coord.y !== target.coord.y
  ) {
    let delta = {
      x: target.coord.x - element.coord.x,
      y: target.coord.y - element.coord.y,
    };
    let angle = Math.atan2(delta.y, delta.x);

    if (
      element.coord.x > 0 &&
      element.coord.x < window.innerWidth &&
      element.coord.y > 0 &&
      element.coord.y < window.innerHeight
    ) {
      element.coord.x += Math.cos(angle) * element.vel;
      element.coord.y += Math.sin(angle) * element.vel;
      // target.coord.x += Math.cos(angle) * this.vel;
      // target.coord.y += Math.sin(angle) * this.vel;
    } else {
      element.finish = true;
    }
  }
};
