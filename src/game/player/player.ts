import { Engine } from '../../engine'
import { Sprite } from '../../engine/sprite'
import { CustomCoreOptions, MouseCoordType, MovesKeys, TargetType } from '../core'
import { UnitBase } from '../units'
import testNPCImage from '../assets/NPC-Merchant-interaction-entry.png'

type EntitiesType = { mainTarget: any; adds?: any[] }
export class Player extends UnitBase {
  KeyW: boolean = false
  KeyA: boolean = false
  KeyS: boolean = false
  KeyD: boolean = false

  mouse: MouseCoordType = {
    x: 0,
    y: 0,
    down: false
  }

  damage: number = 100
  borderCAnvas: number = 32

  sprite: Sprite | null = null
  color: string = 'red'

  constructor({ mouse, borderCAnvas, ...args }: CustomCoreOptions & { mouse: MouseCoordType; borderCAnvas: number }) {
    super({ maxHp: 500, ...args })
    this.mouse = mouse
    this.borderCAnvas = borderCAnvas
  }

  setTarget() {
    this.target = { position: { x: this.mouse.x, y: this.mouse.y }, radius: 100 }
  }

  baseAttack() {
    this.setTarget()

    let delta = { x: this.target.position.x - this.position.x, y: this.target.position.y - this.position.y }
    let dist = Math.sqrt(delta.x * delta.x + delta.y * delta.y)

    const attack = new Engine.RangeAttack({
      ctx: this.ctx,
      mouse: this.mouse,
      position: this.position,
      spread: dist * 0.04
    })

    this.attaks.push(attack)
  }

  unitMovement() {
    Engine.Helpers.unitMovement(this, this.borderCAnvas)
  }

  onKeyPress(e: KeyboardEvent, value: boolean) {
    if (['KeyW', 'KeyA', 'KeyS', 'KeyD'].includes(e.code)) {
      this[e.code as MovesKeys] = value
    }
  }

  drawAttacks({ mainTarget, adds }: EntitiesType) {
    this.attaks.forEach((attack) => {
      attack.draw()

      if (mainTarget) {
        this.isCollisionWithProjectile(mainTarget, attack)
      }

      if (adds && adds.length > 0) {
        for (let i = 0; i < adds.length; i++) {
          this.isCollisionWithProjectile(adds[i], attack)
        }
      }

      if (attack.finish) {
        this.attaks = this.attaks.filter((item) => !item.finish)
      }
    })
  }

  isCollisionWithTargets({ mainTarget, adds }: EntitiesType) {
    const isCollision = Engine.Utils.isTargetsColision({
      positionTargetA: { position: this.position, radius: this.radius },
      positionTargetB: { position: mainTarget.position, radius: mainTarget.radius }
    })

    if (isCollision) {
      this.color = 'grey'
    }

    if (adds && adds.length > 0) {
      for (let i = 0; i < adds.length; i++) {
        const isCollision = Engine.Utils.isTargetsColision({
          positionTargetA: { position: this.position, radius: this.radius },
          positionTargetB: { position: adds[i].position, radius: adds[i].radius }
        })

        if (isCollision) {
          this.color = 'grey'
        }
      }
    }
  }

  isCollisionWithProjectile(element: any, projectile: any) {
    const isCollision = Engine.Utils.isTargetsColision({
      positionTargetA: { position: projectile.position, radius: projectile.radius },
      positionTargetB: { position: element.position, radius: element.radius } as TargetType
    })

    if (isCollision) {
      element.curHp -= this.damage
      projectile.finish = true
    }
  }

  init() {
    super.init()

    this.position = { x: window.innerWidth / 2, y: window.innerHeight - 100 }

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
      isCentered: true
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

  draw({ mainTarget, adds }: EntitiesType) {
    super.draw()

    this.drawAttacks({ mainTarget, adds })
    this.shape()
    this.unitMovement()
    // this.isCollisionWithTargets({ mainTarget, adds });
  }
}
