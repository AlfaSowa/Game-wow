import { Engine } from "../../engine";
import { MouseCoordType, MovesKeys, CustomCoreOptions } from "../types";
import { UnitBase } from "../units";

export class Player extends UnitBase {
  KeyW: boolean = false;
  KeyA: boolean = false;
  KeyS: boolean = false;
  KeyD: boolean = false;

  mouse: MouseCoordType = {
    x: 0,
    y: 0,
    down: false,
  };

  constructor({ mouse, ...args }: CustomCoreOptions & { mouse: MouseCoordType }) {
    super({ maxHp: 500, ...args });
    this.mouse = mouse;
  }

  setTarget() {
    this.target = { position: { x: this.mouse.x, y: this.mouse.y } };
  }

  baseAttack() {
    this.setTarget();

    let delta = { x: this.target.position.x - this.position.x, y: this.target.position.y - this.position.y };
    let dist = Math.sqrt(delta.x * delta.x + delta.y * delta.y);

    const attack = new Engine.RangeAttack({
      canvas: this.canvas,
      ctx: this.ctx,
      mouse: this.mouse,
      coord: this.position,
      spread: dist * 0.04,
    });

    this.attaks.push(attack);
  }

  unitMovement() {
    if (this.KeyD) {
      this.position.x += this.vel;
    }
    if (this.KeyS) {
      this.position.y += this.vel;
    }
    if (this.KeyA) {
      this.position.x -= this.vel;
    }
    if (this.KeyW) {
      this.position.y -= this.vel;
    }
  }

  onKeyPress(e: KeyboardEvent, value: boolean) {
    if (["KeyW", "KeyA", "KeyS", "KeyD"].includes(e.code)) {
      this[e.code as MovesKeys] = value;
    }
  }

  drawAttacks() {
    this.attaks.forEach((attack) => {
      attack.draw();

      if (attack.finish) {
        this.attaks = this.attaks.filter((item) => !item.finish);
      }
    });
  }

  init() {
    super.init();

    this.position = { x: window.innerWidth / 2, y: window.innerHeight - 100 };

    window.addEventListener("mousedown", () => this.baseAttack());
    window.addEventListener("keydown", (e) => this.onKeyPress(e, true), false);
    window.addEventListener("keyup", (e) => this.onKeyPress(e, false), false);
  }

  draw() {
    super.draw();
    this.unitMovement();
    this.drawAttacks();
  }
}
