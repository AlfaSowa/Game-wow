import { Engine } from "../engine";
import { CustomCoreOptions, MouseCoordType } from "./core";
import { Boss } from "./enemies";
import { Additional } from "./enemies/additional";
import { Player } from "./player";

export class GameCustom {
  canvas: HTMLCanvasElement | null = null;
  ctx: CanvasRenderingContext2D | null = null;

  player: Player | null = null;
  boss: Boss | null = null;
  additional: Additional | null = null;

  entities: any[] = [];

  game: any;

  mouse: MouseCoordType = {
    x: 0,
    y: 0,
    down: false,
  };

  setMousePosition = ({ offsetX, offsetY }: MouseEvent) => {
    [this.mouse.x, this.mouse.y] = [offsetX, offsetY];
  };

  //TODO перенести добавление player.position куда то еще
  initBoss({ canvas, ctx }: CustomCoreOptions) {
    if (this.player) {
      this.boss = new Boss({ canvas, ctx });
      this.boss.init({ position: this.player.position, radius: 100 });
    }
  }

  initPlayer({ canvas, ctx }: CustomCoreOptions) {
    this.player = new Player({ canvas, ctx, mouse: this.mouse });
    this.player.init();
  }

  //TODO перенести добавление player.position куда то еще
  initEntities({ canvas, ctx }: CustomCoreOptions) {
    if (this.player) {
      this.additional = new Additional({ canvas, ctx });
      this.additional.init({ position: this.player.position, radius: 100 });

      this.entities.push(this.additional);
    }
  }

  init() {
    const game = new Engine.Game({ isCreated: true });
    this.game = game;

    const { canvas, context } = game.init({ height: window.innerHeight, width: window.innerWidth });

    this.canvas = canvas;
    this.ctx = context;

    this.initPlayer({ canvas, ctx: context });

    this.initBoss({ canvas, ctx: context });
    this.initEntities({ canvas, ctx: context });

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

  pause() {
    console.log("game pause");
  }

  draw() {
    if (this.boss) {
      this.boss.draw();
    }

    if (this.additional) {
      if (this.additional.exist) {
        this.additional.draw();
      } else {
        this.entities = this.entities.filter((entity) => entity.exist);
        this.additional = null;
      }
    }

    if (this.player) {
      this.player.draw({ mainTarget: this.boss, adds: this.entities });
    }
  }
}
