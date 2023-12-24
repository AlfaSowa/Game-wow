import { Engine } from "../engine";
import { HeroBase } from "./units";

export class GameCustom {
  hero: HeroBase | null = null;
  game: any;

  init() {
    const game = new Engine.Game({ isCreated: true });
    const { canvas, context } = game.init({ height: window.innerHeight, width: window.innerWidth });
    this.game = game;

    this.hero = new HeroBase({ maxHp: 500, canvas: canvas, ctx: context });
    this.hero.init();

    game.start(this.draw.bind(this));
  }

  draw() {
    if (this.hero) {
      this.hero.draw();
    }
  }
}
