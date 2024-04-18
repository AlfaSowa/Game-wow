import { Engine } from "../engine";
import { Player } from "./player";
import { MouseCoordType } from "./types";
import { EnemyBase } from "./units/enemies";

export class GameCustom {
  player: Player | null = null;
  enemy: EnemyBase | null = null;

  game: any;

  mouse: MouseCoordType = {
    x: 0,
    y: 0,
    down: false,
  };

  setMousePosition = ({ offsetX, offsetY }: MouseEvent) => {
    [this.mouse.x, this.mouse.y] = [offsetX, offsetY];
  };

  init() {
    const game = new Engine.Game({ isCreated: true });
    this.game = game;

    const { canvas, context } = game.init({ height: window.innerHeight, width: window.innerWidth });

    this.player = new Player({ canvas, ctx: context, mouse: this.mouse });
    this.player.init();

    this.enemy = new EnemyBase({ canvas, ctx: context, maxHp: 500 });
    this.enemy.init({ position: this.player.position });

    canvas.addEventListener("mousemove", this.setMousePosition);
  }

  start() {
    if (this.game) {
      this.game.start(this.draw.bind(this));
    }
  }

  stop() {
    if (this.game) {
      this.game.stop();
    }
  }

  draw() {
    if (this.player) {
      this.player.draw();
    }

    if (this.enemy) {
      this.enemy.draw();
    }
  }
}
