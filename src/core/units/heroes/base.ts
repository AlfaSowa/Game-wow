import { RangeAttack } from "../core/rangeAttack";
import { BaseHeroClass } from "./interfaces";

export class BaseHeroClassWithRangeAttack extends BaseHeroClass {
  attaks: any[] = [];

  baseAttack() {
    let delta = {
      x: this.mouse.x - this.coord.x,
      y: this.mouse.y - this.coord.y,
    };
    let dist = Math.sqrt(delta.x * delta.x + delta.y * delta.y);

    this.attaks.push(
      new RangeAttack(this.coord, this.mouse, dist * 0.04, {
        canvas: this.canvas,
        ctx: this.ctx,
        mouse: this.mouse,
      })
    );
  }

  drawAttack(targets: any[]) {
    this.attaks.forEach((attack) => {
      attack.draw(targets, this.heroDamage);

      if (attack.finish) {
        this.attaks = this.attaks.filter((item) => !item.finish);
      }
    });
  }

  init() {
    super.init();
    window.addEventListener("mousedown", () => this.baseAttack());
  }

  draw(targets: any[] = []) {
    super.draw();
    if (this.curHp > 0) {
      this.drawStuff();
      this.drawAttack(targets);
    }
  }
}
