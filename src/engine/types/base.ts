export type CoreBaseConstructorType = {
  ctx: CanvasRenderingContext2D
}

export type MouseType = {
  x: number
  y: number
  down: boolean
}

export type PositionType = {
  x: number
  y: number
}

export type TargetType = {
  position: PositionType
  radius: number
}

export type MoveMovesKeys = 'KeyW' | 'KeyA' | 'KeyS' | 'KeyD'
