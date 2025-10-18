export function VinylRecord({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  }

  return (
    <div className={`${sizeClasses[size]} relative animate-spin-slow`}>
      <div className="absolute inset-0 rounded-full bg-primary/20 border-2 border-primary"></div>
      <div className="absolute inset-[30%] rounded-full bg-black border border-primary/50"></div>
      <div className="absolute inset-[45%] rounded-full bg-primary/30"></div>
    </div>
  )
}
