import { Draw } from "..";
import { isTargetsColision, randomNumber } from "../../core/shared";
import { CoordsType, CustomCoreOptions, MouseCoordType } from "../../game/core";

import { CoreBase } from "./base";

export class RangeAttack extends CoreBase {
  radius = 8;
  finish = false;
  vel = 10;
  color = "#0081dc";
  position: CoordsType = { x: 0, y: 0 };
  objectDamageCoord: CoordsType = { x: 0, y: 0 };
  bubble = false;
  bubbleRadius = randomNumber(1, 5);
  bubbleLive = 2;
  bubbleFading = randomNumber(0.1, 0.02);

  mouse: MouseCoordType = {
    x: 0,
    y: 0,
    down: false,
  };

  constructor({
    mouse,
    position,
    spread,
    ...args
  }: CustomCoreOptions & { mouse: MouseCoordType } & { position: CoordsType } & { spread: number }) {
    super(args);
    this.mouse = {
      ...mouse,
      x: mouse.x + randomNumber(-spread, spread),
      y: mouse.y + randomNumber(-spread, spread),
    };
    this.position = { x: position.x, y: position.y };
  }
  moveBullet() {
    if (this.position.x !== this.mouse.x || this.position.y !== this.mouse.y) {
      let delta = {
        x: this.mouse.x - this.position.x,
        y: this.mouse.y - this.position.y,
      };
      let angle = Math.atan2(delta.y, delta.x);
      if (
        this.position.x > 0 &&
        this.position.x < window.innerWidth &&
        this.position.y > 0 &&
        this.position.y < window.innerHeight
      ) {
        this.position.x += Math.cos(angle) * this.vel;
        this.position.y += Math.sin(angle) * this.vel;
        this.mouse.x += Math.cos(angle) * this.vel;
        this.mouse.y += Math.sin(angle) * this.vel;
      } else {
        this.finish = true;
      }
    }
  }
  createBubble() {
    let delta = {
      x: this.objectDamageCoord.x - this.position.x,
      y: this.objectDamageCoord.y - this.position.y,
    };
    let angle = Math.atan2(delta.y, delta.x);
    this.position.x -= Math.cos(angle) * 2;
    this.position.y -= Math.sin(angle) * 2;
    Draw.Circle({ ctx: this.ctx, radius: this.radius, position: this.position, color: "#f4f4" });
    this.bubbleLive -= this.bubbleFading;
    if (this.bubbleLive <= 0) {
      this.finish = true;
    }
  }
  collisionWithObject(targets: any[], damage: number) {
    targets.forEach((target) => {
      if (target.shield) {
        if (isTargetsColision({ targetA: target, targetB: this })) {
          this.bubble = true;
          this.objectDamageCoord = { x: target.coord.x, y: target.coord.y };
          target.shield -= damage;
        }
      } else {
        if (isTargetsColision({ targetA: target, targetB: this })) {
          this.finish = true;
          target.curHp -= damage;
        }
      }
    });
  }
  draw() {
    if (!this.bubble) {
      Draw.Circle({ ctx: this.ctx, radius: this.radius, position: this.position, color: this.color });
      this.moveBullet();
      // this.collisionWithObject(targets, damage);
    } else {
      this.createBubble();
    }
  }
}
