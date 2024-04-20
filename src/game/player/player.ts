import { Draw, Engine } from "../../engine";
import { CustomCoreOptions, MouseCoordType, MovesKeys, TargetType } from "../core";
import { UnitBase } from "../units";

type EntitiesType = { mainTarget: any; adds?: any[] };
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

  damage: number = 100;

  color: string = "red";

  constructor({ mouse, ...args }: CustomCoreOptions & { mouse: MouseCoordType }) {
    super({ maxHp: 500, ...args });
    this.mouse = mouse;
  }

  setTarget() {
    this.target = { position: { x: this.mouse.x, y: this.mouse.y }, radius: 100 };
  }

  baseAttack() {
    this.setTarget();

    let delta = { x: this.target.position.x - this.position.x, y: this.target.position.y - this.position.y };
    let dist = Math.sqrt(delta.x * delta.x + delta.y * delta.y);

    const attack = new Engine.RangeAttack({
      canvas: this.canvas,
      ctx: this.ctx,
      mouse: this.mouse,
      position: this.position,
      spread: dist * 0.04,
    });

    this.attaks.push(attack);
  }

  unitMovement() {
    Engine.Helpers.unitMovement(this);
  }

  onKeyPress(e: KeyboardEvent, value: boolean) {
    if (["KeyW", "KeyA", "KeyS", "KeyD"].includes(e.code)) {
      this[e.code as MovesKeys] = value;
    }
  }

  drawAttacks({ mainTarget, adds }: EntitiesType) {
    this.attaks.forEach((attack) => {
      attack.draw();

      if (mainTarget) {
        this.isCollisionWithProjectile(mainTarget, attack);
      }

      if (adds && adds.length > 0) {
        for (let i = 0; i < adds.length; i++) {
          this.isCollisionWithProjectile(adds[i], attack);
        }
      }

      if (attack.finish) {
        this.attaks = this.attaks.filter((item) => !item.finish);
      }
    });
  }

  isCollisionWithTargets({ mainTarget, adds }: EntitiesType) {
    const isCollision = Engine.Utils.isTargetsColision({
      positionTargetA: { position: this.position, radius: this.radius },
      positionTargetB: { position: mainTarget.position, radius: mainTarget.radius },
    });

    if (isCollision) {
      this.color = "grey";
    }

    if (adds && adds.length > 0) {
      for (let i = 0; i < adds.length; i++) {
        const isCollision = Engine.Utils.isTargetsColision({
          positionTargetA: { position: this.position, radius: this.radius },
          positionTargetB: { position: adds[i].position, radius: adds[i].radius },
        });

        if (isCollision) {
          this.color = "grey";
        }
      }
    }
  }

  isCollisionWithProjectile(element: any, projectile: any) {
    const isCollision = Engine.Utils.isTargetsColision({
      positionTargetA: { position: projectile.position, radius: projectile.radius },
      positionTargetB: { position: element.position, radius: element.radius } as TargetType,
    });

    if (isCollision) {
      element.curHp -= this.damage;
      projectile.finish = true;
    }
  }

  init() {
    super.init();

    this.position = { x: window.innerWidth / 2, y: window.innerHeight - 100 };

    window.addEventListener("mousedown", () => this.baseAttack());
    window.addEventListener("keydown", (e) => this.onKeyPress(e, true), false);
    window.addEventListener("keyup", (e) => this.onKeyPress(e, false), false);
  }

  private shape() {
    Draw.Circle({ ctx: this.ctx, radius: this.radius, position: this.position, color: this.color });
    // Draw.Circle({ ctx: this.ctx, radius: this.radius + 10, position: this.position, color: "#000", fill: false });
    // Draw.Circle({ ctx: this.ctx, radius: this.radius, position: this.position, color: "red", fill: false });
  }

  draw({ mainTarget, adds }: EntitiesType) {
    super.draw();

    this.drawAttacks({ mainTarget, adds });
    this.shape();
    this.unitMovement();
    // this.isCollisionWithTargets({ mainTarget, adds });
  }
}
