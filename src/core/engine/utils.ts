export const randomNumber = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

export const isOnField = (x: number, y: number, radius: number): boolean => {
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

  if (dist < targetA.radius + targetB.curRadius) {
    return true;
  }
  return false;
};
