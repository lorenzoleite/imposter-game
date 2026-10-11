import { useState } from 'react'
import { Button } from '../components/Button'
import { ConfirmDialog } from '../components/ConfirmDialog'
import { Screen } from '../components/Screen'
import type { Round } from '../game'

const STEPS = [
  { emoji: '💬', text: 'Cada um fala UMA palavra ligada à palavra secreta.' },
  { emoji: '🔁', text: 'Deem quantas voltas quiserem.' },
  { emoji: '🗳️', text: 'Discutam e votem em quem é o impostor.' },
]

interface RoundScreenProps {
  round: Round
  onReveal: () => void
  onQuit: () => void
}

export function RoundScreen({ round, onReveal, onQuit }: RoundScreenProps) {
  const [confirming, setConfirming] = useState(false)

  return (
    <Screen
      onQuit={onQuit}
      footer={
        <Button size="lg" color="tomato" onClick={() => setConfirming(true)}>
          Revelar o impostor
        </Button>
      }
    >
      <div className="flex flex-col items-center gap-3 pt-6 text-center">
        <span className="text-6xl animate-wiggle">🎤</span>
        <p className="pop -rotate-2 animate-pop-in rounded-3xl bg-sun px-6 py-3 font-display text-5xl break-all">
          {round.players[round.starterIndex]}
        </p>
        <p className="font-display text-3xl text-paper">começa!</p>
      </div>

      <ol className="flex flex-col gap-3">
        {STEPS.map((step, i) => (
          <li
            key={i}
            className={`pop flex items-center gap-3 rounded-2xl bg-paper p-3 ${i % 2 ? 'rotate-1' : '-rotate-1'}`}
          >
            <span className="text-3xl">{step.emoji}</span>
            <span className="font-bold">{step.text}</span>
          </li>
        ))}
      </ol>

      {confirming && (
        <ConfirmDialog
          emoji="🫣"
          title="Revelar o impostor?"
          confirmLabel="Sim, revelar!"
          cancelLabel="Ainda não"
          onConfirm={onReveal}
          onCancel={() => setConfirming(false)}
        >
          Todo mundo já votou? Depois de revelar, não tem volta!
        </ConfirmDialog>
      )}
    </Screen>
  )
}
