import { createFillCircle } from "../../engine/engine";
import { CoreBase } from "../../interfaces";
import { RangeAttack } from "../core/rangeAttack";

class BaseHeroClass extends CoreBase {
  target = { x: window.innerWidth / 2, y: window.innerHeight - 200 };
  coord = { x: window.innerWidth / 2, y: window.innerHeight - 200 };

  color = "#2e94dc";
  radius = 35;

  getTarget = () => {
    this.target = { x: this.mouse.x, y: this.mouse.y };
  };

  // drawAttack = (objects: any) => {
  //   this.attaks.forEach((attack: any) => {
  //     attack.draw(objects, this.heroDamage);

  //     if (attack.finish) {
  //       this.attaks = this.attaks.filter((item) => !item.finish);
  //     }
  //   });
  // };

  draw() {
    createFillCircle(
      this.ctx,
      this.coord.x,
      this.coord.y,
      this.radius,
      this.color
    );
  }
}

// export class BaseHeroClassWithMeleeAttack extends BaseHeroClass {
//   attaks = [];
//   baseAttack = () => {
//     this.attaks.push(new MeleeAttack());
//   };
// }

export class BaseHeroClassWithRangeAttack extends BaseHeroClass {
  attaks: any[] = [];
  baseAttack = () => {
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
  };

  drawAttack = () => {
    this.attaks.forEach((attack) => {
      attack.draw();

      if (attack.finish) {
        this.attaks = this.attaks.filter((item) => !item.finish);
      }
    });
  };

  init() {
    window.addEventListener("mousedown", this.baseAttack);
  }

  draw = () => {
    super.draw();
    this.drawAttack();
  };
}
