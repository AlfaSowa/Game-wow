export const GameComponent = ({ starGame, stopGame }: any) => {
  return (
    <div className="absolute top-0 w-full h-full p-2">
      <div className="flex gap-2">
        <button className="bg-red-500 p-2" onClick={starGame}>
          СТАРТ
        </button>

        <button className="bg-red-500 p-2" onClick={stopGame}>
          СТОП
        </button>
      </div>
    </div>
  );
};
