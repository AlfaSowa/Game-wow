import {
  createCurrentValue,
  createFillCircle,
  createStrokeCircle,
} from "../../engine/engine";
import { CoreBase } from "../../interfaces";
import { VoidZone } from "../../spells/void-zone";

export class BaseBossClass extends CoreBase {
  coord = { x: window.innerWidth / 2, y: 130 };
  radius = 100;
  color = "#6f1b4e";
  maxHp = 500;
  curHp = this.maxHp;
  speed = 1;

  voidZoneCount = 2000;
  voidZoneCountShow = 300;
  voides: any[] = [];
  healVoides: any[] = [];

  maxShield = 300;
  shield = this.maxShield;
  shieldRadius = this.radius + 20;
  shieldColor = "#0d9ad0";

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
        })
      );
    }
    // if (this.voidZoneCount < this.voidZoneCountShow) {
    //   createCurrentValue(
    //     this.ctx,
    //     target.coord.x,
    //     target.coord.y,
    //     target.radius + 10,
    //     this.voidZoneCountShow,
    //     this.voidZoneCount,
    //     "#9c50ff",
    //     4
    //   );
    // }

    // if (this.voidZoneCount <= 0) {
    //   this.voides.push(
    //     new VoidZone({
    //       coord: target.coord,
    //       coreOptions: {
    //         canvas: this.canvas,
    //         ctx: this.ctx,
    //         mouse: this.mouse,
    //       },
    //     })
    //   );
    // } else {
    //   this.voidZoneCount -= 1;
    // }
  };

  init(target: any) {
    this.createvoidZone(target);
    setTimeout(() => {
      this.createvoidZone(target, true, true);
    }, 3000);
  }

  draw(target: any) {
    createFillCircle(
      this.ctx,
      this.coord.x,
      this.coord.y,
      this.radius,
      this.color
    );
    createStrokeCircle(
      this.ctx,
      this.coord.x,
      this.coord.y,
      this.radius,
      "rgba(255,255,255,0.1)",
      10
    );
    createCurrentValue(
      this.ctx,
      this.coord.x,
      this.coord.y,
      this.radius,
      this.maxHp,
      this.curHp,
      "#fff",
      10
    );

    if (this.shield) {
      createStrokeCircle(
        this.ctx,
        this.coord.x,
        this.coord.y,
        this.shieldRadius,
        "rgba(13,154,208,0.1"
      );
      createCurrentValue(
        this.ctx,
        this.coord.x,
        this.coord.y,
        this.shieldRadius,
        this.maxShield,
        this.shield,
        this.shieldColor,
        4
      );
    }

    this.voides.forEach((voidZone) => {
      voidZone.draw(this, target);

      if (voidZone.finish) {
        this.voides = this.voides.filter((item) => !item.finish);
      }
    });

    this.healVoides.forEach((voidZone) => {
      voidZone.draw(this, target);

      if (this.shield <= this.maxShield / 2) {
        voidZone.move(this);
      }
      if (voidZone.finish) {
        this.healVoides = this.healVoides.filter((item) => !item.finish);
      }
    });
  }
}
