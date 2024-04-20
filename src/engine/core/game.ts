import { CreateRender } from "../display";
import { GameInit, GameInitReturn } from "./types";

export class Game {
  canvas: HTMLCanvasElement | null = null;
  context: CanvasRenderingContext2D | null = null;
  animationFrameId: number | null = null;
  isCreated: boolean = false;

  constructor({ isCreated }: { isCreated: boolean }) {
    this.isCreated = isCreated;
  }

  init({ height, width }: GameInit): GameInitReturn {
    const createRender = new CreateRender({ game: this });
    const { canvas, context } = createRender.create({ height, width });
    this.canvas = canvas;
    this.context = context;

    return { canvas, context };
  }

  start(draw: any) {
    const render = () => {
      if (this.context) {
        this.context.fillStyle = "#f2f2f2";
        this.context.fillRect(0, 0, this.context.canvas.width, this.context.canvas.height);
        // this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
      }
      if (draw) {
        draw();
      }
      this.animationFrameId = window.requestAnimationFrame(render);
    };

    render();
  }

  stop() {
    if (this.animationFrameId) {
      window.cancelAnimationFrame(this.animationFrameId);
    }
  }
}
