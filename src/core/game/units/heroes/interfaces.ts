import { CoreBase } from "../../../shared";

type MovesKeys = "KeyW" | "KeyA" | "KeyS" | "KeyD";

export class BaseHeroClass extends CoreBase {
  // target: CoordsType = {
  //   x: window.innerWidth / 2,
  //   y: window.innerHeight - 200,
  // };
  // coord: CoordsType = { x: window.innerWidth / 2, y: window.innerHeight - 200 };
  // heroDamage: number = 2;
  // maxHp: number = 400;
  // curHp: number = this.maxHp;
  // vel: number = 3;
  // color: string = "#2e94dc";
  // radius: number = 35;
  // KeyW: boolean = false;
  // KeyA: boolean = false;
  // KeyS: boolean = false;
  // KeyD: boolean = false;
  // getTarget() {
  //   this.target = { x: this.mouse.x, y: this.mouse.y };
  // }
  // drawStuff() {
  //   if (isOnCanavasField(this.coord.x, this.coord.y, this.radius)) {
  //     if (this.KeyD) {
  //       this.coord.x += this.vel;
  //     }
  //     if (this.KeyS) {
  //       this.coord.y += this.vel;
  //     }
  //     if (this.KeyA) {
  //       this.coord.x -= this.vel;
  //     }
  //     if (this.KeyW) {
  //       this.coord.y -= this.vel;
  //     }
  //   }
  //   if (this.coord.x < this.radius + this.vel) {
  //     this.coord.x = this.radius + this.vel;
  //   }
  //   if (this.coord.x > window.innerWidth - (this.radius + this.vel)) {
  //     this.coord.x = window.innerWidth - (this.radius + this.vel);
  //   }
  //   if (this.coord.y < this.radius + this.vel) {
  //     this.coord.y = this.radius + this.vel;
  //   }
  //   if (this.coord.y > window.innerHeight - (this.radius + this.vel)) {
  //     this.coord.y = window.innerHeight - (this.radius + this.vel);
  //   }
  // }
  // onKeyPress(e: KeyboardEvent, value: boolean) {
  //   if (["KeyW", "KeyA", "KeyS", "KeyD"].includes(e.code)) {
  //     this[e.code as MovesKeys] = value;
  //   }
  // }
  // init() {
  //   window.addEventListener("keydown", (e) => this.onKeyPress(e, true), false);
  //   window.addEventListener("keyup", (e) => this.onKeyPress(e, false), false);
  // }
  // draw() {
  //   createFillCircle(
  //     this.ctx,
  //     this.coord.x,
  //     this.coord.y,
  //     this.radius,
  //     this.color
  //   );
  //   createStrokeCircle(
  //     this.ctx,
  //     this.coord.x,
  //     this.coord.y,
  //     this.radius,
  //     "rgba(255,255,255,0.1)",
  //     7
  //   );
  //   createCurrentValue(
  //     this.ctx,
  //     this.coord.x,
  //     this.coord.y,
  //     this.radius,
  //     this.maxHp,
  //     this.curHp,
  //     "#F12",
  //     7
  //   );
  // }
}
