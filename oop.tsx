class Game {
  player: Player
  boss: Boss

  init() {
    this.player = new Player()
    this.boss = new Boss()
  }
  draw() {
    this.player.draw()
    this.boss.draw()
  }
}

//player
class Player {
  spells: PlayerSpells
  init() {
    this.spells = new PlayerSpells()
  }

  useSpell() {
    this.spells.initSomeSpell1()
  }

  draw() {
    this.spells.draw()
  }
}

class PlayerSpells {
  someSpell1
  someSpell2
  someSpell3

  initSomeSpell1() {
    this.someSpell1 = new SomeSpell()
  }
  initSomeSpell2() {
    this.someSpell2 = new SomeSpell()
  }
  initSomeSpell3() {
    this.someSpell3 = new SomeSpell()
  }

  draw() {
    this.someSpell1.draw()
    this.someSpell2.draw()
    this.someSpell3.draw()
  }
}

class SomeSpell {
  draw() {}
}

//boss
class Boss {
  draw() {}
}
