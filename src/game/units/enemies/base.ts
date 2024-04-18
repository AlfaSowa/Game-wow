import { Draw } from "../../../engine";
import { TargetType } from "../../types";
import { UnitBase } from "../base";

export class EnemyBase extends UnitBase {
  init(target: TargetType) {
    super.init();
    this.target = target;
  }

  voidZone() {
    Draw.Circle({ ctx: this.ctx, radius: 8, position: this.target.position, color: "#5400c3" });
  }

  draw() {
    super.draw();
    this.voidZone();
  }
}
