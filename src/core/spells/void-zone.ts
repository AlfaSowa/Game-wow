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

  constructor({
    coord,
    coreOptions,
    positive,
  }: {
    coord: CoordsType;
    coreOptions: CoreOptions;
    positive: boolean;
  }) {
    super(coreOptions);
    this.coord = { x: coord.x, y: coord.y };
    this.positive = positive;
    this.color = positive ? "#008a1c80" : "#5400c380";
  }

  grow = () => {
    this.radius += 0.1;
  };

  createZone = (target: any) => {
    if (this.radius < this.maxRadius) {
      this.grow();
    }

    createFillCircle(
      this.ctx,
      this.coord.x,
      this.coord.y,
      this.radius,
      this.color
    );

    if (isTargetsColision(target, this)) {
      if (this.positive) {
        if (target.curHp < target.maxHp) {
          target.curHp += 1;
        }
      } else {
        target.curHp -= 1;
      }
    }
  };

  draw = (targetA: any, targetB: any) => {
    this.createZone(targetB);
  };
}
