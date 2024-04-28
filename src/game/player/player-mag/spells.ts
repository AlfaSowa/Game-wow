import { CoreBaseConstructorType, Engine, MouseType, TargetType } from '../../../engine'
import { Boss } from '../../enemies'
import { Terraforming } from '../../entities/terraforming'
import { HealVoidZone } from '../../entities/void-zones'
import { PlayerBase } from '../base'
import { SpellsBase } from '../base-spells'

export type PlayerSpellsConstructorType = CoreBaseConstructorType & { mouse: MouseType; tailSize: number }
type DrawSpellsBaseType = {
  entities: Boss[]
  player: PlayerBase
}

export class PlayerMagSpells extends SpellsBase {
  healZone: HealVoidZone | null = null
  terraforming: Terraforming | null = null

  tailSize: number = 0

  constructor({ ctx, mouse, tailSize }: PlayerSpellsConstructorType) {
    super({ ctx, mouse })
    this.tailSize = tailSize
  }

  initHealZone() {
    this.healZone = new HealVoidZone({
      ctx: this.ctx,
      position: { x: this.mouse.x, y: this.mouse.y }
    })
  }

  initTerraforming() {
    this.terraforming = new Terraforming({
      ctx: this.ctx,
      position: { x: this.mouse.x, y: this.mouse.y },
      xBlocks: Engine.Utils.randomNumber(1, 12),
      yBlocks: Engine.Utils.randomNumber(1, 12),
      tailSize: this.tailSize
    })
  }

  draw({ entities, player }: DrawSpellsBaseType) {
    super.draw({ entities, player })

    if (this.healZone) {
      this.healZone.draw(player)

      if (!this.healZone.isExists) {
        this.healZone = null
      }
    }

    if (this.terraforming) {
      this.terraforming.draw({ ...player, width: player.rectCollisionSize, height: player.rectCollisionSize })

      if (!this.terraforming.isExists) {
        this.terraforming = null
      }
    }
  }
}
