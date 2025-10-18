export function Equalizer() {
  return (
    <div className="flex items-end justify-center gap-0.5 h-6">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="w-1 bg-primary animate-equalizer"
          style={{
            animationDelay: `${i * 0.15}s`,
          }}
        />
      ))}
    </div>
  )
}
