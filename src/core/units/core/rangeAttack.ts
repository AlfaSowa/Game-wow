import { createFillCircle } from "../../engine/engine";
import { randomNumber } from "../../engine/utils";
import { CoordsType, CoreBase, CoreOptions, MouseType } from "../../interfaces";

export class RangeAttack extends CoreBase {
  radius = 8;
  finish = false;
  vel = 10;
  color = "#0081dc";
  coord: CoordsType = { x: 0, y: 0 };

  objectDamageCoord: CoordsType = { x: 0, y: 0 };

  bubble = false;
  bubbleRadius = randomNumber(1, 5);
  bubbleLive = 2;
  bubbleFading = randomNumber(0.1, 0.02);

  constructor(
    coord: CoordsType,
    mouse: MouseType,
    spread: number,
    { canvas, ctx }: CoreOptions
  ) {
    super({ canvas, ctx, mouse });
    this.mouse = {
      ...mouse,
      x: mouse.x + randomNumber(-spread, spread),
      y: mouse.y + randomNumber(-spread, spread),
    };
    this.coord = { x: coord.x, y: coord.y };
  }

  moveBullet = () => {
    if (this.coord.x !== this.mouse.x || this.coord.y !== this.mouse.y) {
      let delta = {
        x: this.mouse.x - this.coord.x,
        y: this.mouse.y - this.coord.y,
      };
      let angle = Math.atan2(delta.y, delta.x);

      if (
        this.coord.x > 0 &&
        this.coord.x < window.innerWidth &&
        this.coord.y > 0 &&
        this.coord.y < window.innerHeight
      ) {
        this.coord.x += Math.cos(angle) * this.vel;
        this.coord.y += Math.sin(angle) * this.vel;
        this.mouse.x += Math.cos(angle) * this.vel;
        this.mouse.y += Math.sin(angle) * this.vel;
      } else {
        this.finish = true;
      }
    }
  };

  createBubble = () => {
    let delta = {
      x: this.objectDamageCoord.x - this.coord.x,
      y: this.objectDamageCoord.y - this.coord.y,
    };
    let angle = Math.atan2(delta.y, delta.x);

    this.coord.x -= Math.cos(angle) * 2;
    this.coord.y -= Math.sin(angle) * 2;

    createFillCircle(
      this.ctx,
      this.coord.x,
      this.coord.y,
      this.bubbleRadius,
      `rgba(64, 198, 249, ${this.bubbleLive})`
    );

    this.bubbleLive -= this.bubbleFading;
    if (this.bubbleLive <= 0) {
      this.finish = true;
    }
  };

  collisionWithObject = (objects: any[], heroDamage: number) => {
    objects.forEach((object) => {
      let delta = {
        x: object.coord.x - this.coord.x,
        y: object.coord.y - this.coord.y,
      };
      let dist = Math.sqrt(delta.x * delta.x + delta.y * delta.y);

      if (object.shield) {
        if (dist <= object.shieldRadius + this.radius) {
          this.bubble = true;
          this.objectDamageCoord = { x: object.coord.x, y: object.coord.y };
          object.shield -= heroDamage;
        }
      } else {
        if (dist < object.radius + this.radius) {
          this.finish = true;
          object.curHp -= heroDamage;
        }
      }
    });
  };

  draw = (objects: any[], heroDamage: number) => {
    if (!this.bubble) {
      createFillCircle(
        this.ctx,
        this.coord.x,
        this.coord.y,
        this.radius,
        this.color
      );
      this.moveBullet();
      this.collisionWithObject(objects, heroDamage);
    } else {
      this.createBubble();
    }
  };
}
