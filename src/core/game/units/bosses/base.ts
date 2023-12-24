import { CoreBase } from "../../../shared";

export class BaseBossClass extends CoreBase {
  coord = { x: window.innerWidth / 2, y: 130 };
  radius = 100;
  color = "#6f1b4e";
  maxHp = 500;
  curHp = this.maxHp;
  speed = 1;

  maxShield = 300;
  shield = this.maxShield;
  shieldRadius = this.radius + 20;
  shieldColor = "#0d9ad0";

  init(target: any) {}

  draw(target: any) {
    // createFillCircle({
    //   ctx: this.ctx,
    //   x: this.coord.x,
    //   y: this.coord.y,
    //   radius: this.radius,
    //   color: this.color,
    // });
    // createStrokeCircle({
    //   color: this.color,
    //   ctx: this.ctx,
    //   lineWidth: 10,
    //   radius: this.radius,
    //   x: this.coord.x,
    //   y: this.coord.y,
    // });
    // createCurrentValue({
    //   color: "#fff",
    //   ctx: this.ctx,
    //   radius: this.radius,
    //   x: this.coord.x,
    //   y: this.coord.y,
    //   curValue: this.curHp,
    //   lineWidth: 10,
    //   maxValue: this.maxHp,
    // });
    // if (this.shield) {
    //   createStrokeCircle({
    //     color: "rgba(13,154,208,0.1",
    //     ctx: this.ctx,
    //     radius: this.shieldRadius,
    //     x: this.coord.x,
    //     y: this.coord.y,
    //   });
    //   createCurrentValue({
    //     color: this.shieldColor,
    //     ctx: this.ctx,
    //     radius: this.shieldRadius,
    //     x: this.coord.x,
    //     y: this.coord.y,
    //     curValue: this.shield,
    //     lineWidth: 4,
    //     maxValue: this.maxShield,
    //   });
    // }
  }
}
