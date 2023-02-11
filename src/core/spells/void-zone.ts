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
  moveTo: boolean;

  constructor({
    coord,
    coreOptions,
    positive,
    isSucking,
    moveTo,
  }: {
    coord: CoordsType;
    coreOptions: CoreOptions;
    positive: boolean;
    isSucking: boolean;
    moveTo: boolean;
  }) {
    super(coreOptions);
    this.coord = { x: coord.x, y: coord.y };
    this.positive = positive;
    this.color = positive ? "#008a1c80" : "#5400c380";
    this.isSucking = isSucking;
    this.curRadius = positive ? this.maxRadius : this.radius;
    this.moveTo = moveTo;
  }

  changeToBig = (value: number = 0.1) => {
    this.curRadius += value;
  };

  changeToSmall = (value: number = 0.1) => {
    if (this.curRadius >= this.radius) {
      this.curRadius -= value;
    } else {
      this.finish = true;
    }
  };

  isMove = (value: boolean) => {
    this.moveTo = value;
  };

  moveToCreator = (creator: any) => {
    if (this.coord.x !== creator.coord.x || this.coord.y !== creator.coord.y) {
      let delta = {
        x: creator.coord.x - this.coord.x,
        y: creator.coord.y - this.coord.y,
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
        // creator.coord.x += Math.cos(angle) * this.vel;
        // creator.coord.y += Math.sin(angle) * this.vel;
      } else {
        this.finish = true;
      }
    }
  };

  createZone = (creator: any, target: any) => {
    if (!this.positive && this.curRadius < this.maxRadius) {
      this.changeToBig();
    }

    createFillCircle(
      this.ctx,
      this.coord.x,
      this.coord.y,
      this.curRadius,
      this.color
    );

    if (isTargetsColision(target, this)) {
      if (this.positive) {
        if (target.curHp < target.maxHp) {
          target.curHp += 1;
        }
        if (this.curRadius >= this.radius) {
          this.curRadius -= 0.3;
        } else {
          this.finish = true;
        }
      } else {
        target.curHp -= 1;
      }
    }

    if (isTargetsColision(creator, this)) {
      if (this.positive) {
        if (
          creator.curHp <= creator.maxHp ||
          creator.shield <= creator.maxShield
        ) {
          if (creator.shield > 0) {
            creator.shield += 0.1;
          } else {
            creator.curHp += 0.1;
          }
        }

        if (this.curRadius >= this.radius) {
          this.curRadius -= 1;
        } else {
          this.finish = true;
        }
      }
    }
  };

  draw = (creator: any, target: any) => {
    this.createZone(creator, target);
  };
}
