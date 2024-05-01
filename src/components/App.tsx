import { useCallback, useRef, useState } from 'react'

import { GameComponent } from './hud/game'
import { GameCustom } from '../game'

export const App = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [game, setGame] = useState<GameCustom>()
  const canvasRef = useRef<HTMLDivElement>(null)

  const starGame = useCallback(() => {
    const game = new GameCustom(canvasRef.current)

    game.init()
    game.start()
    setGame(game)
  }, [])

  const stopGame = useCallback(() => {
    if (game) {
      game.stop()
    }
  }, [game])

  const pauseGame = useCallback(() => {
    if (game) {
      game.pause()
    }
  }, [game])

  const openSkillsModal = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])

  return (
    <>
      {!game && (
        <GameComponent
          starGame={starGame}
          stopGame={stopGame}
          pauseGame={pauseGame}
          openSkillsModal={openSkillsModal}
        />
      )}
      <div className="h-screen w-screen flex items-center justify-center bg-green-200" ref={canvasRef} />

      {isOpen && (
        <div className="absolute inset-0 bg-slate-900/60">
          <div className="bg-white max-w-2xl m-auto mt-32 p-3">
            <div className="flex justify-end">
              <button onClick={() => setIsOpen(false)}>закрыть</button>
            </div>

            <div>
              <div>123123213123</div>
              <div>123123213123</div>
              <div>123123213123</div>
              <div>123123213123</div>
              <div>123123213123</div>
              <div>123123213123</div>
              <div>123123213123</div>
              <div>123123213123</div>
              <div>123123213123</div>
              <div>123123213123</div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

const levels = [
  {
    name: '11111',
    id: '123123',
    bosses: [1, 2, 3]
  },
  {
    name: '22222',
    id: '45656456',
    bosses: [1, 2, 3]
  },
  {
    name: '3333',
    id: '99553',
    bosses: [1, 2, 3]
  }
]

const level = {
  id: '123123',
  bossId: '1'
}
