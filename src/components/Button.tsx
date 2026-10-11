import type { ButtonHTMLAttributes } from 'react'

const COLORS = {
  sun: 'bg-sun',
  bubble: 'bg-bubble',
  sky: 'bg-sky',
  mint: 'bg-mint',
  tomato: 'bg-tomato',
  paper: 'bg-paper',
}

const SIZES = {
  md: 'px-5 py-2.5 text-xl rounded-2xl',
  lg: 'w-full px-4 py-4 text-2xl rounded-3xl',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: keyof typeof COLORS
  size?: keyof typeof SIZES
}

export function Button({ color = 'sun', size = 'md', className = '', ...props }: ButtonProps) {
  return (
    <button
      type="button"
      className={`pop press font-display tracking-wide text-ink uppercase disabled:opacity-50 ${COLORS[color]} ${SIZES[size]} ${className}`}
      {...props}
    />
  )
}
