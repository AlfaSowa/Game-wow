import { Game, RangeAttack } from './core'
import { BaseEntities } from './entities'
import { Sprite } from './sprite'
import {
  delayToCallback,
  drawCircle,
  drawImage,
  drawRectangle,
  isMouseOnTarget,
  isOnCanavasField,
  isTargetsColision,
  moveElementToTarget,
  randomNumber,
  setMousePosition,
  unitMovement
} from './utils'
export type {
  MouseType,
  TargetType,
  CoreBaseConstructorType,
  MoveMovesKeys,
  PositionType
} from './types'

export const Draw = {
  Circle: drawCircle,
  Rect: drawRectangle,
  Image: drawImage
}

//TODO добавить фабрику для Entities.add
export const Engine = {
  Game: Game,
  RangeAttack: RangeAttack,
  Entities: {
    add: BaseEntities
  },
  Utils: {
    isOnCanavasField: isOnCanavasField,
    isTargetsColision: isTargetsColision,
    isMouseOnTarget: isMouseOnTarget,
    moveElementToTarget: moveElementToTarget,
    setMousePosition: setMousePosition,
    randomNumber: randomNumber
  },
  Helpers: {
    unitMovement: unitMovement,
    delayToCallback: delayToCallback
  },
  Sprite: Sprite
}
