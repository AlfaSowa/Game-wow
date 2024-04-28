import { Game } from '../../core'

export type CanvasPoolCreate = {
  width: number
  height: number
  refComponent?: any
  alpha?: boolean
}
export type CanvasPoolCreateReturn = {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
}

export type CreateRenderConstructor = {
  game: Game
}
export type CreateRenderCreate = {
  width: number
  height: number
  refComponent?: any
  alpha?: boolean
}
