import { Button } from '../components/Button'
import { CATEGORY_EMOJI, stickerColor } from '../components/colors'
import { Logo } from '../components/Logo'
import { Screen } from '../components/Screen'
import { Tag } from '../components/Tag'
import { MAX_PLAYERS, MIN_PLAYERS, type Category } from '../game'

interface SetupScreenProps {
  categories: Category[]
  players: string[]
  onPlayersChange: (players: string[]) => void
  selectedIds: string[]
  onSelectedChange: (ids: string[]) => void
  onStart: () => void
}

export function SetupScreen({
  categories,
  players,
  onPlayersChange,
  selectedIds,
  onSelectedChange,
  onStart,
}: SetupScreenProps) {
  const allSelected = selectedIds.length === categories.length

  function renamePlayer(index: number, name: string) {
    onPlayersChange(players.map((player, i) => (i === index ? name : player)))
  }

  function toggleCategory(id: string) {
    onSelectedChange(
      selectedIds.includes(id) ? selectedIds.filter((s) => s !== id) : [...selectedIds, id],
    )
  }

  return (
    <Screen
      footer={
        <Button size="lg" onClick={onStart} disabled={selectedIds.length === 0}>
          {selectedIds.length === 0 ? 'Escolha uma categoria' : 'Jogar! 🎲'}
        </Button>
      }
    >
      <div className="pt-4 pb-2">
        <Logo />
      </div>

      <section className="pop flex flex-col gap-4 rounded-3xl bg-paper p-4">
        <div className="flex items-center justify-between">
          <Tag>Jogadores</Tag>
          <span className="font-display text-xl text-ink/60">
            {players.length}/{MAX_PLAYERS}
          </span>
        </div>

        <ol className="flex flex-col gap-2.5">
          {players.map((player, i) => (
            <li key={i} className="flex items-center gap-2">
              <span
                className={`pop-sm grid size-11 shrink-0 place-items-center rounded-full font-display text-xl ${stickerColor(i)}`}
              >
                {i + 1}
              </span>
              <input
                value={player}
                onChange={(e) => renamePlayer(i, e.target.value)}
                placeholder={`Jogador ${i + 1}`}
                maxLength={16}
                aria-label={`Nome do jogador ${i + 1}`}
                className="pop-sm h-11 min-w-0 flex-1 rounded-xl bg-white px-3 text-lg font-bold outline-none placeholder:text-ink/35 focus:bg-sun/30"
              />
              <button
                type="button"
                onClick={() => onPlayersChange(players.filter((_, j) => j !== i))}
                disabled={players.length <= MIN_PLAYERS}
                aria-label={`Remover jogador ${i + 1}`}
                className="pop-sm press grid size-11 shrink-0 place-items-center rounded-xl bg-paper font-display text-2xl disabled:opacity-30"
              >
                ×
              </button>
            </li>
          ))}
        </ol>

        <Button
          color="sky"
          onClick={() => onPlayersChange([...players, ''])}
          disabled={players.length >= MAX_PLAYERS}
        >
          + Adicionar jogador
        </Button>
      </section>

      <section className="pop flex flex-col gap-4 rounded-3xl bg-paper p-4">
        <div className="flex items-center justify-between">
          <Tag color="bg-sky">Categorias</Tag>
          <button
            type="button"
            onClick={() => onSelectedChange(allSelected ? [] : categories.map((c) => c.id))}
            className="text-sm font-extrabold underline decoration-2 underline-offset-4"
          >
            {allSelected ? 'Limpar' : 'Todas'}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {categories.map((category, i) => {
            const selected = selectedIds.includes(category.id)
            return (
              <button
                key={category.id}
                type="button"
                aria-pressed={selected}
                onClick={() => toggleCategory(category.id)}
                className={`pop press relative flex flex-col items-start rounded-2xl p-3 text-left transition-colors ${
                  selected ? stickerColor(i) : 'bg-ink/5 opacity-60 grayscale'
                }`}
              >
                <span className="text-3xl leading-none">{CATEGORY_EMOJI[category.id] ?? '🎲'}</span>
                <span className="mt-2 font-display text-xl leading-tight">{category.name.pt}</span>
                <span className="text-xs font-bold text-ink/60">{category.words.length} palavras</span>
                {selected && (
                  <span className="pop-sm absolute -top-2.5 -right-2.5 grid size-8 rotate-12 place-items-center rounded-full bg-white text-base font-black animate-pop-in">
                    ✓
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </section>
    </Screen>
  )
}
