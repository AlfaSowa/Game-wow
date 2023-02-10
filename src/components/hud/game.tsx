export const GameComponent = ({ starGame }: any) => {
  return (
    <div className="absolute top-0 w-full h-full p-2">
      <button className="bg-red-500 p-2" onClick={starGame}>
        СТАРТ
      </button>
    </div>
  );
};
