import { BaseBossClass } from "./base";

// type DrawVoidZone = {
//   target: any;
//   positiveForTarget: boolean;
//   positiveForCreator: boolean;
//   isSucking: boolean;
// };

// type FireBossConstructor = {
//   coreOptions: CoreOptions;
// };

export class FireBoss extends BaseBossClass {
  // voidZonesMoveToCreator: boolean = false;
  // coreOptions: CoreOptions;
  // positiveForCreatorVoides: any[] = [];
  // positiveForTargetVoides: any[] = [];
  // voidZoneCount = 2000;
  // voidZoneCountShow = 300;
  // constructor({ coreOptions }: FireBossConstructor) {
  //   super(coreOptions);
  //   this.coreOptions = coreOptions;
  // }
  // drawVoidZone({
  //   target,
  //   isSucking,
  //   positiveForCreator,
  //   positiveForTarget,
  // }: DrawVoidZone) {
  //   if (positiveForTarget) {
  //     this.positiveForTargetVoides.push(
  //       new VoidZone({
  //         coord: target.coord,
  //         coreOptions: this.coreOptions,
  //         positiveForTarget,
  //         positiveForCreator,
  //         isSucking,
  //         moveTo: this.voidZonesMoveToCreator,
  //       })
  //     );
  //   } else {
  //     this.positiveForCreatorVoides.push(
  //       new VoidZone({
  //         coord: target.coord,
  //         coreOptions: this.coreOptions,
  //         positiveForTarget,
  //         positiveForCreator,
  //         isSucking,
  //         moveTo: false,
  //       })
  //     );
  //   }
  // }
  // init(target: any) {
  //   super.init(target);
  //   setInterval(() => {
  //     this.drawVoidZone({
  //       target,
  //       isSucking: true,
  //       positiveForCreator: true,
  //       positiveForTarget: false,
  //     });
  //   }, 3000);
  // }
  // draw(target: any) {
  //   super.draw(target);
  //   this.positiveForCreatorVoides.forEach((i) => {
  //     i.draw(this, target);
  //     if (i.finish) {
  //       this.positiveForCreatorVoides = this.positiveForCreatorVoides.filter(
  //         (e) => !e.finish
  //       );
  //     }
  //     this.positiveForTargetVoides.forEach((j) => {
  //       if (isTargetsColision(i, j)) {
  //         i.changeToBig();
  //         if (!j.finish) {
  //           j.changeToSmall(0.3);
  //         } else {
  //           //TODO сделать норм удаление войды из массива
  //           this.positiveForTargetVoides = this.positiveForTargetVoides.filter(
  //             (e) => !e.finish
  //           );
  //         }
  //       }
  //     });
  //   });
  //   this.positiveForTargetVoides.forEach((i) => {
  //     i.draw(this, target);
  //     if (!this.voidZonesMoveToCreator && this.shield <= this.maxShield / 2) {
  //       this.voidZonesMoveToCreator = true;
  //     }
  //     if (this.voidZonesMoveToCreator && !i.moveTo) {
  //       i.isMove(true);
  //     }
  //     if (i.moveTo) {
  //       i.moveToCreator(this);
  //     }
  //     if (i.finish) {
  //       //TODO сделать норм удаление войды из массива
  //       this.positiveForTargetVoides = this.positiveForTargetVoides.filter(
  //         (item) => !item.finish
  //       );
  //     }
  //   });
  // }
}
