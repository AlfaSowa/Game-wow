import { CoreBaseConstructorType, Engine, PositionType, TargetType } from '../../../engine'
import { VoidZoneBase } from './base'

export type FireVoidZoneConstructorType = CoreBaseConstructorType & {
  position: PositionType
}

export class FireVoidZone extends VoidZoneBase {
  constructor({ ctx, position }: FireVoidZoneConstructorType) {
    super({
      ctx,
      position,
      radius: 100,
      color: 'red',
      expansionHold: 10,
      isExpansion: true,
      isReadyHold: 200,
      maxRadius: 200,
      isInstant: false
    })
  }

  isCollisionWithTargets(target: TargetType) {
    super.isCollisionWithTargets(target)

    const isCollision = Engine.Utils.isTargetsColision({
      positionTargetA: { position: this.position, radius: this.radius },
      positionTargetB: { position: target.position, radius: target.radius }
    })

    if (isCollision && target.affectWithTarget) {
      target.affectWithTarget(0.5)
    }
  }
}
