import { TargetType } from "../core";
import { UnitBase } from "../units";

export class EnemyBase extends UnitBase {
  radius = 100;

  init(target: TargetType) {
    super.init();
    this.target = target;
  }

  isExist() {
    if (this.curHp <= 0) {
      this.exist = false;
    }
  }

  draw() {
    super.draw();
    this.isExist();
  }
}
