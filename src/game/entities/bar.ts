import { Draw } from '../../engine'
import { CoreBaseConstructorType, PositionType } from '../../engine/types'

type BarConstructorType = CoreBaseConstructorType & {
  width?: number
  height?: number
  position?: PositionType
  color?: string
  subColor?: string
  value?: number
}

const OVERLAY_SIZE = 6
const CURRENT_HP_MARKER_HEIGHT = 4
export class Bar {
  ctx: CanvasRenderingContext2D

  width: number = 400
  height: number = 15

  position: PositionType = { x: 0, y: 0 }

  value: number
  valueView: number

  color: string = '#FF1800'
  subColor: string = '#750B00'
  overlayColor: string = 'rgba(67, 67, 67, 0.4)'

  constructor({ ctx, height, position, width, color, value, subColor }: BarConstructorType) {
    this.ctx = ctx
    this.height = height || this.height
    this.width = width || this.width

    this.value = value ?? width ?? this.width
    this.valueView = this.value

    this.position = position || { x: ctx.canvas.width / 2 - this.width / 2, y: 10 }
    this.color = color || this.color
    this.subColor = subColor || this.subColor
  }

  init() {}

  draw(curValue: number, maxValue: number) {
    Draw.Rect({
      ctx: this.ctx,
      position: { x: this.position.x - OVERLAY_SIZE / 2, y: this.position.y - OVERLAY_SIZE / 2 },
      color: this.overlayColor,
      height: this.height + OVERLAY_SIZE,
      width: this.width + OVERLAY_SIZE
    })

    Draw.Rect({
      ctx: this.ctx,
      position: this.position,
      color: this.subColor,
      height: this.height,
      width: this.width
    })

    let result = Math.floor((curValue > maxValue ? maxValue : curValue) / (maxValue / this.width))

    if (this.valueView > 0) {
      if (result < this.value) {
        this.value = result <= 0 ? 0 : result
      }

      if (result > this.value) {
        this.value = result >= this.width ? this.width : result
      }

      if (this.valueView > this.value) {
        this.valueView -= 1
      }

      if (this.valueView < this.value) {
        this.valueView += 1
      }
    }

    Draw.Rect({
      ctx: this.ctx,
      position: this.position,
      color: this.color,
      height: this.height,
      width: this.valueView
    })

    if (this.valueView < this.width) {
      Draw.Rect({
        ctx: this.ctx,
        position: {
          x: this.ctx.canvas.width / 2 - this.width / 2 + this.valueView,
          y: this.position.y - CURRENT_HP_MARKER_HEIGHT / 2
        },
        color: 'white',
        height: this.height + CURRENT_HP_MARKER_HEIGHT,
        width: 2
      })
    }
  }
}
