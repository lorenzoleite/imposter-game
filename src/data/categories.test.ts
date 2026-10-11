import { describe, expect, it } from 'vitest'
import { categories } from '.'

const words = categories.flatMap((category) => category.words)

function duplicates(values: string[]): string[] {
  return values.filter((value, i) => values.indexOf(value) !== i)
}

describe('categories', () => {
  it('have unique ids and names in both languages', () => {
    expect(duplicates(categories.map((c) => c.id))).toEqual([])
    for (const category of categories) {
      expect(category.name.pt.trim()).not.toBe('')
      expect(category.name.en.trim()).not.toBe('')
    }
  })

  it('have enough words to play', () => {
    for (const category of categories) {
      expect(category.words.length, category.id).toBeGreaterThanOrEqual(20)
    }
  })
})

describe('words', () => {
  // The game tracks used words by id across all categories
  it('have ids unique across all categories', () => {
    expect(duplicates(words.map((w) => w.id))).toEqual([])
  })

  it('use kebab-case ids', () => {
    for (const word of words) expect(word.id).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/)
  })

  it('are not repeated in the same language', () => {
    expect(duplicates(words.map((w) => w.pt.toLowerCase()))).toEqual([])
    expect(duplicates(words.map((w) => w.en.toLowerCase()))).toEqual([])
  })

  it('have text in both languages', () => {
    for (const word of words) {
      expect(word.pt.trim(), word.id).not.toBe('')
      expect(word.en.trim(), word.id).not.toBe('')
    }
  })
})
