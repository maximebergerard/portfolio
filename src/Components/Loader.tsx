import { Html, Plane, useProgress } from "@react-three/drei"
import * as THREE from "three"
import logo from "/images/mouse.svg"

interface ProgressBarProps {
  progress: number
}

const progressBar = ({ progress }: ProgressBarProps) => {
  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")

  canvas.width = 800
  canvas.height = 40

  const totalWidth = canvas.width
  const totalHeight = canvas.height

  const cornerRadius = 20 // Adjust the corner radius

  if (!ctx) return canvas
  ctx.fillStyle = "#a88cf5"
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // Draw the background bar
  ctx.fillStyle = "#a88cf5"
  roundRect(ctx, 0, 0, totalWidth, totalHeight, cornerRadius)
  ctx.fill()

  // Draw the filled portion of the bar
  const filledWidth = (progress / 100) * totalWidth
  ctx.fillStyle = "#ffffff"
  roundRect(ctx, 0, 0, filledWidth, totalHeight, cornerRadius)
  ctx.fill()
  return canvas
}

function roundRect(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  context.beginPath()
  context.moveTo(x + radius, y)
  context.lineTo(x + width - radius, y)
  context.arcTo(x + width, y, x + width, y + radius, radius)
  context.lineTo(x + width, y + height - radius)
  context.arcTo(x + width, y + height, x + width - radius, y + height, radius)
  context.lineTo(x + radius, y + height)
  context.arcTo(x, y + height, x, y + height - radius, radius)
  context.lineTo(x, y + radius)
  context.arcTo(x, y, x + radius, y, radius)
  context.closePath()
}

const Loader = () => {
  const { progress } = useProgress()
  const texture = new THREE.CanvasTexture(progressBar({ progress }))

  return (
    <>
      <Html
        center
        style={{
          color: "#1B1B5A",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p
          style={{
            fontFamily: "Oswald, sans-serif",
            fontSize: "2rem",
          }}
        >
          Chargement à {Math.round(progress)}%
        </p>
        <img src={logo} alt="mouse click" />
      </Html>
      <mesh position={[0, -0.5, 0]}>
        <planeGeometry args={[4, 0.1]} />
        <meshBasicMaterial map={texture} />
      </mesh>
    </>
  )
}

export default Loader
