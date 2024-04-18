import { ICoreOptions, PosotionType } from "../types";

export type BaseEntitiesConstructorType = ICoreOptions & {
  maxHp: number;
  color: string;
  radius: number;
  velocity: number;
  position: PosotionType;
};

export type ShapeType = "Circle";

export interface IBaseEntities {
  maxHp: number;
  curHp: number;
  position: PosotionType;
  color: string;
  radius: number;
  velocity: number;
}
