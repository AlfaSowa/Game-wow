import { CoreBaseConstructorType, Draw, TargetType } from '../../engine'
import { Bar } from '../entities'
import { EnemyBase } from './base'

const WIDTH_HP_BAR = 100
const HEIGHT_HP_BAR = 5
const GAP_HP_BAR = 10

export class Additional extends EnemyBase {
  hpBar: Bar | null = null

  constructor(args: CoreBaseConstructorType) {
    super({ health: 400, position: { x: 100, y: 100 }, ...args })

    this.radius = 40
  }

  init(target: TargetType) {
    super.init(target)
    this.hpBar = new Bar({
      ctx: this.ctx,
      height: HEIGHT_HP_BAR,
      width: WIDTH_HP_BAR,
      position: { x: this.position.x - WIDTH_HP_BAR / 2, y: this.position.y - this.radius - GAP_HP_BAR }
    })
  }

  drawBar() {
    if (this.hpBar) {
      this.hpBar.draw((arg) => {
        return this.currentHealth / (this.health / arg)
      })
    }
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
    this.drawBar()
  }
}
