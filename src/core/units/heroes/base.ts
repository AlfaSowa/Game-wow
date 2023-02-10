import {
  createCurrentValue,
  createFillCircle,
  createStrokeCircle,
} from "../../engine/engine";
import { isOnField } from "../../engine/utils";
import { CoreBase } from "../../interfaces";
import { RangeAttack } from "../core/rangeAttack";

type MovesKeys = "KeyW" | "KeyA" | "KeyS" | "KeyD";

class BaseHeroClass extends CoreBase {
  target = { x: window.innerWidth / 2, y: window.innerHeight - 200 };
  coord = { x: window.innerWidth / 2, y: window.innerHeight - 200 };
  heroDamage = 5;
  maxHp = 400;
  curHp = this.maxHp;
  vel = 3;

  color = "#2e94dc";
  radius = 35;

  KeyW = false;
  KeyA = false;
  KeyS = false;
  KeyD = false;

  getTarget = () => {
    this.target = { x: this.mouse.x, y: this.mouse.y };
  };

  drawStuff = () => {
    if (isOnField(this.coord.x, this.coord.y, this.radius)) {
      if (this.KeyD) {
        this.coord.x += this.vel;
      }
      if (this.KeyS) {
        this.coord.y += this.vel;
      }
      if (this.KeyA) {
        this.coord.x -= this.vel;
      }
      if (this.KeyW) {
        this.coord.y -= this.vel;
      }
    }

    if (this.coord.x < this.radius + this.vel) {
      this.coord.x = this.radius + this.vel;
    }
    if (this.coord.x > window.innerWidth - (this.radius + this.vel)) {
      this.coord.x = window.innerWidth - (this.radius + this.vel);
    }
    if (this.coord.y < this.radius + this.vel) {
      this.coord.y = this.radius + this.vel;
    }
    if (this.coord.y > window.innerHeight - (this.radius + this.vel)) {
      this.coord.y = window.innerHeight - (this.radius + this.vel);
    }
  };

  onKeyPress = (e: KeyboardEvent, value: boolean) => {
    if (["KeyW", "KeyA", "KeyS", "KeyD"].includes(e.code)) {
      this[e.code as MovesKeys] = value;
    }
  };

  init() {
    window.addEventListener("keydown", (e) => this.onKeyPress(e, true), false);
    window.addEventListener("keyup", (e) => this.onKeyPress(e, false), false);
  }

  draw() {
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
      7
    );
    createCurrentValue(
      this.ctx,
      this.coord.x,
      this.coord.y,
      this.radius,
      this.maxHp,
      this.curHp,
      "#F12",
      7
    );
  }
}

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

  drawAttack = (objects: any[]) => {
    this.attaks.forEach((attack) => {
      attack.draw(objects, this.heroDamage);

      if (attack.finish) {
        this.attaks = this.attaks.filter((item) => !item.finish);
      }
    });
  };

  init() {
    super.init();
    window.addEventListener("mousedown", this.baseAttack);
  }

  draw = (objects: any[] = []) => {
    super.draw();
    if (this.curHp > 0) {
      this.drawStuff();
      this.drawAttack(objects);
    }
  };
}
