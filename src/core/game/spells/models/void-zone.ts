import {
  CoordsType,
  CoreBaseWithoutMouse,
  ICoreOptions,
  createFillCircle,
  isTargetsColision,
  moveElementToTarget,
} from "../../../shared";

type VoidZoneConstructor = {
  coord: CoordsType;
  coreOptions: ICoreOptions;
  positiveForCreator: boolean;
  positiveForTarget: boolean;
  isSucking: boolean;
  moveTo: boolean;
};

export class VoidZone extends CoreBaseWithoutMouse {
  radius: number = 20;
  curRadius: number;
  maxRadius: number = 100;
  coord: CoordsType;

  positiveForCreator: boolean;
  positiveForTarget: boolean;
  finish: boolean = false;
  isSucking: boolean;
  moveTo: boolean;

  color: string = "#5400c3";
  vel: number = 1;

  constructor({ coord, coreOptions, positiveForCreator, positiveForTarget, isSucking, moveTo }: VoidZoneConstructor) {
    super(coreOptions);
    this.coord = { x: coord.x, y: coord.y };
    this.positiveForCreator = positiveForCreator;
    this.positiveForTarget = positiveForTarget;
    this.color = positiveForTarget ? "#008a1c80" : "#5400c380";
    this.isSucking = isSucking;
    this.curRadius = positiveForTarget ? this.maxRadius : this.radius;
    this.moveTo = moveTo;
  }

  changeToBig(value: number = 0.1) {
    this.curRadius += value;
  }

  changeToSmall(value: number = 0.1) {
    if (this.curRadius >= this.radius) {
      this.curRadius -= value;
    } else {
      this.finish = true;
    }
  }

  isMove(value: boolean) {
    this.moveTo = value;
  }

  moveToTarget(target: any) {
    moveElementToTarget({ element: this, target });
  }

  createZone(creator: any, target: any) {
    if (!this.positiveForTarget && this.curRadius < this.maxRadius) {
      this.changeToBig();
    }

    createFillCircle({
      ctx: this.ctx,
      x: this.coord.x,
      y: this.coord.y,
      radius: this.curRadius,
      color: this.color,
    });

    if (isTargetsColision({ targetA: target, targetB: this })) {
      if (this.positiveForTarget) {
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

    if (isTargetsColision({ targetA: creator, targetB: this })) {
      if (this.positiveForTarget) {
        if (creator.curHp <= creator.maxHp || creator.shield <= creator.maxShield) {
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
  }

  draw(creator: any, target: any) {
    this.createZone(creator, target);
  }
}
