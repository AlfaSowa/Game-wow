// class MyClass extends mixin(MyBaseClass).with(Mixin1, Mixin2) {
//   /* ... */
// }

export const mixin = (superclass: any) => new MixinBuilder(superclass);

class MixinBuilder {
  superclass: [];

  constructor(superclass: any) {
    this.superclass = superclass;
  }

  with(...mixins: any[]) {
    return mixins.reduce((c, mixin) => mixin(c), this.superclass);
  }
}
