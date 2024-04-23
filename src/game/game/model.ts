import { MouseType } from '../../engine'
import { Boss } from '../enemies'
import { TailsetMap } from '../map'
import { Player } from '../player'

export interface IGameCustom {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D

  game: any

  tailset: TailsetMap | null

  player: Player | null
  boss: Boss | null

  entities: Boss[]

  mouse: MouseType

  init(): void

  start(): void

  stop(): void

  pause(): void

  draw(): void
}
