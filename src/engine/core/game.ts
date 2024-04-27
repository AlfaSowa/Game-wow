import { CreateRender } from '../display'
import { GameInit, GameInitReturn } from './types'

export class Game {
  canvas: HTMLCanvasElement | null = null
  context: CanvasRenderingContext2D | null = null
  animationFrameId: number | null = null
  isCreated: boolean = false

  constructor({ isCreated }: { isCreated: boolean }) {
    this.isCreated = isCreated
  }

  init({ height, width, refComponent, alpha }: GameInit): GameInitReturn {
    const createRender = new CreateRender({ game: this })
    const { canvas, context } = createRender.create({ height, width, refComponent, alpha })
    this.canvas = canvas
    this.context = context

    return { canvas, context }
  }

  start(draw: any) {
    const render = () => {
      if (this.context) {
        this.context.save()
        this.context.setTransform(1, 0, 0, 1, 0, 0)
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height)
        this.context.restore()
      }

      if (draw) {
        draw()
      }

      this.animationFrameId = window.requestAnimationFrame(render)
    }

    render()
  }

  stop() {
    if (this.animationFrameId) {
      window.cancelAnimationFrame(this.animationFrameId)
    }
  }
}
