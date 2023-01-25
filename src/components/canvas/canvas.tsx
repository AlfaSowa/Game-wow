import { Game } from "../../core/game/game";
import useCanvas from "../hooks/use-canvas";
import { useCallback } from "react";

export const Canvas = ({ draw, setGame }: any) => {
  const { canvas, ctx, canvasRef } = useCanvas(draw);

  const starGame = useCallback(() => {
    if (canvas && ctx) {
      const game = new Game({ canvas, ctx });
      game.init();
      setGame(game);
    }
  }, [canvas, ctx, setGame]);

  return (
    <div>
      <canvas ref={canvasRef} />
      <button onClick={starGame}>СТАРТ</button>
    </div>
  );
};
