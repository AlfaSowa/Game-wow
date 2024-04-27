export type GameInit = {
  width: number
  height: number
  refComponent?: any
  alpha?: boolean
}

export type GameInitReturn = {
  canvas: HTMLCanvasElement
  context: CanvasRenderingContext2D
}
