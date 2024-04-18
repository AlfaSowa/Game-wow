import { CoordsType } from "../../types";

export class HeroBase {
  target = { x: 0, y: 0 };

  setTarget({ mouse }: { mouse: any }) {
    this.target = { x: mouse.x, y: mouse.y };
  }

  baseAttack({ attaks, coord }: { attaks: any[]; coord: CoordsType; mouse: any }) {
    let delta = { x: this.target.x - coord.x, y: this.target.y - coord.y };
    let dist = Math.sqrt(delta.x * delta.x + delta.y * delta.y);

    console.log(dist);

    // attaks.push(new RangeAttack(coord, this.target, dist * 0.04));
  }
}
