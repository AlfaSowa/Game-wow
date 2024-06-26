import { CoreBaseConstructorType, PositionType } from '../types'

export type BaseEntitiesConstructorType = CoreBaseConstructorType & {
  maxHp: number
  color: string
  radius: number
  velocity: number
  position: PositionType
}

export type ShapeType = 'Circle'

export interface IBaseEntities {
  maxHp: number
  curHp: number
  position: PositionType
  color: string
  radius: number
  velocity: number
}
