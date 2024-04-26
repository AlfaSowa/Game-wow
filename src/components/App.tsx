import { useCallback, useRef, useState } from 'react'

import { GameComponent } from './hud/game'
import { GameCustom } from '../game'

export const App = () => {
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

  return (
    <>
      {!game && <GameComponent starGame={starGame} stopGame={stopGame} pauseGame={pauseGame} />}
      <div
        className="h-screen w-screen flex items-center justify-center bg-green-200"
        ref={canvasRef}
      />
    </>
  )
}
