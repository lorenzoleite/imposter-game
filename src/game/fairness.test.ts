/**
 * Stress tests for the real random generator (no fake randomness).
 * They play hundreds of thousands of rounds and check the results match
 * what a fair draw should produce. Limits are set so a fair generator only
 * fails about once in a million runs, while any real bias gets caught.
 */
import { describe, expect, it, vi } from 'vitest'
import { categories } from '../data'
import { MAX_PLAYERS, MIN_PLAYERS, addUsedWord, createRound, cryptoRandom, pickWord } from './round'
import type { Category } from './types'

// Heavy simulations: allow more time than the default 5s on slow CI machines
vi.setConfig({ testTimeout: 60_000 })

const category: Category = {
  id: 'test',
  name: { pt: 'Teste', en: 'Test' },
  words: [{ id: 'word', pt: 'Palavra', en: 'Word' }],
}

const players = (count: number) => Array.from({ length: count }, (_, i) => `P${i + 1}`)

/** Pearson chi-square statistic: how far the counts are from the expected ones. */
function chiSquare(counts: number[], expected: number): number {
  return counts.reduce((sum, count) => sum + (count - expected) ** 2 / expected, 0)
}

/**
 * Chi-square value a fair draw exceeds only once in a million times
 * (Wilson–Hilferty approximation, z = 4.753).
 */
function criticalValue(degreesOfFreedom: number): number {
  const k = degreesOfFreedom
  return k * (1 - 2 / (9 * k) + 4.753 * Math.sqrt(2 / (9 * k))) ** 3
}

function expectUniform(counts: number[]) {
  const total = counts.reduce((a, b) => a + b, 0)
  expect(chiSquare(counts, total / counts.length)).toBeLessThan(criticalValue(counts.length - 1))
}

/** Chance that everyone was the imposter at least once (inclusion–exclusion). */
function chanceEveryoneWasImposter(playerCount: number, rounds: number): number {
  let chance = 0
  let combinations = 1
  for (let k = 0; k <= playerCount; k++) {
    chance += (-1) ** k * combinations * ((playerCount - k) / playerCount) ** rounds
    combinations = (combinations * (playerCount - k)) / (k + 1)
  }
  return chance
}

describe('cryptoRandom', () => {
  it('returns numbers in [0, 1)', () => {
    for (let i = 0; i < 100_000; i++) {
      const value = cryptoRandom()
      expect(value >= 0 && value < 1).toBe(true)
    }
  })
})

describe('imposter and starter draw', () => {
  const ROUNDS = 50_000

  for (let n = MIN_PLAYERS; n <= MAX_PLAYERS; n++) {
    it(`gives every player the same chance with ${n} players`, () => {
      const imposter = Array(n).fill(0)
      const starter = Array(n).fill(0)
      for (let i = 0; i < ROUNDS; i++) {
        const round = createRound(players(n), [category])
        imposter[round.imposterIndex]++
        starter[round.starterIndex]++
      }
      expectUniform(imposter)
      expectUniform(starter)
    })
  }

  it('draws the starter independently from the imposter', () => {
    const n = 4
    const pairs = Array(n * n).fill(0)
    for (let i = 0; i < 80_000; i++) {
      const round = createRound(players(n), [category])
      pairs[round.imposterIndex * n + round.starterIndex]++
    }
    expectUniform(pairs)
  })

  it('does not depend on who was the imposter in the previous round', () => {
    const n = 4
    const pairs = Array(n * n).fill(0)
    let previous = createRound(players(n), [category]).imposterIndex
    for (let i = 0; i < 80_000; i++) {
      const current = createRound(players(n), [category]).imposterIndex
      pairs[previous * n + current]++
      previous = current
    }
    expectUniform(pairs)
  })

  it.each([
    [3, 9],
    [4, 12],
    [6, 24],
    [10, 40],
  ])('with %i players, everyone is the imposter within %i rounds as often as expected', (n, rounds) => {
    const TRIALS = 20_000
    let everyone = 0
    for (let t = 0; t < TRIALS; t++) {
      const seen = new Set<number>()
      for (let r = 0; r < rounds; r++) seen.add(createRound(players(n), [category]).imposterIndex)
      if (seen.size === n) everyone++
    }
    const expected = chanceEveryoneWasImposter(n, rounds)
    // 5 standard deviations of the sampling error
    const tolerance = 5 * Math.sqrt((expected * (1 - expected)) / TRIALS)
    expect(Math.abs(everyone / TRIALS - expected)).toBeLessThan(tolerance)
  })
})

describe('word draw', () => {
  it('gives every word the same chance', () => {
    const [first] = categories
    const ids = first.words.map((word) => word.id)
    const counts = Array(ids.length).fill(0)
    for (let i = 0; i < 60_000; i++) counts[ids.indexOf(pickWord([first]).word.id)]++
    expectUniform(counts)
  })

  it('never repeats a word until every word was played, then starts over', () => {
    const total = categories.reduce((sum, c) => sum + c.words.length, 0)
    let used: string[] = []
    const played = new Set<string>()
    for (let i = 0; i < total; i++) {
      const { word } = pickWord(categories, new Set(used))
      expect(played.has(word.id)).toBe(false)
      played.add(word.id)
      used = addUsedWord(categories, used, word.id)
    }
    expect(played.size).toBe(total)
    expect(used).toEqual([])
  })
})
