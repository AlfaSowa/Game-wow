import { createFillCircle } from "../engine/engine";
import { isTargetsColision } from "../engine/utils";
import { CoordsType, CoreBase, CoreOptions } from "../interfaces";

export class VoidZone extends CoreBase {
  radius: number = 20;
  maxRadius: number = 100;
  color: string = "#5400c3";
  finish: boolean = false;
  coord: CoordsType;
  positive: boolean;
  isSucking: boolean;
  curRadius: number;
  vel: number = 1;

  constructor({
    coord,
    coreOptions,
    positive,
    isSucking,
  }: {
    coord: CoordsType;
    coreOptions: CoreOptions;
    positive: boolean;
    isSucking: boolean;
  }) {
    super(coreOptions);
    this.coord = { x: coord.x, y: coord.y };
    this.positive = positive;
    this.color = positive ? "#008a1c80" : "#5400c380";
    this.isSucking = isSucking;
    this.curRadius = positive ? this.maxRadius : this.radius;
  }

  change = () => {
    this.curRadius += 0.1;
  };

  move = (target: any) => {
    if (this.coord.x !== target.coord.x || this.coord.y !== target.coord.y) {
      let delta = {
        x: target.coord.x - this.coord.x,
        y: target.coord.y - this.coord.y,
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
        // target.coord.x += Math.cos(angle) * this.vel;
        // target.coord.y += Math.sin(angle) * this.vel;
      } else {
        this.finish = true;
      }
    }
  };

  createZone = (targetA: any, targetB: any) => {
    if (!this.positive && this.curRadius < this.maxRadius) {
      this.change();
    }

    createFillCircle(
      this.ctx,
      this.coord.x,
      this.coord.y,
      this.curRadius,
      this.color
    );

    if (isTargetsColision(targetB, this)) {
      if (this.positive) {
        if (targetB.curHp < targetB.maxHp) {
          targetB.curHp += 1;
        }
        if (this.curRadius >= this.radius) {
          this.curRadius -= 0.1;
        } else {
          this.finish = true;
        }
      } else {
        targetB.curHp -= 1;
      }
    }

    if (isTargetsColision(targetA, this)) {
      if (this.positive) {
        if (
          targetA.curHp <= targetB.maxHp ||
          targetA.shield <= targetA.maxShield
        ) {
          if (targetA.shield > 0) {
            targetA.shield += 0.1;
          } else {
            targetA.curHp += 0.1;
          }
        }

        if (this.curRadius >= this.radius) {
          this.curRadius -= 0.1;
        } else {
          this.finish = true;
        }
      }
    }
  };

  draw = (targetA: any, targetB: any) => {
    this.createZone(targetA, targetB);
  };
}
