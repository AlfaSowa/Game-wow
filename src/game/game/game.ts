import { Engine, MouseType } from '../../engine'
import { Boss } from '../enemies'
import { TailsetMap } from '../map'
import { PlayerBase, PlayerMag } from '../player'
import { IGameCustom } from './model'

const TAIL_SIZE = 32
const TAILS_GAP = TAIL_SIZE

export class GameCustom implements IGameCustom {
  ctx: CanvasRenderingContext2D
  ctxBg: CanvasRenderingContext2D

  player: PlayerBase | null = null
  boss: Boss | null = null

  entities: Boss[] = []

  tailset: TailsetMap | null = null

  mouse: MouseType = {
    x: 0,
    y: 0,
    down: false
  }

  game: any = null
  gameBg: any = null

  constructor(refComponent?: HTMLDivElement | null) {
    const game = new Engine.Game({ isCreated: true })
    this.game = game

    const { ctx: contextBg } = game.init({
      height: Math.floor(window.innerHeight / TAILS_GAP) * TAILS_GAP,
      width: Math.floor(window.innerWidth / TAILS_GAP) * TAILS_GAP,
      refComponent,
      alpha: false
    })

    this.ctxBg = contextBg

    const { ctx } = game.init({
      height: Math.floor(window.innerHeight / TAILS_GAP) * TAILS_GAP,
      width: Math.floor(window.innerWidth / TAILS_GAP) * TAILS_GAP,
      refComponent
    })

    this.ctx = ctx
  }

  init() {
    this.tailset = new TailsetMap({ ctx: this.ctxBg, tailsGap: TAILS_GAP, tailSize: TAIL_SIZE })
    this.tailset.init()

    this.player = new PlayerMag({ ctx: this.ctx, mouse: this.mouse, tailSize: TAIL_SIZE })
    this.player.init()

    this.boss = new Boss({ ctx: this.ctx })
    this.boss.init({ target: { position: this.player.position, radius: 100 }, player: this.player })

    this.entities.push(this.boss)

    this.ctx.canvas.addEventListener('mousemove', (e) => Engine.Utils.setMousePosition(this, e))
  }

  start() {
    if (this.game) {
      this.game.start(this.draw.bind(this))
    }
  }

  stop() {
    if (this.game) {
      this.game.stop()
    }
  }

  pause() {
    console.log('game pause')
  }

  draw() {
    // if (this.tailset) {
    //   this.tailset.draw()
    // }

    if (this.boss) {
      this.boss.draw()
    }
    if (this.player) {
      this.player.draw({ entities: this.entities, bounds: TAILS_GAP })
    }
  }
}
