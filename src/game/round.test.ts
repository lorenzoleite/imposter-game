import { describe, expect, it } from 'vitest'
import { MAX_PLAYERS, MIN_PLAYERS, createRound, pickWord, randomIndex } from './round'
import type { Category, Random } from './types'

const fruits: Category = {
  id: 'fruits',
  name: { pt: 'Frutas', en: 'Fruits' },
  words: [
    { id: 'apple', pt: 'Maçã', en: 'Apple' },
    { id: 'banana', pt: 'Banana', en: 'Banana' },
  ],
}

const animals: Category = {
  id: 'animals',
  name: { pt: 'Animais', en: 'Animals' },
  words: [{ id: 'dog', pt: 'Cachorro', en: 'Dog' }],
}

/** Returns the given values in order, looping. */
function sequence(...values: number[]): Random {
  let i = 0
  return () => values[i++ % values.length]
}

const players = (count: number) => Array.from({ length: count }, (_, i) => `Player ${i + 1}`)

describe('randomIndex', () => {
  it('stays within bounds', () => {
    expect(randomIndex(5, () => 0)).toBe(0)
    expect(randomIndex(5, () => 0.999)).toBe(4)
  })
})

describe('pickWord', () => {
  it('picks from all selected categories', () => {
    expect(pickWord([fruits, animals], new Set(), () => 0.999)).toEqual({
      categoryId: 'animals',
      word: animals.words[0],
    })
  })

  it('skips used words', () => {
    const used = new Set(['apple', 'dog'])
    for (const r of [0, 0.5, 0.999]) {
      expect(pickWord([fruits, animals], used, () => r).word.id).toBe('banana')
    }
  })

  it('reuses all words once every word was used', () => {
    const used = new Set(['apple', 'banana'])
    expect(pickWord([fruits], used, () => 0).word.id).toBe('apple')
  })

  it('throws when there are no words', () => {
    expect(() => pickWord([])).toThrow()
    expect(() => pickWord([{ ...fruits, words: [] }])).toThrow()
  })
})

describe('createRound', () => {
  it('draws word, imposter and starter', () => {
    const round = createRound(players(4), [fruits], new Set(), sequence(0.5, 0.25, 0.75))
    expect(round).toEqual({
      players: players(4),
      categoryId: 'fruits',
      word: fruits.words[1],
      imposterIndex: 1,
      starterIndex: 3,
    })
  })

  it('accepts the min and max player counts', () => {
    expect(() => createRound(players(MIN_PLAYERS), [fruits])).not.toThrow()
    expect(() => createRound(players(MAX_PLAYERS), [fruits])).not.toThrow()
  })

  it('rejects too few or too many players', () => {
    expect(() => createRound(players(MIN_PLAYERS - 1), [fruits])).toThrow()
    expect(() => createRound(players(MAX_PLAYERS + 1), [fruits])).toThrow()
  })

  it('can make anyone the imposter', () => {
    const seen = new Set<number>()
    for (let i = 0; i < 200; i++) seen.add(createRound(players(5), [fruits]).imposterIndex)
    expect([...seen].sort()).toEqual([0, 1, 2, 3, 4])
  })
})
