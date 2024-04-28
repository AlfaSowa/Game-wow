import { MouseType } from '../../engine'
import { Boss } from '../enemies'
import { TailsetMap } from '../map'
import { PlayerBase } from '../player'

export interface IGameCustom {
  ctx: CanvasRenderingContext2D

  game: any

  tailset: TailsetMap | null

  player: PlayerBase | null
  boss: Boss | null

  entities: Boss[]

  mouse: MouseType

  init(): void

  start(): void

  stop(): void

  pause(): void

  draw(): void
}
