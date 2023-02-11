import { isTargetsColision } from "../../engine/utils";
import { VoidZone } from "../../spells/void-zone";
import { BaseBossClass } from "./base";

export class FireBoss extends BaseBossClass {
  voidZonesMoveToCreator: boolean = false;

  createvoidZone = (
    target: any,
    positive: boolean = false,
    isSucking: boolean = false
  ) => {
    if (positive) {
      this.healVoides.push(
        new VoidZone({
          coord: target.coord,
          coreOptions: {
            canvas: this.canvas,
            ctx: this.ctx,
            mouse: this.mouse,
          },
          positive,
          isSucking,
          moveTo: this.voidZonesMoveToCreator,
        })
      );
    } else {
      this.voides.push(
        new VoidZone({
          coord: target.coord,
          coreOptions: {
            canvas: this.canvas,
            ctx: this.ctx,
            mouse: this.mouse,
          },
          positive,
          isSucking,
          moveTo: false,
        })
      );
    }
  };

  init(target: any) {
    super.init(target);

    setInterval(() => {
      this.createvoidZone(target, true, true);
    }, 8000);

    setInterval(() => {
      this.createvoidZone(target);
    }, 10000);
  }

  draw(target: any) {
    super.draw(target);

    this.voides.forEach((voidZone) => {
      voidZone.draw(this, target);

      if (voidZone.finish) {
        this.voides = this.voides.filter((item) => !item.finish);
      }

      this.healVoides.forEach((healVoidZone) => {
        if (isTargetsColision(voidZone, healVoidZone)) {
          voidZone.changeToBig();
          if (!healVoidZone.finish) {
            healVoidZone.changeToSmall(0.3);
          } else {
            //TODO сделать норм удаление войды из массива
            this.healVoides = this.healVoides.filter((item) => !item.finish);
          }
        }
      });
    });

    this.healVoides.forEach((voidZone) => {
      voidZone.draw(this, target);

      if (!this.voidZonesMoveToCreator && this.shield <= this.maxShield / 2) {
        this.voidZonesMoveToCreator = true;
      }

      if (this.voidZonesMoveToCreator && !voidZone.moveTo) {
        voidZone.isMove(true);
      }

      if (voidZone.moveTo) {
        voidZone.moveToCreator(this);
      }

      if (voidZone.finish) {
        //TODO сделать норм удаление войды из массива
        this.healVoides = this.healVoides.filter((item) => !item.finish);
      }
    });
  }
}
