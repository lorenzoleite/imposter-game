import { Button } from '../components/Button'
import { CATEGORY_EMOJI } from '../components/colors'
import { Screen } from '../components/Screen'
import type { Category, Round } from '../game'

interface ResultScreenProps {
  round: Round
  category: Category
  onPlayAgain: () => void
  onChangePlayers: () => void
}

export function ResultScreen({ round, category, onPlayAgain, onChangePlayers }: ResultScreenProps) {
  return (
    <Screen
      footer={
        <div className="flex flex-col gap-3 animate-pop-in [animation-delay:1.6s]">
          <Button size="lg" color="mint" onClick={onPlayAgain}>
            Jogar de novo 🔄
          </Button>
          <Button color="paper" onClick={onChangePlayers}>
            Mudar jogadores
          </Button>
        </div>
      }
    >
      <div className="flex flex-1 flex-col items-center justify-center gap-8 text-center">
        <div className="flex flex-col items-center gap-4">
          <p className="font-display text-3xl text-paper animate-pop-in">O impostor era...</p>
          <div className="pop -rotate-6 animate-stamp rounded-3xl bg-tomato px-7 py-4 [animation-delay:0.7s]">
            <p className="font-display text-6xl break-all text-paper text-outline">
              {round.players[round.imposterIndex]}
            </p>
          </div>
        </div>

        <div className="pop flex w-full rotate-1 animate-pop-in flex-col items-center gap-1 rounded-3xl bg-sun p-5 [animation-delay:1.3s]">
          <p className="font-display text-xl">A palavra era</p>
          <p className="font-display text-5xl leading-tight break-words">{round.word.pt}</p>
          <p className="text-sm font-extrabold text-ink/60">
            {CATEGORY_EMOJI[category.id]} {category.name.pt}
          </p>
        </div>
      </div>
    </Screen>
  )
}
