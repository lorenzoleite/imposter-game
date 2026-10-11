import { useEffect, type ReactNode } from 'react'
import { Button } from './Button'

interface ConfirmDialogProps {
  emoji: string
  title: string
  children: ReactNode
  confirmLabel: string
  cancelLabel: string
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmDialog({
  emoji,
  title,
  children,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onCancel()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onCancel])

  return (
    <div
      className="fixed inset-0 z-10 grid place-items-center bg-ink/70 p-4"
      onClick={onCancel}
    >
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        onClick={(e) => e.stopPropagation()}
        className="pop flex w-full max-w-sm -rotate-1 animate-pop-in flex-col items-center gap-4 rounded-3xl bg-paper p-6 text-center"
      >
        <span className="text-6xl animate-wiggle">{emoji}</span>
        <h2 id="confirm-title" className="font-display text-3xl">
          {title}
        </h2>
        <div className="font-bold text-ink/70">{children}</div>
        <div className="flex w-full flex-col gap-3">
          <Button size="lg" color="tomato" onClick={onConfirm}>
            {confirmLabel}
          </Button>
          <Button color="paper" onClick={onCancel} autoFocus>
            {cancelLabel}
          </Button>
        </div>
      </div>
    </div>
  )
}
