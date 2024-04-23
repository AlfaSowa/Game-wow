import { Sprite } from '../../engine/sprite'

import TailsetImg from '../assets/tileset_version1.1.png'
import { TAILS } from './const'
import { CoreBaseConstructorType, Draw } from '../../engine'

type TailsetMapConstructorType = CoreBaseConstructorType & {
  tailSize: number
  tailsGap: number
}

const TAIL_SIZE_X = 16
const TAIL_SIZE_Y = 11

export class TailsetMap {
  ctx: CanvasRenderingContext2D
  tails: Array<Sprite[]> = []
  tmp: any[][] = []
  img = new Image()

  frameElapsed: number = 0
  frameHold: number = 1000

  amountWidth = 0
  amountHeight = 0

  tailSize = 0
  tailsGap = 0

  simpleTiles: boolean = true

  constructor({ ctx, tailSize, tailsGap }: TailsetMapConstructorType) {
    this.ctx = ctx
    this.img.src = TailsetImg

    this.amountWidth = Math.floor(ctx.canvas.width / tailsGap)
    this.amountHeight = Math.floor(ctx.canvas.height / tailsGap)

    this.tailSize = tailSize
    this.tailsGap = tailsGap
  }

  init() {
    this.tails = TAILS.map((row, rowIdx) => {
      return row.map((tail, TailIdx) => {
        const params = tail.split('-')

        return new Sprite({
          ctx: this.ctx,
          src: TailsetImg,
          position: {
            x: TailIdx * this.tailsGap,
            y: rowIdx * this.tailsGap
          },
          animated: false,
          ImageClipComparator: (img) => {
            return {
              sWidth: img.width / TAIL_SIZE_X,
              sHeight: img.height / TAIL_SIZE_Y,
              dWidth: img.width / TAIL_SIZE_X,
              dHeight: img.height / TAIL_SIZE_Y
            }
          },
          ImageSourceComparator: (img) => {
            return {
              sx: (img.width / TAIL_SIZE_X) * Number(params[0]),
              sy: (img.height / TAIL_SIZE_Y) * Number(params[1])
            }
          }
        })
      })
    })
  }

  getTail(i: number, j: number) {
    const isCorner = i === 0 || j === 0 || j === this.amountWidth - 1 || i === this.amountHeight - 1

    if (this.simpleTiles) {
      this.ctx.fillStyle = isCorner ? '#297d3f' : '#293d3f'
      this.ctx.beginPath()
      this.ctx.fillRect(this.tailsGap * j, this.tailsGap * i, this.tailSize, this.tailSize)
      this.ctx.fill()
    } else {
      if (isCorner) {
        Draw.Image({
          ctx: this.ctx,
          position: { x: this.tailsGap * j, y: this.tailsGap * i },
          src: TailsetImg,
          height: this.tailSize,
          width: this.tailSize
        })
      } else {
        this.ctx.fillStyle = '#297d3f'
        this.ctx.beginPath()
        this.ctx.fillRect(this.tailsGap * j, this.tailsGap * i, this.tailSize, this.tailSize)
        this.ctx.fill()
      }
    }
  }

  draw() {
    for (let i = 0; i < this.amountHeight; i++) {
      for (let j = 0; j < this.amountWidth; j++) {
        this.getTail(i, j)
      }
    }
  }
}
