import { CoreBaseConstructorType, Draw, Engine, MouseType, MoveMovesKeys, PositionType, TargetType } from '../../engine'
import { RangeAttack } from '../../engine/core'
import { Sprite } from '../../engine/sprite'
import { Boss } from '../enemies'
import { Bar } from '../entities'
import testNPCImage from '../assets/NPC-Merchant-interaction-entry.png'
import { SpellsBase } from './base-spells'

type PlayerAttackType = 'range' | 'melee'

type PlayerBaseConstructorType = CoreBaseConstructorType & {
  mouse: MouseType
  position: PositionType
  health?: number
  type?: PlayerAttackType
  sprite?: Sprite
  autoAttacksDamage?: number
}

type DrawPlayerProps = { bounds?: number; entities: Boss[] }

export class PlayerBase {
  ctx: CanvasRenderingContext2D

  position: PositionType = { x: 0, y: 0 }
  target: TargetType = {
    position: { x: 0, y: 0 },
    radius: 0
  }

  mouse: MouseType = {
    x: 0,
    y: 0,
    down: false
  }

  KeyW: boolean = false
  KeyA: boolean = false
  KeyS: boolean = false
  KeyD: boolean = false

  radius: number = 45
  rectCollisionSize: number = this.radius * 2

  health: number = 500
  currentHealth: number = 0
  healthBar: Bar

  attacks: RangeAttack[] = []
  autoAttacksDamage: number = 50

  dashBar: Bar

  dashDelay: boolean = false
  dashDelayElapsed: number = 0
  dashDelayHold: number = 300

  isDash: boolean = false
  dashElapsed: number = 0
  dashHold: number = 7

  vel: number = 2

  spells: SpellsBase | null = null

  type: PlayerAttackType = 'range'
  sprite: Sprite | null = null

  isExist: boolean = true

  constructor({ ctx, health, mouse, position, type, sprite, autoAttacksDamage }: PlayerBaseConstructorType) {
    this.ctx = ctx
    this.health = health || this.health
    this.currentHealth = health || this.health
    this.mouse = mouse
    this.position = position
    this.type = type || this.type
    this.sprite = sprite || this.sprite
    this.autoAttacksDamage = autoAttacksDamage || this.autoAttacksDamage

    this.healthBar = new Bar({
      ctx: this.ctx,
      color: '#58E000',
      width: 400,
      position: { x: ctx.canvas.width / 2 - 200, y: ctx.canvas.height - 42 }
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
    this.target = { position: { x: this.mouse.x, y: this.mouse.y }, radius: 100 }

    let delta = {
      x: this.target.position.x - this.position.x,
      y: this.target.position.y - this.position.y
    }
    let dist = Math.sqrt(delta.x * delta.x + delta.y * delta.y)

    if (this.type === 'range') {
      const attack = new Engine.RangeAttack({
        ctx: this.ctx,
        mouse: this.mouse,
        position: this.position,
        spread: dist * 0.04
      })

      this.attacks.push(attack)
    }
  }

  //TODO перенести в RangeAttack
  drawAttacks(entities: Boss[]) {
    for (let i = 0; i < this.attacks.length; i++) {
      this.attacks[i].draw()

      for (let j = 0; j < entities.length; j++) {
        this.isCollisionWithProjectile(entities[j], this.attacks[i])
      }

      if (this.attacks[i].finish) {
        this.attacks = this.attacks.filter((item) => !item.finish)
      }
    }
  }

  //TODO перенести в RangeAttack
  isCollisionWithProjectile(element: Boss, projectile: RangeAttack) {
    const isCollision = Engine.Utils.isTargetsColision({
      positionTargetA: { position: projectile.position, radius: projectile.radius },
      positionTargetB: { position: element.position, radius: element.radius } as TargetType
    })

    if (isCollision && !projectile.isAffectStart) {
      element.affectWithTakeDamage(this.autoAttacksDamage)

      projectile.targetPosition = element.position
      projectile.targetRadius = element.radius
      projectile.isAffectStart = true
    }
  }

  onKeyPress(e: KeyboardEvent, value: boolean) {
    if (['KeyW', 'KeyA', 'KeyS', 'KeyD'].includes(e.code)) {
      this[e.code as MoveMovesKeys] = value
    }

    if (e.code === 'Space' && !this.dashDelay) {
      this.dashDelay = true
      this.isDash = true
    }
  }

  unitMovement(bounds?: number) {
    Engine.Helpers.unitMovement(this, bounds)
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
        color: 'red',
        fill: false
      })
      this.currentHealth -= entity.damageOnCollision
    }
  }

  shape() {
    if (this.sprite) {
      Draw.Circle({ ctx: this.ctx, position: this.position, radius: this.radius, color: 'rgba(93,220,221, 1)' })

      Draw.Rect({
        ctx: this.ctx,
        position: { x: this.position.x - this.rectCollisionSize / 2, y: this.position.y - this.rectCollisionSize / 2 },
        height: this.rectCollisionSize,
        width: this.rectCollisionSize,
        color: 'rgba(93,220,221, 0.6)'
      })

      this.sprite.draw()
    }
  }

  init() {
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

  draw({ bounds, entities }: DrawPlayerProps) {
    this.shape()
    this.unitMovement(bounds)
    this.drawAttacks(entities)
    this.dash()
    this.drawBars()
    this.affectWithCollision(entities)
  }
}
