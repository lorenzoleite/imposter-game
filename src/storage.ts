/** Small localStorage helpers. Storage can be missing or blocked, so never throw. */

export function loadStringArray(key: string): string[] | null {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(key) ?? 'null')
    return Array.isArray(value) && value.every((item) => typeof item === 'string') ? value : null
  } catch {
    return null
  }
}

export function saveStringArray(key: string, value: string[]): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Ignore: settings just won't be remembered
  }
}
