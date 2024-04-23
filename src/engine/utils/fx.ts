import { MouseType, PositionType, TargetType } from '../types'

//---isOnCanavasField ---//
type IsOnCanavasFieldProps = {
  position: PositionType
  radius: number
  ctx: CanvasRenderingContext2D
}

export const isOnCanavasField = ({ radius, position, ctx }: IsOnCanavasFieldProps): boolean => {
  return position.x >= radius && position.x <= ctx.canvas.width - radius && position.y >= radius && position.y <= ctx.canvas.height - radius
}

//--isTargetsColision--//
type IsTargetsColisionType = {
  positionTargetA: TargetType
  positionTargetB: TargetType
}
export const isTargetsColision = ({ positionTargetA, positionTargetB }: IsTargetsColisionType): boolean => {
  let delta = {
    x: positionTargetA.position.x - positionTargetB.position.x,
    y: positionTargetA.position.y - positionTargetB.position.y
  }
  let dist = Math.sqrt(delta.x * delta.x + delta.y * delta.y)

  if (dist < positionTargetA.radius + positionTargetB.radius) {
    return true
  }
  return false
}

//--isMouseOnTarget--//
type IsMouseOnTargetType = {
  mouse: MouseType
  target: any
}

export const isMouseOnTarget = ({ mouse, target }: IsMouseOnTargetType): boolean => {
  return mouse.x > target.position.x - target.radius && mouse.x < target.position.x + target.radius && mouse.y > target.position.y - target.radius && mouse.y < target.position.y + target.radius
}

//--moveElementToTarget--//
type MoveElementToTargetType = {
  element: any
  target: any
}

export const moveElementToTarget = ({ element, target }: MoveElementToTargetType) => {
  if (element.position.x !== target.position.x || element.position.y !== target.position.y) {
    let delta = {
      x: target.position.x - element.position.x,
      y: target.position.y - element.position.y
    }
    let angle = Math.atan2(delta.y, delta.x)

    if (element.position.x > 0 && element.position.x < window.innerWidth && element.position.y > 0 && element.position.y < window.innerHeight) {
      element.position.x += Math.cos(angle) * element.vel
      element.position.y += Math.sin(angle) * element.vel
      // target.coord.x += Math.cos(angle) * this.vel;
      // target.coord.y += Math.sin(angle) * this.vel;
    } else {
      element.finish = true
    }
  }
}

//--setMousePosition--//
export const setMousePosition = (bild: any, { offsetX, offsetY }: MouseEvent) => {
  ;[bild.mouse.x, bild.mouse.y] = [offsetX, offsetY]
}

//--randomNumber--//
export const randomNumber = (max: number, min: number): number => {
  return Math.random() * (max - min) + min
}
