import { CoreBaseConstructorType, Draw, Engine, MouseType } from '../../../engine'
import { Sprite } from '../../../engine/sprite'
import { SpellsKeys } from '../../../engine/types'
import { Boss } from '../../enemies'
import { PlayerBase } from '../base'
import { PlayerMagSpells } from './spells'

type EntitiesType = { entities: Boss[] }
type DrawPlayerProps = EntitiesType & { bounds?: number }

export class PlayerMag extends PlayerBase {
  KeyQ: boolean = false
  KeyE: boolean = false

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

    if (['KeyQ', 'KeyE'].includes(e.code)) {
      this[e.code as SpellsKeys] = value
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
