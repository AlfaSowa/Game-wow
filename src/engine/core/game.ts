import { CanvasPool } from '../display'
import { GameInit, GameInitReturn } from './types'

export class Game {
  canvas: HTMLCanvasElement | null = null
  ctx: CanvasRenderingContext2D | null = null
  animationFrameId: number | null = null
  isCreated: boolean = false

  constructor({ isCreated }: { isCreated: boolean }) {
    this.isCreated = isCreated
  }

  init({ height, width, refComponent, alpha }: GameInit): GameInitReturn {
    const canvasPool = new CanvasPool()
    const { canvas, ctx } = canvasPool.create({ height, width, refComponent, alpha })

    this.canvas = canvas
    this.ctx = ctx

    return { ctx }
  }

  start(draw: any) {
    const render = () => {
      if (this.ctx) {
        this.ctx.save()
        this.ctx.setTransform(1, 0, 0, 1, 0, 0)
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
        this.ctx.restore()
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
