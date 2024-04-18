import { Draw } from "..";
import { CoreBaseWithoutMouse } from "../types";
import { BaseEntitiesConstructorType, IBaseEntities, ShapeType } from "./types";

export class BaseEntities extends CoreBaseWithoutMouse implements IBaseEntities {
  position = { x: 0, y: 0 };

  maxHp = 0;
  curHp = this.maxHp;

  color = "#F3f3";
  radius = 100;

  velocity = 5;

  shape = "Circle";

  constructor({ maxHp, color, radius, velocity, position, ...args }: BaseEntitiesConstructorType) {
    super(args);
    this.maxHp = maxHp;
    this.color = color;
    this.radius = radius;
    this.velocity = velocity;
    this.position = position;
  }

  init(shapeType: ShapeType) {
    this.shape = shapeType;
  }

  draw() {
    Draw[this.shape as ShapeType]({ ctx: this.ctx, radius: this.radius, position: this.position, color: "#f4f4" });
  }
}
