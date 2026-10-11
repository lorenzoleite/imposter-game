import type { Category, Random, Round, Word } from './types'

export const MIN_PLAYERS = 3
export const MAX_PLAYERS = 15

// Random values are fetched in batches because each crypto call has a cost
const buffer = new Uint32Array(1024)
let position = buffer.length

/**
 * Uniform number in [0, 1) from the browser's cryptographic generator,
 * which is better than Math.random (no predictable patterns).
 */
export const cryptoRandom: Random = () => {
  if (position === buffer.length) {
    crypto.getRandomValues(buffer)
    position = 0
  }
  return buffer[position++] / 2 ** 32
}

export function randomIndex(length: number, random: Random = cryptoRandom): number {
  return Math.floor(random() * length)
}

/**
 * Picks a word from the given categories, skipping words already used.
 * When every word has been used, all words become available again.
 */
export function pickWord(
  categories: Category[],
  usedWordIds: ReadonlySet<string> = new Set(),
  random: Random = cryptoRandom,
): { categoryId: string; word: Word } {
  const pool = categories.flatMap((category) =>
    category.words.map((word) => ({ categoryId: category.id, word })),
  )
  if (pool.length === 0) {
    throw new Error('No words available in the selected categories')
  }

  const unused = pool.filter(({ word }) => !usedWordIds.has(word.id))
  const candidates = unused.length > 0 ? unused : pool
  return candidates[randomIndex(candidates.length, random)]
}

export function createRound(
  players: string[],
  categories: Category[],
  usedWordIds: ReadonlySet<string> = new Set(),
  random: Random = cryptoRandom,
): Round {
  if (players.length < MIN_PLAYERS || players.length > MAX_PLAYERS) {
    throw new Error(`Player count must be between ${MIN_PLAYERS} and ${MAX_PLAYERS}`)
  }

  const { categoryId, word } = pickWord(categories, usedWordIds, random)
  return {
    players,
    categoryId,
    word,
    imposterIndex: randomIndex(players.length, random),
    starterIndex: randomIndex(players.length, random),
  }
}

/**
 * Returns the used word ids after `wordId` was played. Starts over when
 * every word in the selected categories has been used.
 */
export function addUsedWord(
  categories: Category[],
  usedWordIds: readonly string[],
  wordId: string,
): string[] {
  const used = new Set([...usedWordIds, wordId])
  const allUsed = categories.every((category) => category.words.every((word) => used.has(word.id)))
  return allUsed ? [] : [...used]
}
