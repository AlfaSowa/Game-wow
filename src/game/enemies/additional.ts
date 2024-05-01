import { CoreBaseConstructorType, Draw, TargetType } from '../../engine'
import { Bar } from '../entities'
import {} from '../player'
import { PlayerBase } from '../player/base'
import { EnemyBase } from './base'

const WIDTH_HP_BAR = 100
const HEIGHT_HP_BAR = 5
const GAP_HP_BAR = 10

export class Additional extends EnemyBase {
  constructor(args: CoreBaseConstructorType) {
    super({ health: 400, position: { x: 100, y: 100 }, ...args })

    this.radius = 40
  }

  init({ target, player }: { target: TargetType; player: PlayerBase }) {
    super.init({ player, target })
  }

  private shape() {
    Draw.Circle({
      ctx: this.ctx,
      radius: this.radius,
      position: this.position,
      color: this.isExist ? 'green' : 'purple'
    })
  }

  draw() {
    super.draw()
    this.shape()
  }
}
