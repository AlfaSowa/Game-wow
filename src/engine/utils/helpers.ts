import { Engine } from "..";

export const unitMovement = (build: any) => {
  if (Engine.Utils.isOnCanavasField({ ctx: build.ctx, radius: build.radius, position: build.position })) {
    if (build.KeyD) {
      build.position.x += build.vel;
    }
    if (build.KeyS) {
      build.position.y += build.vel;
    }
    if (build.KeyA) {
      build.position.x -= build.vel;
    }
    if (build.KeyW) {
      build.position.y -= build.vel;
    }
  }

  if (build.position.x < build.radius + build.vel) {
    build.position.x = build.radius + build.vel;
  }
  if (build.position.x > build.ctx.canvas.width - (build.radius + build.vel)) {
    build.position.x = build.ctx.canvas.width - (build.radius + build.vel);
  }
  if (build.position.y < build.radius + build.vel) {
    build.position.y = build.radius + build.vel;
  }
  if (build.position.y > build.ctx.canvas.height - (build.radius + build.vel)) {
    build.position.y = build.ctx.canvas.height - (build.radius + build.vel);
  }
};