import { Game, RangeAttack } from "./core";
import { BaseEntities } from "./entities";
import {
  drawCircle,
  drawImage,
  drawRectangle,
  isMouseOnTarget,
  isOnCanavasField,
  isTargetsColision,
  moveElementToTarget,
  unitMovement,
} from "./utils";

export const Draw = {
  Circle: drawCircle,
  Rect: drawRectangle,
  Image: drawImage,
};

//TODO добавить фабрику для Entities.add
export const Engine = {
  Game: Game,
  RangeAttack: RangeAttack,
  Entities: {
    add: BaseEntities,
  },
  Utils: {
    isOnCanavasField: isOnCanavasField,
    isTargetsColision: isTargetsColision,
    isMouseOnTarget: isMouseOnTarget,
    moveElementToTarget: moveElementToTarget,
  },
  Helpers: {
    unitMovement: unitMovement,
  },
};
