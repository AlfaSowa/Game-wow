import { Engine } from '../engine'
import { CustomCoreOptions, MouseCoordType } from './core'
import { Boss } from './enemies'
import { Additional } from './enemies/additional'
import { TailsetMap } from './map'
import { Player } from './player'

const TAIL_SIZE = 32
const TAILS_GAP = TAIL_SIZE + 1

export class GameCustom {
  canvas: HTMLCanvasElement | null = null
  ctx: CanvasRenderingContext2D | null = null

  player: Player | null = null
  tailset: TailsetMap | null = null
  boss: Boss | null = null
  additional: Additional | null = null

  entities: any[] = []

  game: any

  mouse: MouseCoordType = {
    x: 0,
    y: 0,
    down: false
  }

  setMousePosition = ({ offsetX, offsetY }: MouseEvent) => {
    ;[this.mouse.x, this.mouse.y] = [offsetX, offsetY]
  }

  //TODO перенести добавление player.position куда то еще
  initBoss({ ctx }: CustomCoreOptions) {
    if (this.player) {
      this.boss = new Boss({ ctx })
      this.boss.init({ position: this.player.position, radius: 100 })
    }
  }

  initPlayer({ ctx }: CustomCoreOptions) {
    this.player = new Player({ ctx, mouse: this.mouse, borderCAnvas: TAILS_GAP })
    this.player.init()
  }

  initMap({ ctx }: CustomCoreOptions) {
    this.tailset = new TailsetMap({ ctx, tailsGap: TAILS_GAP, tailSize: TAIL_SIZE })
    this.tailset.init()
  }

  //TODO перенести добавление player.position куда то еще
  initEntities({ ctx }: CustomCoreOptions) {
    if (this.player) {
      this.additional = new Additional({ ctx })
      this.additional.init({ position: this.player.position, radius: 100 })

      this.entities.push(this.additional)
    }
  }

  init(refComponent?: any) {
    const game = new Engine.Game({ isCreated: true })
    this.game = game

    const { canvas, context } = game.init({ height: Math.floor(window.innerHeight / TAILS_GAP) * TAILS_GAP, width: Math.floor(window.innerWidth / TAILS_GAP) * TAILS_GAP, refComponent })

    this.canvas = canvas
    this.ctx = context

    this.initMap({ ctx: context })

    this.initPlayer({ ctx: context })

    this.initBoss({ ctx: context })
    this.initEntities({ ctx: context })

    canvas.addEventListener('mousemove', this.setMousePosition)
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
    if (this.tailset) {
      this.tailset.draw()
    }

    if (this.boss) {
      this.boss.draw()
    }

    if (this.additional) {
      if (this.additional.exist) {
        this.additional.draw()
      } else {
        this.entities = this.entities.filter((entity) => entity.exist)
        this.additional = null
      }
    }

    if (this.player) {
      this.player.draw({ mainTarget: this.boss, adds: this.entities })
    }
  }
}
