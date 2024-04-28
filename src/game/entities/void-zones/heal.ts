import { CoreBaseConstructorType, Engine, PositionType, TargetType } from '../../../engine'
import { VoidZoneBase } from './base'

export type HealVoidZoneConstructorType = CoreBaseConstructorType & {
  position: PositionType
}

export class HealVoidZone extends VoidZoneBase {
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

    const isCollision = Engine.Utils.isTargetsColision({
      positionTargetA: { position: this.position, radius: this.radius },
      positionTargetB: { position: target.position, radius: target.radius }
    })

    if (isCollision && target.healWithTarget && this.radius > 0) {
      this.radius -= 1
      if (this.radius < 10) {
        this.isExists = false
      }

      target.healWithTarget(0.1)
    }
  }

  draw(target: TargetType): void {
    super.draw(target)
  }
}
