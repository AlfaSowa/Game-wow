import { Draw } from '../../engine'
import { CoreBaseConstructorType, PositionType } from '../../engine/types'

type BarConstructorType = CoreBaseConstructorType & {
  width?: number
  height?: number
  position?: PositionType
  color?: string
  value?: number
}

type ComparatorType = 'inc' | 'dec'
export class Bar {
  ctx: CanvasRenderingContext2D

  width: number = 400
  height: number = 20

  position: PositionType = { x: 0, y: 0 }

  value: number

  color: string

  constructor({ ctx, height, position, width, color, value }: BarConstructorType) {
    this.ctx = ctx
    this.height = height || 20
    this.width = width || 400
    this.value = value ?? width ?? 400
    this.position = position || { x: ctx.canvas.width / 2 - this.width / 2, y: 16 }

    this.color = color || 'red'
  }

  init() {}

  draw(comparator: (arg: number) => number, type: ComparatorType = 'dec') {
    Draw.Rect({
      ctx: this.ctx,
      position: this.position,
      color: '#000',
      height: this.height,
      width: this.width,
      fill: false
    })

    if (type === 'dec' ? this.value > 0 : this.value < this.width) {
      this.value = comparator(this.width)
    }

    Draw.Rect({
      ctx: this.ctx,
      position: this.position,
      color: this.color,
      height: this.height,
      width: this.value
    })
  }
}
