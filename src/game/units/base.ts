import { Draw } from "../../engine";
import { CoordsType, TargetType, UnitBaseConstructor } from "../types";

export class UnitBase {
  target: TargetType = {
    position: { x: 0, y: 0 },
    radius: 0,
  };

  maxHp: number = 0;
  curHp: number = 0;
  attaks: any[] = [];

  radius = 35;

  canvas: any;
  ctx: any;

  vel: number = 3;

  position: CoordsType = { x: window.innerWidth / 2, y: 100 };
  constructor({ maxHp, canvas, ctx }: UnitBaseConstructor) {
    this.maxHp = maxHp;
    this.canvas = canvas;
    this.ctx = ctx;
  }

  init(params?: any) {}

  draw() {
    Draw.Circle({ ctx: this.ctx, radius: this.radius, position: this.position, color: "#f4f4" });
  }
}
