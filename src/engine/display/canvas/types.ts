import { Game } from "../../core";

export type CanvasPoolCreate = {
  parent: any;
  width: number;
  height: number;
};
export type CanvasPoolCreateReturn = {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
};

export type CreateRenderConstructor = {
  game: Game;
};
export type CreateRenderCreate = {
  width: number;
  height: number;
};
