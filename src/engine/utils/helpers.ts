import { Engine } from '..'

export const unitMovement = (build: any, bounds: number = 0) => {
  if (Engine.Utils.isOnCanavasField({ ctx: build.ctx, radius: build.radius, position: build.position })) {
    if (build.KeyD) {
      build.position.x += build.vel
    }
    if (build.KeyS) {
      build.position.y += build.vel
    }
    if (build.KeyA) {
      build.position.x -= build.vel
    }
    if (build.KeyW) {
      build.position.y -= build.vel
    }
  }

  if (build.position.x < build.radius + build.vel + bounds) {
    build.position.x = build.radius + build.vel + bounds
  }
  if (build.position.x > build.ctx.canvas.width - (build.radius + build.vel) - bounds) {
    build.position.x = build.ctx.canvas.width - (build.radius + build.vel) - bounds
  }
  if (build.position.y < build.radius + build.vel + bounds) {
    build.position.y = build.radius + build.vel + bounds
  }
  if (build.position.y > build.ctx.canvas.height - (build.radius + build.vel) - bounds) {
    build.position.y = build.ctx.canvas.height - (build.radius + build.vel) - bounds
  }
}

export const delayToCallback = (elapsed: string, hold: string, bild: any, callback: () => any) => {
  bild[elapsed]++

  if (bild[elapsed] % bild[hold] === 0) {
    bild[elapsed] = 0
    callback()
  }
}
