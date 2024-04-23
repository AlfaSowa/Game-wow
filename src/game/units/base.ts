import { PositionType, TargetType } from '../../engine'

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
