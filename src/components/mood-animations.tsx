"use client"

// Happy - Bouncing music notes
export function HappyAnimation() {
  return (
    <div className="flex gap-2 justify-center mb-4">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-3 h-3 bg-primary rounded-full animate-bounce"
          style={{
            animationDelay: `${i * 0.15}s`,
            animationDuration: "0.6s",
          }}
        />
      ))}
    </div>
  )
}

// Chill - Slow wave motion
export function ChillAnimation() {
  return (
    <div className="flex gap-1 justify-center mb-4 h-8 items-end">
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="w-1 bg-primary"
          style={{
            animation: "wave 2s ease-in-out infinite",
            animationDelay: `${i * 0.2}s`,
            height: "20%",
          }}
        />
      ))}
    </div>
  )
}

// Energetic - Fast pulsing bars
export function EnergeticAnimation() {
  return (
    <div className="flex gap-1 justify-center mb-4 h-8 items-end">
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="w-1 bg-primary"
          style={{
            animation: "energetic 0.4s ease-in-out infinite",
            animationDelay: `${i * 0.05}s`,
            height: "30%",
          }}
        />
      ))}
    </div>
  )
}

// Sad - Slow falling teardrops
export function SadAnimation() {
  return (
    <div className="flex gap-3 justify-center mb-4 h-8 relative">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-2 h-3 bg-primary rounded-b-full"
          style={{
            animation: "fall 2.5s ease-in infinite",
            animationDelay: `${i * 0.8}s`,
            opacity: 0,
          }}
        />
      ))}
    </div>
  )
}

// Focused - Steady pulse
export function FocusedAnimation() {
  return (
    <div className="flex justify-center mb-4 h-8 items-center">
      <div className="relative w-8 h-8">
        <div
          className="absolute inset-0 border-2 border-primary rounded-full animate-ping"
          style={{ animationDuration: "2s" }}
        />
        <div className="absolute inset-2 bg-primary rounded-full" />
      </div>
    </div>
  )
}

// Romantic - Heartbeat pulse
export function RomanticAnimation() {
  return (
    <div className="flex justify-center mb-4 h-8 items-center">
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        className="animate-pulse"
        style={{ animationDuration: "1s" }}
      >
        <path
          d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
          fill="currentColor"
          className="text-primary"
        />
      </svg>
    </div>
  )
}

// Party - Spinning disco effect
export function PartyAnimation() {
  return (
    <div className="flex justify-center mb-4 h-8 items-center">
      <div className="relative w-8 h-8">
        <div
          className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"
          style={{ animationDuration: "1s" }}
        />
        <div
          className="absolute inset-2 border-4 border-primary border-b-transparent rounded-full animate-spin"
          style={{ animationDuration: "0.7s", animationDirection: "reverse" }}
        />
      </div>
    </div>
  )
}

// Peaceful - Gentle breathing circle
export function PeacefulAnimation() {
  return (
    <div className="flex justify-center mb-4 h-8 items-center">
      <div className="w-6 h-6 bg-primary rounded-full" style={{ animation: "breathe 3s ease-in-out infinite" }} />
    </div>
  )
}
