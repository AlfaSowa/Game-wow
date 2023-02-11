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
    }, 5000);

    setInterval(() => {
      this.createvoidZone(target);
    }, 8000);
  }

  draw(target: any) {
    super.draw(target);
    this.voides.forEach((voidZone) => {
      voidZone.draw(this, target);

      if (voidZone.finish) {
        this.voides = this.voides.filter((item) => !item.finish);
      }
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
        this.healVoides = this.healVoides.filter((item) => !item.finish);
      }
    });
  }
}
