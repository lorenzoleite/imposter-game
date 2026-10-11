export type Language = 'pt' | 'en'

export interface Word {
  id: string
  pt: string
  en: string
}

export interface Category {
  id: string
  name: Record<Language, string>
  words: Word[]
}

export interface Round {
  players: string[]
  categoryId: string
  word: Word
  /** Index in `players` of the imposter. */
  imposterIndex: number
  /** Index in `players` of who gives the first clue. */
  starterIndex: number
}

/** Returns a number in [0, 1). Injectable so tests are deterministic. */
export type Random = () => number
