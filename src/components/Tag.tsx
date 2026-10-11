import type { ReactNode } from 'react'

/** Tilted sticker used as a section title. */
export function Tag({ children, color = 'bg-bubble' }: { children: ReactNode; color?: string }) {
  return (
    <h2 className={`pop inline-block -rotate-2 self-start rounded-xl px-3 py-0.5 font-display text-2xl ${color}`}>
      {children}
    </h2>
  )
}
