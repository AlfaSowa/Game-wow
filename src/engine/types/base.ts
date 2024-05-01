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
  width?: number
  height?: number
  damage?: (damage: number) => void
  heal?: (heal: number) => void
}

export type MoveMovesKeys = 'KeyW' | 'KeyA' | 'KeyS' | 'KeyD'
export type SpellsKeys = 'KeyQ' | 'KeyE'
