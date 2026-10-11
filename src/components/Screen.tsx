import type { ReactNode } from 'react'

interface ScreenProps {
  children: ReactNode
  /** Pinned to the bottom of the screen (main action). */
  footer?: ReactNode
  onQuit?: () => void
}

export function Screen({ children, footer, onQuit }: ScreenProps) {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-4 pt-[max(1rem,env(safe-area-inset-top))]">
      {onQuit && (
        <button
          type="button"
          onClick={onQuit}
          className="pop-sm press self-start rounded-xl bg-paper px-3 py-1 text-sm font-extrabold"
        >
          ← Sair
        </button>
      )}
      <main className="flex flex-1 flex-col gap-6 py-4">{children}</main>
      {footer && (
        <footer className="sticky bottom-0 -mx-4 bg-gradient-to-t from-stage-dark via-stage-dark/90 to-transparent px-4 pt-6 pb-[max(1rem,env(safe-area-inset-bottom))]">
          {footer}
        </footer>
      )}
    </div>
  )
}
