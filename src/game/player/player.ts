import { CoreBaseConstructorType, Draw, Engine, MouseType, MoveMovesKeys, TargetType } from '../../engine'
import { Sprite } from '../../engine/sprite'
import { UnitBase } from '../units'
import testNPCImage from '../assets/NPC-Merchant-interaction-entry.png'
import { Boss } from '../enemies'
import { RangeAttack } from '../../engine/core'
import { Bar, VoidZone } from '../entities'

type EntitiesType = { entities: Boss[] }
type DrawPlayerProps = EntitiesType & { bounds?: number }
export class Player extends UnitBase {
  KeyW: boolean = false
  KeyA: boolean = false
  KeyS: boolean = false
  KeyD: boolean = false
  KeyQ: boolean = false

  mouse: MouseType = {
    x: 0,
    y: 0,
    down: false
  }

  damage: number = 50

  sprite: Sprite | null = null
  color: string = '#FD0006'

  healthBar: Bar
  dashBar: Bar

  vel: number = 2

  dashElapsed: number = 0
  dashHold: number = 7

  dashDelayElapsed: number = 0
  dashDelayHold: number = 300

  isDash: boolean = false
  dashDelay: boolean = false

  healZone: VoidZone | null = null
  healZoneElapse: number = 0
  healZoneHold: number = 200
  healZoneRaius: number = 100

  constructor({ mouse, ...args }: CoreBaseConstructorType & { mouse: MouseType }) {
    super({
      health: 500,
      position: { x: args.ctx.canvas.width / 2, y: args.ctx.canvas.height - 100 },
      ...args
    })

    this.mouse = mouse

    this.healthBar = new Bar({
      ctx: this.ctx,
      color: '#58E000',
      width: 400,
      position: { x: args.ctx.canvas.width / 2 - 200, y: args.ctx.canvas.height - 42 }
    })

    this.dashBar = new Bar({
      ctx: this.ctx,
      color: '#9E9E9E',
      width: 50,
      height: 5,
      position: this.position,
      value: 0
    })
  }

  baseAttack() {
    if (!this.KeyQ) {
      this.target = { position: { x: this.mouse.x, y: this.mouse.y }, radius: 100 }

      let delta = {
        x: this.target.position.x - this.position.x,
        y: this.target.position.y - this.position.y
      }
      let dist = Math.sqrt(delta.x * delta.x + delta.y * delta.y)

      const attack = new Engine.RangeAttack({
        ctx: this.ctx,
        mouse: this.mouse,
        position: this.position,
        spread: dist * 0.04
      })

      this.attaks.push(attack)
    } else {
      this.healZone = new VoidZone({
        ctx: this.ctx,
        position: { x: this.mouse.x, y: this.mouse.y },
        heal: 0.1,
        radius: this.healZoneRaius,
        color: '#62E200'
      })
      Engine.Helpers.delayToCallback('healZoneElapse', 'healZoneHold', this, () => {
        this.healZone = null
      })
    }
  }

  unitMovement(bounds?: number) {
    Engine.Helpers.unitMovement(this, bounds)
  }

  onKeyPress(e: KeyboardEvent, value: boolean) {
    if (['KeyW', 'KeyA', 'KeyS', 'KeyD'].includes(e.code)) {
      this[e.code as MoveMovesKeys] = value
    }

    if (e.code === 'Space' && !this.dashDelay) {
      this.dashDelay = true
      this.isDash = true
    }

    if (e.code === 'KeyQ') {
      this.KeyQ = value
    }
  }

  powerOfKeyCode() {
    if (this.KeyQ) {
      Draw.Circle({
        ctx: this.ctx,
        radius: this.healZoneRaius,
        position: this.mouse,
        color: this.color,
        fill: false
      })
    }
  }

  //TODO перенести в RangeAttack
  drawAttacks(entities: Boss[]) {
    for (let i = 0; i < this.attaks.length; i++) {
      this.attaks[i].draw()

      for (let j = 0; j < entities.length; j++) {
        this.isCollisionWithProjectile(entities[j], this.attaks[i])
      }

      if (this.attaks[i].finish) {
        this.attaks = this.attaks.filter((item) => !item.finish)
      }
    }
  }

  //TODO подумать нат неймингом
  affectWithCollision(entities: Boss[]) {
    for (let j = 0; j < entities.length; j++) {
      this.isCollisionWithTargets(entities[j])
    }
  }

  isCollisionWithTargets(entity: Boss) {
    const isCollision = Engine.Utils.isTargetsColision({
      positionTargetA: { position: this.position, radius: this.radius },
      positionTargetB: { position: entity.position, radius: entity.radius }
    })

    if (isCollision) {
      Draw.Circle({
        ctx: this.ctx,
        radius: this.radius + 20,
        position: this.position,
        color: this.color,
        fill: false
      })
      this.currentHealth -= entity.damageOnCollision
    }
  }

  //TODO перенести в RangeAttack
  isCollisionWithProjectile(element: Boss, projectile: RangeAttack) {
    const isCollision = Engine.Utils.isTargetsColision({
      positionTargetA: { position: projectile.position, radius: projectile.radius },
      positionTargetB: { position: element.position, radius: element.radius } as TargetType
    })

    if (isCollision && !projectile.isAffectStart) {
      element.affectWithTakeDamage(this.damage)

      projectile.targetPosition = element.position
      projectile.targetRadius = element.radius
      projectile.isAffectStart = true
    }
  }

  //TODO частично перенести в Bar чтобы не передавать comparator
  drawBars() {
    this.healthBar.draw((arg) => {
      return this.currentHealth / (this.health / arg)
    })

    if (this.dashDelay) {
      this.dashBar.draw((arg) => {
        return this.dashDelayElapsed / (this.dashDelayHold / arg)
      }, 'inc')
    }
  }

  affectWithTarget(damage: number) {
    this.currentHealth -= damage
  }

  healWithTarget(heal: number) {
    if (this.currentHealth <= this.health) {
      this.currentHealth += heal
    }
  }

  dash() {
    if (this.dashDelay) {
      Engine.Helpers.delayToCallback('dashDelayElapsed', 'dashDelayHold', this, () => {
        this.dashDelay = false
      })
    }
    if (this.isDash) {
      this.vel = 10

      Engine.Helpers.delayToCallback('dashElapsed', 'dashHold', this, () => {
        this.vel = 2
        this.isDash = false
      })
    }
  }

  init() {
    super.init()

    this.sprite = new Sprite({
      ctx: this.ctx,
      src: testNPCImage,
      position: this.position,
      ImageClipComparator: (img) => {
        return {
          sWidth: img.width / 8,
          sHeight: img.height,
          dWidth: (img.width / 8) * 1.5,
          dHeight: img.height * 1.5
        }
      },
      ImageSourceComparator: (img, curFrame = 0) => {
        return {
          sx: curFrame * (img.width / 8),
          sy: 0
        }
      },
      isCentered: true,
      maxFrames: 8
    })

    window.addEventListener('mousedown', () => this.baseAttack())
    window.addEventListener('keydown', (e) => this.onKeyPress(e, true), false)
    window.addEventListener('keyup', (e) => this.onKeyPress(e, false), false)
  }

  private shape() {
    if (this.sprite) {
      this.sprite.draw()
    }
  }

  draw({ entities, bounds }: DrawPlayerProps) {
    super.draw()

    this.drawAttacks(entities)
    this.unitMovement(bounds)

    this.powerOfKeyCode()

    if (this.healZone) {
      this.healZone.draw(this)

      if (!this.healZone.isExists) {
        this.healZone = null
      }
    }

    this.affectWithCollision(entities)

    this.dash()
    this.shape()
    this.drawBars()
  }
}
