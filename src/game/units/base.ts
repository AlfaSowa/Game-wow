import { PositionType, TargetType } from '../../engine'
import { Player } from '../player'

export type UnitBaseConstructor = {
  health: number
  ctx: CanvasRenderingContext2D
  position: PositionType
}

export class UnitBase {
  target: TargetType = {
    position: { x: 0, y: 0 },
    radius: 0
  }

  player: Player | null = null

  health: number = 0
  currentHealth: number = 0
  isExist: boolean = true

  attaks: any[] = []

  radius = 35

  canvas: any
  ctx: any

  vel: number = 3

  position: PositionType = { x: 0, y: 0 }

  constructor({ health, ctx, position }: UnitBaseConstructor) {
    this.health = health
    this.currentHealth = health
    this.ctx = ctx
    this.position = position
  }

  init(params?: any) {}

  draw(params?: any) {}
}
