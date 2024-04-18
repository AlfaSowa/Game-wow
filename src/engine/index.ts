import { Game, RangeAttack } from "./core";
import { BaseEntities } from "./entities";
import { drawCircle, drawImage } from "./utils";

export const Draw = {
  Circle: drawCircle,
  Image: drawImage,
};

//TODO добавить фабрику для Entities.add
export const Engine = {
  Game: Game,
  RangeAttack: RangeAttack,
  Entities: {
    add: BaseEntities,
  },
};
