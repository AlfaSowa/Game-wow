import { CreateRender } from '../display'
import { GameInit, GameInitReturn } from './types'

export class Game {
  canvas: HTMLCanvasElement | null = null
  context: CanvasRenderingContext2D | null = null
  animationFrameId: number | null = null
  isCreated: boolean = false
  isClearRect: boolean = true

  constructor({ isCreated, isClearRect = true }: { isCreated: boolean; isClearRect?: boolean }) {
    this.isCreated = isCreated
    this.isClearRect = isClearRect
  }

  init({ height, width, refComponent }: GameInit): GameInitReturn {
    const createRender = new CreateRender({ game: this })
    const { canvas, context } = createRender.create({ height, width, refComponent })
    this.canvas = canvas
    this.context = context

    return { canvas, context }
  }

  start(draw: any) {
    const render = () => {
      if (this.context && this.isClearRect) {
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height)
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
