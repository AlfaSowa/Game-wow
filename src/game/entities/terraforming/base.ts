import { CoreBaseConstructorType, Draw, Engine, PositionType, TargetType } from '../../../engine'

export type TerraformingConstructorType = CoreBaseConstructorType & {
  position: PositionType
  xBlocks: number
  yBlocks: number
  tailSize: number
}

export class Terraforming {
  ctx: CanvasRenderingContext2D

  position: PositionType

  height: number
  width: number

  radius: number = 100
  tailSize: number

  isExists = true

  constructor({ ctx, xBlocks, yBlocks, position, tailSize }: TerraformingConstructorType) {
    this.ctx = ctx
    this.height = yBlocks * tailSize
    this.width = xBlocks * tailSize
    this.position = position
    this.tailSize = tailSize
  }

  instantDraw(target: TargetType & { vel: number }) {
    Draw.Rect({
      ctx: this.ctx,
      height: this.height,
      width: this.width,
      position: {
        x: this.position.x - this.width / 2,
        y: this.position.y - this.height / 2
      },
      color: '#123EAB'
    })

    this.isCollisionWithTargets(target)
  }

  isCollisionWithTargets(target: TargetType & { vel: number }) {
    const isCollision = Engine.Utils.IsTargetsRectColision({
      targetA: {
        position: {
          x: this.position.x - this.width / 2,
          y: this.position.y - this.height / 2
        },
        radius: this.radius,
        width: this.width,
        height: this.height
      },
      targetB: {
        position: { x: target.position.x - (target.width || 0) / 2, y: target.position.y - (target.height || 0) / 2 },
        radius: target.radius,
        width: target.width || 0,
        height: target.height || 0
      }
    })

    if (isCollision) {
      if (target.position.x < this.position.x - this.width / 2) {
        target.position.x = target.position.x - target.vel
      }

      if (target.position.x > this.position.x - this.width / 2 + this.width) {
        target.position.x = target.position.x + target.vel
      }
      if (target.position.y < this.position.y - this.height / 2) {
        target.position.y = target.position.y - target.vel
      }

      if (target.position.y > this.position.y - this.height / 2 + this.height) {
        target.position.y = target.position.y + target.vel
      }
    }
  }

  draw(target: TargetType & { vel: number }) {
    this.instantDraw(target)
  }
}
