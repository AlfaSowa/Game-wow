import { CoreBaseConstructorType, Draw, Engine, MouseType, PositionType } from '..'
import { CoreBase, TargetType } from '../types'
import { randomNumber } from '../utils'

export const PI2: number = (2 * Math.PI) / 2

type RangeAttackConstructorType = CoreBaseConstructorType & {
  mouse: MouseType
  position: PositionType
  spread: number
  damage: number[]
}

export class RangeAttack extends CoreBase {
  radius = 8
  finish = false
  vel = 10
  color = '#0dedff'
  position: PositionType = { x: 0, y: 0 }

  #isAffect: boolean = false
  affectRadius = randomNumber([1, 5])

  frameElapsed: number = 0
  frameHold: number = 30

  targetPosition: PositionType = { x: 0, y: 0 }
  targetRadius: number = 0

  damageValue: number[] = [0, 0]

  constructor({ mouse, position, spread, damage, ...args }: RangeAttackConstructorType) {
    super({
      mouse: {
        ...mouse,
        x: mouse.x + randomNumber([-spread, spread]),
        y: mouse.y + randomNumber([-spread, spread])
      },
      ...args
    })

    this.position = { x: position.x, y: position.y }
    this.damageValue = damage
  }

  affect() {
    let delta = {
      x: this.targetPosition.x - this.position.x,
      y: this.targetPosition.y - this.position.y
    }

    // let dist = Math.sqrt(delta.x * delta.x + delta.y * delta.y)

    let angle = Math.atan2(delta.y, delta.x)

    this.position.x -= Math.cos(angle) * 2
    this.position.y -= Math.sin(angle) * 2

    Draw.Circle({
      ctx: this.ctx,
      radius: this.affectRadius,
      position: this.position,
      color: this.color
    })

    this.ctx.strokeStyle = this.color
    this.ctx.beginPath()
    this.ctx.arc(
      this.targetPosition.x,
      this.targetPosition.y,
      this.targetRadius,
      Math.cos(angle),
      Math.PI + (Math.PI * Math.cos(angle)) / 2
    )
    this.ctx.stroke()

    Engine.Helpers.delayToCallback('frameElapsed', 'frameHold', this, () => {
      this.finish = true
    })
  }

  get isAffect() {
    return this.#isAffect
  }

  set isAffect(value: boolean) {
    this.#isAffect = value
  }

  moveProjectile() {
    if (this.position.x !== this.mouse.x || this.position.y !== this.mouse.y) {
      let delta = {
        x: this.mouse.x - this.position.x,
        y: this.mouse.y - this.position.y
      }

      let angle = Math.atan2(delta.y, delta.x)

      if (
        this.position.x > 0 &&
        this.position.x < this.ctx.canvas.width &&
        this.position.y > 0 &&
        this.position.y < this.ctx.canvas.height
      ) {
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
    Draw.Circle({
      ctx: this.ctx,
      radius: this.radius,
      position: this.position,
      color: this.color
    })
    this.moveProjectile()
  }

  isCollisionWithTarget(target: TargetType) {
    const isCollision = Engine.Utils.isTargetsColision(target, this)

    if (isCollision && !this.isAffect) {
      if (target.damage) {
        target.damage(Engine.Utils.randomNumber(this.damageValue))
      }

      this.targetPosition = target.position
      this.targetRadius = target.radius
      this.isAffect = true
    }
  }

  draw() {
    if (!this.#isAffect) {
      this.drawProjectile()
    } else {
      this.affect()
    }
  }
}
