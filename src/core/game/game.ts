import { GameCore, CoreOptionsWithoutCoord, MouseType } from "../interfaces";
import { BaseBossClass } from "../units/bosses/base";
import { BaseHeroClassWithRangeAttack } from "../units/heroes/base";

interface IGame {
  hero: any;
  boss: any;
  mouse: MouseType;
  width: number;
  height: number;
}

export class Game extends GameCore implements IGame {
  objects: any[] = [];
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
    this.boss = new BaseBossClass({
      canvas: this.canvas,
      ctx: this.ctx,
      mouse: this.mouse,
    });
    this.hero.init();
    this.boss.init();

    this.objects.push(this.boss);
  }

  drawCursor = () => {
    // this.objects.forEach((obj) => {
    //   if (
    //     this.mouse.x > obj.coord.x - obj.radius &&
    //     this.mouse.x < obj.coord.x + obj.radius &&
    //     this.mouse.y > obj.coord.y - obj.radius &&
    //     this.mouse.y < obj.coord.y + obj.radius
    //   ) {
    //     this.canvas.style.cursor = "crosshair";
    //   } else {
    //     this.canvas.style.cursor = "auto";
    //   }
    // });
    this.canvas.style.cursor = "crosshair";
  };

  draw = () => {
    this.drawCursor();
    this.hero.draw(this.objects);
    this.boss.draw();
  };
}
