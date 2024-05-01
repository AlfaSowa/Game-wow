import { Sprite } from '../../engine/sprite'

import TailsetImg from '../assets/tileset_version1.1.png'
import { getMatrixOfTails } from './const'
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
  redrawMapHold: number = 10
  redrawMapPreload: boolean = true

  amountWidth = 0
  amountHeight = 0

  tailSize = 0
  tailsGap = 0

  simpleTiles: boolean = true

  isDynamic: boolean = true

  constructor({ ctx, tailSize, tailsGap }: TailsetMapConstructorType) {
    this.ctx = ctx
    this.img.src = TailsetImg

    this.amountWidth = Math.floor(ctx.canvas.width / tailsGap)
    this.amountHeight = Math.floor(ctx.canvas.height / tailsGap)

    this.tailSize = tailSize
    this.tailsGap = tailsGap
  }

  init() {
    const img = new Image()
    img.src = TailsetImg

    const tails = getMatrixOfTails(this.amountWidth - 2, this.amountHeight)

    img.onload = () => {
      for (let i = 0; i < tails.length; i++) {
        const row = tails[i].split('-').reduce((acc: string[], cur: string) => {
          if (cur.includes('x')) {
            const values = cur.split('x')

            const arr = [...new Array(Number(values[1]))].fill(values[0])

            acc.push(...arr)
          } else {
            acc.push(cur)
          }

          return acc
        }, [])

        for (let j = 0; j < row.length; j++) {
          this.ctx.drawImage(
            img,
            (Number(row[j]) % TAIL_SIZE) * this.tailSize,
            Math.floor(Number(row[j]) / TAIL_SIZE) * this.tailSize,
            img.width / AMOUNT_COLS,
            img.height / AMOUNT_ROWS,
            j * this.tailsGap,
            i * this.tailsGap,
            img.width / AMOUNT_COLS,
            img.height / AMOUNT_ROWS
          )
        }
      }
    }
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
