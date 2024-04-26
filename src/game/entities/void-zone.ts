import { CoreBaseConstructorType, Draw, Engine, PositionType, TargetType } from '../../engine'
import { Player } from '../player'

export const PI2: number = 2 * Math.PI

export type VoidZoneConstructorType = CoreBaseConstructorType & {
  position: PositionType
  radius: number
  maxRadius?: number
  damage?: number
  heal?: number
  expansionHold?: number
  isExpansion?: boolean
  isInstant?: boolean
  isReadyHold?: number
  color?: string
}

interface IVoidZone {
  ctx: CanvasRenderingContext2D

  position: PositionType

  radius: number
  maxRadius: number

  damage: number
  heal: number

  isExpansion: boolean
  expansionElapse: number
  expansionHold: number

  isReady: boolean
  isReadyElapse: number
  isReadyHold: number

  color: string
}

export class VoidZone implements IVoidZone {
  ctx

  position

  radius
  maxRadius = 0

  damage = 0
  heal = 0

  isExpansion = false
  expansionElapse = 0
  expansionHold = 10

  isReady = false
  isReadyElapse = 0
  isReadyHold = 500

  isInstant = true

  color: string = '#8805A8'

  constructor({
    ctx,
    position,
    maxRadius,
    radius,
    damage,
    expansionHold,
    isExpansion,
    isInstant,
    isReadyHold,
    color,
    heal
  }: VoidZoneConstructorType) {
    this.ctx = ctx
    this.position = position
    this.maxRadius = maxRadius ?? radius
    this.radius = radius
    this.damage = damage ?? this.damage
    this.heal = heal ?? this.heal
    this.expansionHold = expansionHold ?? this.expansionHold
    this.isExpansion = isExpansion ?? this.isExpansion
    this.isInstant = isInstant ?? this.isInstant
    this.isReadyHold = isReadyHold ?? this.isReadyHold
    this.color = color ?? this.color
  }

  territoryExpansion() {
    Engine.Helpers.delayToCallback('expansionElapse', 'expansionHold', this, () => {
      this.radius += 0.1
    })
  }

  setIsReady(target: TargetType) {
    Engine.Helpers.delayToCallback('isReadyElapse', 'isReadyHold', this, () => {
      this.position = { x: target.position.x, y: target.position.y }
      this.isReady = true
    })
  }

  isCollisionWithTargets(target: TargetType) {
    const isCollision = Engine.Utils.isTargetsColision({
      positionTargetA: { position: this.position, radius: this.radius },
      positionTargetB: { position: target.position, radius: target.radius }
    })

    if (isCollision) {
      Draw.Circle({
        ctx: this.ctx,
        radius: target.radius,
        position: target.position,
        color: 'red',
        fill: false
      })

      if (this.damage && target.affectWithTarget) {
        target.affectWithTarget(this.damage)
      }
      if (this.heal && target.healWithTarget) {
        target.healWithTarget(this.heal)
      }
    }
  }

  instantDraw(target: TargetType) {
    Draw.Circle({ ctx: this.ctx, radius: this.radius, position: this.position, color: this.color })
    this.isCollisionWithTargets(target)
  }

  delayDraw(target: TargetType) {
    if (this.isReady) {
      if (this.isExpansion && this.radius < this.maxRadius) {
        this.territoryExpansion()
      }

      Draw.Circle({ ctx: this.ctx, radius: this.radius, position: this.position, color: this.color })
      this.isCollisionWithTargets(target)
    } else {
      this.setIsReady(target)

      this.ctx.beginPath()
      this.ctx.strokeStyle = '#62E200'
      this.ctx.arc(
        target.position.x,
        target.position.y,
        this.radius,
        0,
        (PI2 / 100) * ((100 / this.isReadyHold) * this.isReadyElapse)
      )
      this.ctx.stroke()
    }
  }

  draw(target: TargetType) {
    if (this.isInstant) {
      this.instantDraw(target)
    } else {
      this.delayDraw(target)
    }
  }
}
