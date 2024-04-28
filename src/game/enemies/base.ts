import { TargetType } from '../../engine'
import { PlayerBase } from '../player'
import { UnitBase } from '../units'

export class EnemyBase extends UnitBase {
  radius = 100

  init({ target, player }: { target: TargetType; player: PlayerBase }) {
    super.init()
    this.target = target
    this.player = player
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
