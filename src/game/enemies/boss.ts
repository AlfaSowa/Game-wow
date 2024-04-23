import { Sprite } from '../../engine/sprite'
import { Bar } from '../entities'
import { EnemyBase } from './base'
import bossIdleImg from '../assets/ghost-idle.png'
import { CoreBaseConstructorType, Draw, TargetType } from '../../engine'

export class Boss extends EnemyBase {
  healthBar: Bar
  sprite: Sprite | null = null
  damageOnCollision: number = 1

  constructor(args: CoreBaseConstructorType) {
    super({ health: 500, position: { x: args.ctx.canvas.width / 2, y: 100 }, ...args })
    this.healthBar = new Bar({ ctx: this.ctx })
  }

  init(target: TargetType) {
    super.init(target)

    this.sprite = new Sprite({
      ctx: this.ctx,
      src: bossIdleImg,
      position: this.position,
      ImageClipComparator: (img) => {
        return {
          sWidth: img.width / 7,
          sHeight: img.height,
          dWidth: (img.width / 7) * 2.5,
          dHeight: img.height * 2.5
        }
      },
      ImageSourceComparator: (img, curFrame = 0) => {
        return {
          sx: curFrame * (img.width / 7),
          sy: 0
        }
      },
      isCentered: true,
      maxFrames: 7,
      frameHold: 20
    })
  }

  drawHealthBar() {
    this.healthBar.draw((arg) => {
      return this.currentHealth / (this.health / arg)
    })
  }

  private shape() {
    if (this.sprite) {
      this.sprite.draw()
    }
  }

  affectWithTakeDamage(damage: number) {
    this.currentHealth -= damage
    Draw.Circle({ ctx: this.ctx, radius: this.radius + 20, position: this.position, color: 'red', fill: false })
  }

  draw() {
    super.draw()
    this.shape()
    this.drawHealthBar()
  }
}
