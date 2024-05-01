import { CoreBaseConstructorType, Engine, PositionType, TargetType } from '../../../engine'
import { Boss } from '../../enemies'
import { VoidZoneBase } from './base'

export type FireVoidZoneConstructorType = CoreBaseConstructorType & {
  position: PositionType
  owner: Boss
}

export class FireVoidZone extends VoidZoneBase {
  damageOnCollision: number = 1

  vel: number = 1

  isMoveToOwner: boolean = false

  owner: Boss | null = null
  ownerHeal: number = 10

  constructor({ ctx, position, owner }: FireVoidZoneConstructorType) {
    super({
      ctx,
      position,
      radius: 100,
      color: '#FF5504',
      expansionHold: 10,
      isExpansion: true,
      isReadyHold: 200,
      maxRadius: 200,
      isInstant: false
    })

    this.owner = owner
  }

  isCollisionWithTargets(target: TargetType) {
    super.isCollisionWithTargets(target)

    const isCollision = Engine.Utils.isTargetsColision(target, this)

    if (isCollision && target.damage) {
      target.damage(this.damageOnCollision)
    }
  }

  moveToOwner() {
    if (this.owner) {
      Engine.Utils.moveElementToTarget({ element: this, target: this.owner })

      const targetA = { position: this.position, radius: this.radius }
      const targetB = { position: this.owner.position, radius: this.owner.radius }

      const isCollision = Engine.Utils.isTargetsColision(targetA, targetB)

      if (isCollision) {
        if (this.owner.currentHealth < this.owner.health) {
          const amountOfHeal = this.owner.currentHealth + this.ownerHeal
          this.owner.currentHealth = amountOfHeal > this.owner.health ? this.owner.health : amountOfHeal
        }
        this.radius -= 3

        if (this.radius < 10) {
          this.isExists = false
        }
      }
    }
  }

  draw(target: TargetType): void {
    super.draw(target)

    if (this.isMoveToOwner) {
      this.moveToOwner()
    }
  }
}
