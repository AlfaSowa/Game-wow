import { Game } from '../../core'
import { CanvasPool } from './canvas-pool'
import { CreateRenderConstructor, CreateRenderCreate } from './types'

export class CreateRender {
  game: Game | null = null
  constructor({ game }: CreateRenderConstructor) {
    this.game = game
  }

  create({ height, width, refComponent }: CreateRenderCreate) {
    const canvasPool = new CanvasPool()
    return canvasPool.create({ parent: this.game, height, width, refComponent })
  }
}
