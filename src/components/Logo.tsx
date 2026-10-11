export function Logo({ small = false }: { small?: boolean }) {
  return (
    <h1 className="flex flex-col items-center select-none">
      <span
        className={`pop -rotate-3 rounded-xl bg-bubble px-3 font-display text-ink ${small ? 'text-lg' : 'text-2xl'}`}
      >
        Quem é o
      </span>
      <span
        className={`-mt-1 rotate-2 font-display leading-none text-sun text-outline ${small ? 'text-5xl' : 'text-7xl'}`}
      >
        Impostor?
      </span>
    </h1>
  )
}
