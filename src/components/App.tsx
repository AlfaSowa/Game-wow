import { Canvas } from "./canvas/canvas";
import { useCallback, useState } from "react";

export const App = () => {
  const [game, setGame] = useState<any>(null);
  const draw = useCallback(() => {
    if (game) {
      game.draw();
    }
  }, [game]);

  return <Canvas draw={draw} setGame={setGame} />;
};
