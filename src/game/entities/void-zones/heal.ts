import { CoreBaseConstructorType, Engine, PositionType, TargetType } from '../../../engine'
import { VoidZoneBase } from './base'

export type HealVoidZoneConstructorType = CoreBaseConstructorType & {
  position: PositionType
}

export class HealVoidZone extends VoidZoneBase {
  healOnCollision: number = 1

  constructor({ ctx, position }: HealVoidZoneConstructorType) {
    super({
      ctx,
      position,
      radius: 100,
      color: '#62E200'
    })
  }

  isCollisionWithTargets(target: TargetType) {
    super.isCollisionWithTargets(target)

    const targetA = { position: this.position, radius: this.radius }
    const targetB = { position: target.position, radius: target.radius }

    const isCollision = Engine.Utils.isTargetsColision(targetA, targetB)

    if (isCollision && target.heal && this.radius > 0) {
      this.radius -= 1
      if (this.radius < 10) {
        this.isExists = false
      }

      target.heal(this.healOnCollision)
    }
  }

  draw(target: TargetType): void {
    super.draw(target)
  }
}
