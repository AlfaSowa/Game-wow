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
  voidZoneHold: number = 900

  isSucking: boolean = false
  suckingVoidesElapse: number = 0
  suckingVoidesHold: number = 3000

  constructor(args: CoreBaseConstructorType) {
    super({ health: 2000, position: { x: args.ctx.canvas.width / 2, y: 200 }, ...args })
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

  getSuckVoides() {
    Engine.Helpers.delayToCallback('suckingVoidesElapse', 'suckingVoidesHold', this, () => {
      this.isSucking = true
    })
  }

  createFireVoidZones() {
    Engine.Helpers.delayToCallback('voidZoneElapse', 'voidZoneHold', this, () => {
      this.fireVoidZones.push(
        new FireVoidZone({
          ctx: this.ctx,
          position: { x: this.target.position.x, y: this.target.position.y },
          owner: this
        })
      )
    })
  }

  //TODO частично перенести в Bar чтобы не передавать comparator
  drawHealthBar() {
    this.healthBar.draw(this.currentHealth, this.health)
  }

  //TODO подумать как не передавать player
  drawFireVoidZones() {
    if (this.player) {
      for (let i = 0; i < this.fireVoidZones.length; i++) {
        if (this.isSucking && !this.fireVoidZones[i].isMoveToOwner) {
          this.fireVoidZones[i].isMoveToOwner = true
        }

        this.fireVoidZones[i].draw({
          position: this.player.position,
          radius: this.player.radius,
          damage: this.player.damage.bind(this.player)
        })

        if (!this.fireVoidZones[i].isExists) {
          this.fireVoidZones = this.fireVoidZones.filter((item) => item.isExists)
        }
      }
    }
  }

  private shape() {
    if (this.sprite) {
      this.sprite.draw()
    }
  }

  damage(value: number) {
    this.currentHealth -= value

    Draw.Circle({
      ctx: this.ctx,
      radius: this.radius + 20,
      position: this.position,
      color: 'red',
      fill: false
    })
  }

  isCollisionWithTargets() {
    if (this.player) {
      const isCollision = Engine.Utils.isTargetsColision(this.player, this)

      if (isCollision && this.player.damage) {
        this.player.damage(this.damageOnCollision)
      }
    }
  }

  draw() {
    super.draw()

    // if (!this.isSucking) {
    //   this.getSuckVoides()
    //   this.createFireVoidZones()
    // }

    // this.drawFireVoidZones()

    this.isCollisionWithTargets()
    this.shape()
    this.drawHealthBar()
  }
}
