import { useState } from 'react'
import { Button } from '../components/Button'
import { CATEGORY_EMOJI, stickerColor } from '../components/colors'
import { Screen } from '../components/Screen'
import type { Category, Round } from '../game'

interface RevealScreenProps {
  round: Round
  category: Category
  onDone: () => void
  onQuit: () => void
}

export function RevealScreen({ round, category, onDone, onQuit }: RevealScreenProps) {
  const [index, setIndex] = useState(0)
  const [showCard, setShowCard] = useState(false)

  const player = round.players[index]
  const isLast = index === round.players.length - 1
  const isImposter = index === round.imposterIndex

  function next() {
    if (isLast) return onDone()
    setShowCard(false)
    setIndex(index + 1)
  }

  return (
    <Screen
      onQuit={onQuit}
      footer={
        showCard ? (
          <Button size="lg" color="paper" onClick={next}>
            {isLast ? 'Esconder e começar' : 'Esconder e passar'}
          </Button>
        ) : (
          <Button size="lg" color="sky" onClick={() => setShowCard(true)}>
            Ver minha carta 👀
          </Button>
        )
      }
    >
      <ol className="flex justify-center gap-1.5" aria-label={`Jogador ${index + 1} de ${round.players.length}`}>
        {round.players.map((_, i) => (
          <li
            key={i}
            className={`size-3 rounded-full border-2 border-ink ${i < index ? 'bg-mint' : i === index ? 'bg-sun' : 'bg-white/30'}`}
          />
        ))}
      </ol>

      {showCard ? (
        <div className="flex flex-1 items-center justify-center">
          {isImposter ? (
            <div className="pop flex aspect-[3/4] w-full max-w-72 animate-flip-in flex-col items-center justify-center gap-3 rounded-3xl bg-tomato p-6 text-center">
              <span className="text-7xl animate-wiggle">🕵️</span>
              <p className="font-display text-xl">Você é o</p>
              <p className="-mt-3 font-display text-5xl text-paper text-outline">Impostor</p>
              <p className="pop-sm rounded-xl bg-paper px-3 py-2 text-sm font-bold">
                Você não sabe a palavra. Ouça as dicas e blefe!
              </p>
            </div>
          ) : (
            <div className="pop flex aspect-[3/4] w-full max-w-72 animate-flip-in flex-col items-center justify-center gap-4 rounded-3xl bg-sun p-6 text-center">
              <span className="pop-sm rounded-full bg-paper px-3 py-1 text-sm font-extrabold">
                {CATEGORY_EMOJI[category.id]} {category.name.pt}
              </span>
              <p className="font-display text-xl">A palavra é</p>
              <p className="-mt-3 font-display text-5xl leading-tight break-words text-paper text-outline">
                {round.word.pt}
              </p>
              <p className="text-sm font-bold text-ink/70">Não fale a palavra em voz alta!</p>
            </div>
          )}
        </div>
      ) : (
        <div key={index} className="flex flex-1 animate-pop-in flex-col items-center justify-center gap-5 text-center">
          <span
            className={`pop grid size-24 place-items-center rounded-full font-display text-5xl ${stickerColor(index)}`}
          >
            {player.charAt(0).toUpperCase()}
          </span>
          <p className="font-display text-2xl text-paper">Passe o celular para</p>
          <p className="pop -rotate-2 rounded-2xl bg-paper px-6 py-2 font-display text-5xl break-all">{player}</p>
          <p className="font-bold text-paper/80">Não deixe ninguém espiar! 🤫</p>
        </div>
      )}
    </Screen>
  )
}
