import { CoreBaseConstructorType, MouseType } from '../../engine'
import { Boss } from '../enemies'
import { PlayerBase } from './base'

export type SpellsBaseConstructorType = CoreBaseConstructorType & { mouse: MouseType }

type DrawSpellsBaseType = {
  entities: Boss[]
  player: PlayerBase
}

export class SpellsBase {
  ctx: CanvasRenderingContext2D
  mouse: MouseType = {
    x: 0,
    y: 0,
    down: false
  }

  constructor({ ctx, mouse }: SpellsBaseConstructorType) {
    this.ctx = ctx
    this.mouse = mouse
  }

  draw({ entities, player }: DrawSpellsBaseType) {}
}
