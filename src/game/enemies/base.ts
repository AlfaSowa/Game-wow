import { TargetType } from '../../engine'
import { UnitBase } from '../units'

export class EnemyBase extends UnitBase {
  radius = 100

  init(target: TargetType) {
    super.init()
    this.target = target
  }

  getIsExist() {
    if (this.currentHealth <= 0) {
      this.isExist = false
    }
  }

  draw() {
    super.draw()
    this.getIsExist()
  }
}
