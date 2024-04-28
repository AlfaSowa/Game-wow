import { Sprite } from '../../engine/sprite'
import { Bar, FireVoidZone } from '../entities'
import { EnemyBase } from './base'
import bossIdleImg from '../assets/ghost-idle.png'
import { CoreBaseConstructorType, Draw, Engine, TargetType } from '../../engine'
import { PlayerBase } from '../player'

export class Boss extends EnemyBase {
  healthBar: Bar
  sprite: Sprite | null = null
  damageOnCollision: number = 1

  fireVoidZones: FireVoidZone[] = []
  voidZoneElapse: number = 0
  voidZoneHold: number = 1000

  constructor(args: CoreBaseConstructorType) {
    super({ health: 500, position: { x: args.ctx.canvas.width / 2, y: 100 }, ...args })
    this.healthBar = new Bar({ ctx: this.ctx })
  }

  init({ target, player }: { target: TargetType; player: PlayerBase }) {
    super.init({ target, player })

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

  createFireVoidZones() {
    Engine.Helpers.delayToCallback('voidZoneElapse', 'voidZoneHold', this, () => {
      this.fireVoidZones.push(
        new FireVoidZone({
          ctx: this.ctx,
          position: { x: this.target.position.x, y: this.target.position.y }
        })
      )
    })
  }

  //TODO частично перенести в Bar чтобы не передавать comparator
  drawHealthBar() {
    this.healthBar.draw((arg) => {
      return this.currentHealth / (this.health / arg)
    })
  }

  //TODO подумать как не передавать player
  drawFireVoidZones() {
    // if (this.player) {
    //   for (let i = 0; i < this.fireVoidZones.length; i++) {
    //     this.fireVoidZones[i].draw({
    //       position: this.player.position,
    //       radius: this.player.radius,
    //       affectWithTarget: this.player.affectWithTarget.bind(this.player)
    //     })
    //   }
    // }
  }

  private shape() {
    if (this.sprite) {
      this.sprite.draw()
    }
  }

  //TODO подумать нат неймингом
  affectWithTakeDamage(damage: number) {
    this.currentHealth -= damage
    Draw.Circle({
      ctx: this.ctx,
      radius: this.radius + 20,
      position: this.position,
      color: 'red',
      fill: false
    })
  }

  draw() {
    super.draw()
    this.createFireVoidZones()
    this.drawFireVoidZones()
    this.shape()
    this.drawHealthBar()
  }
}
