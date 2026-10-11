import { useEffect, useState } from 'react'
import { categories } from './data'
import { MAX_PLAYERS, MIN_PLAYERS, addUsedWord, createRound, type Round } from './game'
import { ResultScreen } from './screens/ResultScreen'
import { RevealScreen } from './screens/RevealScreen'
import { RoundScreen } from './screens/RoundScreen'
import { SetupScreen } from './screens/SetupScreen'
import { loadStringArray, saveStringArray } from './storage'

type ScreenName = 'setup' | 'reveal' | 'round' | 'result'

const KEYS = {
  players: 'imposter:players',
  categories: 'imposter:categories',
  usedWords: 'imposter:used-words',
}

function initialPlayers(): string[] {
  const saved = loadStringArray(KEYS.players)
  if (saved && saved.length >= MIN_PLAYERS && saved.length <= MAX_PLAYERS) return saved
  return Array(4).fill('')
}

function initialCategories(): string[] {
  const ids = categories.map((c) => c.id)
  const saved = loadStringArray(KEYS.categories)?.filter((id) => ids.includes(id))
  return saved && saved.length > 0 ? saved : ids
}

function App() {
  const [screen, setScreen] = useState<ScreenName>('setup')
  const [players, setPlayers] = useState(initialPlayers)
  const [selectedIds, setSelectedIds] = useState(initialCategories)
  const [usedWordIds, setUsedWordIds] = useState(() => loadStringArray(KEYS.usedWords) ?? [])
  const [round, setRound] = useState<Round | null>(null)
  const [roundCount, setRoundCount] = useState(0)

  useEffect(() => saveStringArray(KEYS.players, players), [players])
  useEffect(() => saveStringArray(KEYS.categories, selectedIds), [selectedIds])
  useEffect(() => saveStringArray(KEYS.usedWords, usedWordIds), [usedWordIds])

  function startRound() {
    const selected = categories.filter((c) => selectedIds.includes(c.id))
    const names = players.map((name, i) => name.trim() || `Jogador ${i + 1}`)
    const next = createRound(names, selected, new Set(usedWordIds))
    setRound(next)
    setRoundCount((count) => count + 1)
    setUsedWordIds(addUsedWord(selected, usedWordIds, next.word.id))
    setScreen('reveal')
    window.scrollTo(0, 0)
  }

  function goTo(name: ScreenName) {
    setScreen(name)
    window.scrollTo(0, 0)
  }

  const category = round && categories.find((c) => c.id === round.categoryId)

  if (screen === 'setup' || !round || !category) {
    return (
      <SetupScreen
        categories={categories}
        players={players}
        onPlayersChange={setPlayers}
        selectedIds={selectedIds}
        onSelectedChange={setSelectedIds}
        onStart={startRound}
      />
    )
  }

  if (screen === 'reveal') {
    return (
      <RevealScreen
        // New round = fresh reveal state
        key={roundCount}
        round={round}
        category={category}
        onDone={() => goTo('round')}
        onQuit={() => goTo('setup')}
      />
    )
  }

  if (screen === 'round') {
    return <RoundScreen round={round} onReveal={() => goTo('result')} onQuit={() => goTo('setup')} />
  }

  return (
    <ResultScreen
      round={round}
      category={category}
      onPlayAgain={startRound}
      onChangePlayers={() => goTo('setup')}
    />
  )
}

export default App
