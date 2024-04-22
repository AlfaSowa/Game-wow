export type GameInit = {
  width: number
  height: number
  refComponent?: any
}

export type GameInitReturn = {
  canvas: HTMLCanvasElement
  context: CanvasRenderingContext2D
}
