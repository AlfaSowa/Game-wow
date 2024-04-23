import { CoreBaseConstructorType, MouseType } from './base'

export class CoreBaseWithoutMouse {
  ctx: CanvasRenderingContext2D

  constructor({ ctx }: CoreBaseConstructorType) {
    this.ctx = ctx
  }
}

export class CoreBase {
  ctx: CanvasRenderingContext2D
  mouse: MouseType

  constructor({ ctx, mouse }: CoreBaseConstructorType & { mouse: MouseType }) {
    this.ctx = ctx
    this.mouse = mouse
  }
}
