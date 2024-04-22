import { Draw } from "../../engine";
import { CustomCoreOptions, TargetType } from "../core";
import { Bar } from "../entities";
import { EnemyBase } from "./base";

export class Boss extends EnemyBase {
  hpBar: Bar | null = null;

  constructor(args: CustomCoreOptions) {
    super({ maxHp: 800, ...args });
  }

  init(target: TargetType) {
    super.init(target);
    this.hpBar = new Bar({ ctx: this.ctx });
  }

  drawBar() {
    if (this.hpBar) {
      this.hpBar.draw((arg) => {
        return this.curHp / (this.maxHp / arg);
      });
    }
  }

  private shape() {
    Draw.Circle({
      ctx: this.ctx,
      radius: this.radius,
      position: this.position,
      color: this.exist ? "green" : "purple",
    });
  }

  draw() {
    super.draw();
    this.shape();
    this.drawBar();
  }
}
