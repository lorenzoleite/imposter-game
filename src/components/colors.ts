/** Sticker colors, cycled for players and categories. */
export const STICKER_COLORS = ['bg-sun', 'bg-bubble', 'bg-sky', 'bg-mint', 'bg-grape'] as const

export function stickerColor(index: number): string {
  return STICKER_COLORS[index % STICKER_COLORS.length]
}

export const CATEGORY_EMOJI: Record<string, string> = {
  food: '🍕',
  fruits: '🍓',
  animals: '🦁',
  jobs: '👩‍🚒',
  places: '🏖️',
  objects: '☂️',
  sports: '⚽',
  clothes: '👕',
  musicians: '🎸',
  celebrities: '⭐',
  songs: '🎵',
  'movies-tv': '🎬',
  characters: '🦸',
  brands: '📱',
  countries: '🌎',
  cities: '🏙️',
  landmarks: '🗽',
}
