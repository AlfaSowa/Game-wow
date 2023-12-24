import {
  IsMouseOnTargetType,
  IsOnCanavasFieldType,
  IsTargetsColisionType,
  MoveElementToTargetType,
  RandomNumberType,
} from "../../../shared";

export const randomNumber = ({ max, min }: RandomNumberType): number => {
  return Math.random() * (max - min) + min;
};

export const isOnCanavasField = ({ radius, x, y }: IsOnCanavasFieldType): boolean => {
  return x >= radius && x <= window.innerWidth - radius && y >= radius && y <= window.innerHeight - radius;
};

export const isTargetsColision = ({ targetA, targetB }: IsTargetsColisionType): boolean => {
  let delta = {
    x: targetA.coord.x - targetB.coord.x,
    y: targetA.coord.y - targetB.coord.y,
  };
  let dist = Math.sqrt(delta.x * delta.x + delta.y * delta.y);

  if (dist < (targetA.curRadius || targetA.radius) + (targetB.curRadius || targetB.radius)) {
    return true;
  }
  return false;
};

export const isMouseOnTarget = ({ mouse, target }: IsMouseOnTargetType): boolean => {
  return (
    mouse.x > target.coord.x - target.radius &&
    mouse.x < target.coord.x + target.radius &&
    mouse.y > target.coord.y - target.radius &&
    mouse.y < target.coord.y + target.radius
  );
};

export const moveElementToTarget = ({ element, target }: MoveElementToTargetType) => {
  if (element.coord.x !== target.coord.x || element.coord.y !== target.coord.y) {
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
