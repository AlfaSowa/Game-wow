import {
  createCurrentValue,
  createFillCircle,
  createStrokeCircle,
} from "../../engine/engine";
import { CoreBase } from "../../interfaces";

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

  init(target: any) {}

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
  }
}
