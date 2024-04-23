import { CoreBaseConstructorType, Draw, Engine, MouseType, PositionType } from '..'
import { CoreBase } from '../types'
import { randomNumber } from '../utils'

export const PI2: number = (2 * Math.PI) / 2

export class RangeAttack extends CoreBase {
  radius = 8
  finish = false
  vel = 10
  color = '#0dedff'
  position: PositionType = { x: 0, y: 0 }

  affectRadius = randomNumber(1, 5)

  frameElapsed: number = 0
  frameHold: number = 30

  isAffectStart: boolean = false

  targetPosition: PositionType = { x: 0, y: 0 }
  targetRadius: number = 0

  constructor({ mouse, position, spread, ...args }: CoreBaseConstructorType & { mouse: MouseType } & { position: PositionType } & { spread: number }) {
    super({
      mouse: {
        ...mouse,
        x: mouse.x + randomNumber(-spread, spread),
        y: mouse.y + randomNumber(-spread, spread)
      },
      ...args
    })

    this.position = { x: position.x, y: position.y }
  }

  affectDraw() {
    let delta = {
      x: this.targetPosition.x - this.position.x,
      y: this.targetPosition.y - this.position.y
    }

    // let dist = Math.sqrt(delta.x * delta.x + delta.y * delta.y)

    let angle = Math.atan2(delta.y, delta.x)

    this.position.x -= Math.cos(angle) * 2
    this.position.y -= Math.sin(angle) * 2

    Draw.Circle({ ctx: this.ctx, radius: this.affectRadius, position: this.position, color: this.color })

    this.ctx.strokeStyle = this.color
    this.ctx.beginPath()
    this.ctx.arc(this.targetPosition.x, this.targetPosition.y, this.targetRadius, Math.cos(angle), Math.PI + (Math.PI * Math.cos(angle)) / 2)
    this.ctx.stroke()

    Engine.Helpers.delayToCallback('frameElapsed', 'frameHold', this, () => {
      this.finish = true
    })
  }

  moveProjectile() {
    if (this.position.x !== this.mouse.x || this.position.y !== this.mouse.y) {
      let delta = {
        x: this.mouse.x - this.position.x,
        y: this.mouse.y - this.position.y
      }

      let angle = Math.atan2(delta.y, delta.x)

      if (this.position.x > 0 && this.position.x < this.ctx.canvas.width && this.position.y > 0 && this.position.y < this.ctx.canvas.height) {
        this.position.x += Math.cos(angle) * this.vel
        this.position.y += Math.sin(angle) * this.vel
        this.mouse.x += Math.cos(angle) * this.vel
        this.mouse.y += Math.sin(angle) * this.vel
      } else {
        this.finish = true
      }
    }
  }

  drawProjectile() {
    if (!this.isAffectStart) {
      Draw.Circle({ ctx: this.ctx, radius: this.radius, position: this.position, color: this.color })
      this.moveProjectile()
    }
  }

  draw() {
    this.drawProjectile()

    if (this.isAffectStart) {
      this.affectDraw()
    }
  }
}
