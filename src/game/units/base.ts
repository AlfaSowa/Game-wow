import { CoordsType, TargetType, UnitBaseConstructor } from "../core";

export class UnitBase {
  target: TargetType = {
    position: { x: 0, y: 0 },
    radius: 0,
  };

  maxHp: number = 0;
  curHp: number = 0;
  exist: boolean = true;

  attaks: any[] = [];

  radius = 35;

  canvas: any;
  ctx: any;

  vel: number = 3;

  position: CoordsType = { x: 0, y: 0 };

  constructor({ maxHp, canvas, ctx }: UnitBaseConstructor) {
    this.maxHp = maxHp;
    this.curHp = maxHp;
    this.canvas = canvas;
    this.ctx = ctx;
    this.position = { x: ctx.canvas.width / 2, y: 200 };
  }

  init(params?: any) {}

  draw(params?: any) {}
}
