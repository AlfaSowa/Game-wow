import { createFillCircle } from "../../core/shared";
import { CoordsType, MovesKeys, UnitBaseConstructor } from "./types";

export class UnitBase {
  maxHp: number = 0;
  curHp: number = 0;
  attaks: any[] = [];

  canvas: any;
  ctx: any;

  KeyW: boolean = false;
  KeyA: boolean = false;
  KeyS: boolean = false;
  KeyD: boolean = false;

  vel: number = 3;

  coord: CoordsType = { x: window.innerWidth / 2, y: window.innerHeight - 200 };

  constructor({ maxHp, canvas, ctx }: UnitBaseConstructor) {
    this.maxHp = maxHp;
    this.canvas = canvas;
    this.ctx = ctx;
  }

  move() {
    if (this.KeyD) {
      this.coord.x += this.vel;
    }
    if (this.KeyS) {
      this.coord.y += this.vel;
    }
    if (this.KeyA) {
      this.coord.x -= this.vel;
    }
    if (this.KeyW) {
      this.coord.y -= this.vel;
    }
  }

  onKeyPress(e: KeyboardEvent, value: boolean) {
    if (["KeyW", "KeyA", "KeyS", "KeyD"].includes(e.code)) {
      this[e.code as MovesKeys] = value;
    }
  }

  init() {
    window.addEventListener("keydown", (e) => this.onKeyPress(e, true), false);
    window.addEventListener("keyup", (e) => this.onKeyPress(e, false), false);
  }

  draw() {
    createFillCircle({ ctx: this.ctx, radius: 35, x: this.coord.x, y: this.coord.y, color: "#f4f4" });
    this.move();
  }
}

export class UnitNPCBase {}
