type GameComponentProps = {
  starGame: any;
  stopGame: any;
  pauseGame: any;
};

export const GameComponent = ({ starGame, stopGame, pauseGame }: GameComponentProps) => {
  return (
    <div className="absolute top-0 w-full h-full p-2">
      <div className="flex gap-2">
        <button className="bg-red-500 p-2" onClick={starGame}>
          СТАРТ
        </button>

        <button className="bg-red-500 p-2" onClick={stopGame}>
          СТОП
        </button>

        <button className="bg-red-500 p-2" onClick={pauseGame}>
          ПАУЗА
        </button>
      </div>
    </div>
  );
};
