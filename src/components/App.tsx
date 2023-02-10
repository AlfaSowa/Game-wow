import { Canvas } from "./canvas/canvas";
import { useCallback, useState } from "react";
import useCanvas from "./hooks/use-canvas";
import { Game } from "../core/game/game";
import { GameComponent } from "./hud/game";

export const App = () => {
  const [game, setGame] = useState<any>(null);
  const draw = useCallback(() => {
    if (game) {
      game.draw();
    }
  }, [game]);

  const { canvas, ctx, canvasRef } = useCanvas(draw);

  const starGame = useCallback(() => {
    if (canvas && ctx) {
      const game = new Game({ canvas, ctx });
      game.init();
      setGame(game);
    }
  }, [canvas, ctx, setGame]);

  return (
    <>
      <Canvas canvasRef={canvasRef} />

      {!game && <GameComponent starGame={starGame} />}
    </>
  );
};
