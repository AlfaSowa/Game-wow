import { CoreBaseConstructorType, Draw, Engine, MouseType } from '../../../engine'
import { Sprite } from '../../../engine/sprite'
import { Boss } from '../../enemies'
import { PlayerBase } from '../base'
import { PlayerMagSpells } from './spells'

type EntitiesType = { entities: Boss[] }
type DrawPlayerProps = EntitiesType & { bounds?: number }

export class PlayerMag extends PlayerBase {
  KeyQ: boolean = false
  KeyE: boolean = false

  damage: number = 50
  sprite: Sprite | null = null

  healZoneRaius: number = 100

  spells: PlayerMagSpells | null = null

  tailSize: number = 0

  constructor({ tailSize, ...args }: CoreBaseConstructorType & { mouse: MouseType; tailSize: number }) {
    super({
      health: 500,
      position: { x: args.ctx.canvas.width / 2, y: args.ctx.canvas.height - 100 },
      ...args
    })

    this.tailSize = tailSize
  }

  castSpell() {
    if (this.KeyQ && this.spells) {
      this.spells.initHealZone()
    }

    if (this.KeyE && this.spells) {
      this.spells.initTerraforming()
    }
  }

  onKeyPress(e: KeyboardEvent, value: boolean) {
    super.onKeyPress(e, value)

    if (e.code === 'KeyQ') {
      this.KeyQ = value
    }

    if (e.code === 'KeyE') {
      this.KeyE = value
    }
  }

  powerOfKeyCode() {
    if (this.KeyQ) {
      Draw.Circle({
        ctx: this.ctx,
        radius: this.healZoneRaius,
        position: this.mouse,
        color: 'red',
        fill: false
      })
    }

    if (this.KeyE) {
      Draw.Rect({
        ctx: this.ctx,
        height: 64,
        width: 64,
        position: { x: this.mouse.x - 32, y: this.mouse.y - 32 },
        color: 'red',
        fill: false
      })
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

  isCollisionWithShape(target: any) {
    const isCollision = Engine.Utils.IsTargetsRectColision({
      targetA: { position: { x: target.x, y: target.y }, radius: 100, width: target.size, height: target.size },
      targetB: {
        position: { x: this.position.x - this.rectCollisionSize / 2, y: this.position.y - this.rectCollisionSize / 2 },
        radius: this.radius,
        width: this.rectCollisionSize,
        height: this.rectCollisionSize
      }
    })

    if (isCollision) {
      if (this.position.x < target.x) {
        this.position.x = this.position.x - this.vel
      }

      if (this.position.x > target.x + target.size) {
        this.position.x = this.position.x + this.vel
      }
      if (this.position.y < target.y) {
        this.position.y = this.position.y - this.vel
      }

      if (this.position.y > target.y + target.size) {
        this.position.y = this.position.y + this.vel
      }
    }
  }

  init() {
    super.init()

    this.spells = new PlayerMagSpells({ ctx: this.ctx, mouse: this.mouse, tailSize: this.tailSize })

    window.addEventListener('mousedown', () => this.castSpell())
    window.addEventListener('keydown', (e) => this.onKeyPress(e, true), false)
    window.addEventListener('keyup', (e) => this.onKeyPress(e, false), false)
  }

  draw({ entities, bounds }: DrawPlayerProps) {
    super.draw({ bounds, entities })

    if (this.spells) {
      this.spells?.draw({ entities, player: this })
    }

    this.powerOfKeyCode()
  }
}
