"use client"

import { useEffect, useRef } from "react"

export default function Component() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let time = 0

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const drawHalftoneWave = () => {
      const gridSize = 20
      const rows = Math.ceil(canvas.height / gridSize)
      const cols = Math.ceil(canvas.width / gridSize)

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const centerX = x * gridSize
          const centerY = y * gridSize

          // Calculate position relative to center
          const relX = (centerX - canvas.width / 2) / (canvas.width / 2)
          const relY = (centerY - canvas.height / 2) / (canvas.height / 2)

          // Create three curved wave bands like Spotify logo
          const wave1 = Math.abs(relY - Math.sin(relX * Math.PI * 0.5 + time) * 0.3) < 0.15
          const wave2 = Math.abs(relY - Math.sin(relX * Math.PI * 0.5 + time + 0.5) * 0.25) < 0.12
          const wave3 = Math.abs(relY - Math.sin(relX * Math.PI * 0.5 + time + 1) * 0.2) < 0.1

          let size = 0
          let alpha = 0

          if (wave1) {
            const distFromWave = Math.abs(relY - Math.sin(relX * Math.PI * 0.5 + time) * 0.3)
            size = gridSize * (1 - distFromWave / 0.15) * 0.9
            alpha = (1 - distFromWave / 0.15) * 0.8
          } else if (wave2) {
            const distFromWave = Math.abs(relY - Math.sin(relX * Math.PI * 0.5 + time + 0.5) * 0.25)
            size = gridSize * (1 - distFromWave / 0.12) * 0.8
            alpha = (1 - distFromWave / 0.12) * 0.7
          } else if (wave3) {
            const distFromWave = Math.abs(relY - Math.sin(relX * Math.PI * 0.5 + time + 1) * 0.2)
            size = gridSize * (1 - distFromWave / 0.1) * 0.7
            alpha = (1 - distFromWave / 0.1) * 0.6
          }

          if (size > 0) {
            ctx.beginPath()
            ctx.arc(centerX, centerY, size / 2, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(29, 185, 84, ${alpha})`
            ctx.fill()
          }
        }
      }
    }

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      drawHalftoneWave()

      time += 0.05
      animationFrameId = requestAnimationFrame(animate)
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="w-full h-screen bg-black" />
}
