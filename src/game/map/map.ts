import { Sprite } from '../../engine/sprite'

import TailsetImg from '../assets/tileset_version1.1.png'
import { TAILS } from './const'
import { CoreBaseConstructorType, Draw, Engine } from '../../engine'

type TailsetMapConstructorType = CoreBaseConstructorType & {
  tailSize: number
  tailsGap: number
}

const TAIL_SIZE = 16

const AMOUNT_COLS = 16
const AMOUNT_ROWS = 11

export class TailsetMap {
  ctx: CanvasRenderingContext2D
  tails: Array<Sprite[]> = []
  tmp: any[][] = []
  img = new Image()

  redrawMapElapsed: number = 0
  redrawMapHold: number = 1000
  redrawMapPreload: boolean = true

  amountWidth = 0
  amountHeight = 0

  tailSize = 0
  tailsGap = 0

  simpleTiles: boolean = false

  isDynamic: boolean = false

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
      return row.split('-').map((tail, TailIdx) => {
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
              sWidth: img.width / AMOUNT_COLS,
              sHeight: img.height / AMOUNT_ROWS,
              dWidth: img.width / AMOUNT_COLS,
              dHeight: img.height / AMOUNT_ROWS
            }
          },
          ImageSourceComparator: (img) => {
            return {
              sx: (Number(tail) % TAIL_SIZE) * this.tailSize,
              sy: Math.floor(Number(tail) / TAIL_SIZE) * this.tailSize
            }
          }
        })
      })
    })

    for (let i = 0; i < this.tails.length; i++) {
      for (let j = 0; j < this.tails[i].length; j++) {
        this.tails[i][j].draw()
      }
    }

    // for (let i = 0; i < this.amountHeight; i++) {
    //   for (let j = 0; j < this.amountWidth; j++) {
    //     this.getTail(i, j)
    //   }
    // }
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
    if (this.isDynamic) {
      Engine.Helpers.delayToCallback('redrawMapElapsed', 'redrawMapHold', this, () => {
        for (let i = 0; i < this.amountHeight; i++) {
          for (let j = 0; j < this.amountWidth; j++) {
            this.getTail(i, j)
          }
        }
      })
    } else {
      Engine.Helpers.delayToCallback('redrawMapElapsed', 'redrawMapHold', this, () => {
        for (let i = 0; i < this.tails.length; i++) {
          for (let j = 0; j < this.tails[i].length; j++) {
            this.tails[i][j].draw()
          }
        }
      })
    }
  }
}
