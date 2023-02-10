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
