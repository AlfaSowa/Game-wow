import { MouseType, PositionType, TargetType } from '../types'

//---isOnCanavasField ---//
type IsOnCanavasFieldProps = {
  position: PositionType
  radius: number
  ctx: CanvasRenderingContext2D
}

export const isOnCanavasField = ({ radius, position, ctx }: IsOnCanavasFieldProps): boolean => {
  return (
    position.x >= radius &&
    position.x <= ctx.canvas.width - radius &&
    position.y >= radius &&
    position.y <= ctx.canvas.height - radius
  )
}

//--isTargetsColision--//
type IsTargetsColisionType = {
  positionTargetA: TargetType
  positionTargetB: TargetType
}
export const isTargetsColision = ({
  positionTargetA: targetA,
  positionTargetB: targetB
}: IsTargetsColisionType): boolean => {
  let delta = {
    x: targetA.position.x - targetB.position.x,
    y: targetA.position.y - targetB.position.y
  }

  return Math.sqrt(Math.pow(delta.x, 2) + Math.pow(delta.y, 2)) < targetA.radius + targetB.radius
}

//--isTargetsRectColision--//
type TargetSizeType = { width: number; height: number }

type IsTargetsRectColisionType = {
  targetA: TargetType & TargetSizeType
  targetB: TargetType & TargetSizeType
}
export const IsTargetsRectColision = ({ targetA, targetB }: IsTargetsRectColisionType): boolean => {
  if (
    targetA.position.x + targetA.width >= targetB.position.x &&
    targetA.position.x <= targetB.position.x + targetB.width &&
    targetA.position.y + targetA.height >= targetB.position.y &&
    targetA.position.y <= targetB.position.y + targetB.height
  ) {
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
  return (
    mouse.x > target.position.x - target.radius &&
    mouse.x < target.position.x + target.radius &&
    mouse.y > target.position.y - target.radius &&
    mouse.y < target.position.y + target.radius
  )
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

    if (
      element.position.x > 0 &&
      element.position.x < window.innerWidth &&
      element.position.y > 0 &&
      element.position.y < window.innerHeight
    ) {
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
  return Math.round(Math.random() * (max - min) + min)
}
