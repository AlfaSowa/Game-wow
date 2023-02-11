import { isMouseOnTarget } from "../engine/utils";
import { GameCore, CoreOptionsWithoutCoord, MouseType } from "../interfaces";
import { FireBoss } from "../units/bosses/fire-boss";
import { BaseHeroClassWithRangeAttack } from "../units/heroes/base";

interface IGame {
  hero: any;
  boss: any;
  mouse: MouseType;
  width: number;
  height: number;
}

export class Game extends GameCore implements IGame {
  heroTargets: any[] = [];
  height: number;
  width: number;
  mouse: MouseType;
  hero: any;
  boss: any;

  constructor({ canvas, ctx }: CoreOptionsWithoutCoord) {
    super({ canvas, ctx });
    this.width = this.canvas.width;
    this.height = this.canvas.height;

    this.mouse = {
      x: this.width / 2,
      y: this.height / 2,
      down: false,
    };
  }

  setPos = ({ layerX, layerY }: any) => {
    [this.mouse.x, this.mouse.y] = [layerX, layerY];
  };

  init() {
    this.canvas.addEventListener("mousemove", this.setPos);

    this.hero = new BaseHeroClassWithRangeAttack({
      canvas: this.canvas,
      ctx: this.ctx,
      mouse: this.mouse,
    });
    this.boss = new FireBoss({
      canvas: this.canvas,
      ctx: this.ctx,
      mouse: this.mouse,
    });
    this.hero.init();
    this.boss.init(this.hero);

    this.heroTargets.push(this.boss);
  }

  drawCursor = () => {
    this.heroTargets.forEach((target) => {
      if (isMouseOnTarget(this.mouse, target)) {
        this.canvas.style.cursor = "crosshair";
      } else {
        this.canvas.style.cursor = "auto";
      }
    });
  };

  draw = () => {
    this.drawCursor();
    this.hero.draw(this.heroTargets);
    this.boss.draw(this.hero);
  };
}
