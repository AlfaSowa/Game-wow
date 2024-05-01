type GameComponentProps = {
  starGame: () => void
  stopGame: () => void
  pauseGame: () => void
  openSkillsModal: () => void
}

const BUTTONS = [
  {
    id: 1,
    name: 'СТАРТ',
    action: 'start'
  },
  {
    id: 2,
    name: 'СКИЛЫ',
    action: 'skills'
  }
]

type ActionsType = 'start' | 'stop' | 'pause'

export const GameComponent = ({ starGame, stopGame, pauseGame, openSkillsModal }: GameComponentProps) => {
  const actions = {
    start: starGame,
    stop: stopGame,
    pause: pauseGame,
    skills: openSkillsModal
  }

  return (
    <div className="absolute top-0 w-full h-full">
      <div className="flex justify-end p-5">
        <div className="w-2/3">
          <h1 className="text-2xl pb-4 text-center">Lorem, ipsum dolor.</h1>

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem sequi incidunt nulla eius odio esse maxime
            est quia, dolor aut quaerat aliquid quis natus error inventore iusto, nobis vitae at adipisci architecto
            minus? Ratione id, repellat temporibus excepturi minus laudantium officiis repellendus tenetur eligendi
            soluta animi delectus placeat ex odio delenr molestiae nobis harum esse, ducimus vero.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-5 items-end p-5">
        {BUTTONS.map((button) => (
          <button
            key={button.id}
            className="bg-red-500 p-2 w-1/3 text-sm max-w-sm hover:bg-red-700"
            onClick={actions[button.action as ActionsType]}
          >
            {button.name}
          </button>
        ))}
      </div>
    </div>
  )
}
