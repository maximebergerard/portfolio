import { Plane, useCursor } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useState } from "react"
import * as THREE from "three"

export interface drawTextOnCanvasProps {
  textParams: {
    text: string
  }
}

const drawTextOnCanvas = ({ textParams }: drawTextOnCanvasProps) => {
  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")
  canvas.width = 850
  canvas.height = 100

  if (!ctx) return canvas
  // Background
  ctx.fillStyle = "#ffffff"
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // Font
  ctx.font = "36px 'Oswald', sans-serif"

  ctx.fillStyle = "#000000"
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"
  ctx.fillText(textParams.text, canvas.width / 2, canvas.height / 2)

  // Draw the underline
  ctx.beginPath() // +70 et -50
  ctx.lineWidth = 2 // Set the thickness of the underline
  ctx.stroke()

  return canvas
}

interface BannerProps extends drawTextOnCanvasProps {
  flagGroupRef: React.Ref<THREE.Group>
  flagRef: React.MutableRefObject<
    THREE.Mesh<
      THREE.BufferGeometry<THREE.NormalBufferAttributes>,
      THREE.Material | THREE.Material[]
    >
  > | null
  flagWidth: number
  flagHeight: number
  radius: number
  speed: number
}

const Banner = ({
  textParams,
  flagGroupRef,
  flagRef,
  flagWidth,
  flagHeight,
  radius,
  speed,
}: BannerProps) => {
  // Create the texture using the canvas with the text
  const texture = new THREE.CanvasTexture(drawTextOnCanvas({ textParams }))
  const [hovered, setHovered] = useState(false)

  // Adjust texture properties to fit the rotated texture on the plane
  texture.rotation = Math.PI / 2
  texture.center.set(0.5, 0.5)
  texture.offset.set(0, 0)

  useCursor(hovered, "pointer", "auto")

  useFrame((state) => {
    const elapsedTime = state.clock.getElapsedTime() * speed
    const flagAngle = elapsedTime - 0.45

    // Calculate the flag's new position based on a semi-circle path
    const flagX = radius * Math.cos(flagAngle)
    const flagZ = radius * Math.sin(flagAngle)

    if (!flagRef) return

    flagRef.current.position.set(flagX, 5, flagZ)
    flagRef.current.rotation.set(
      0,
      (8.2 * Math.PI) / 5 - elapsedTime,
      -Math.PI / 2,
    )

    // Update the vertices of the plane using a wave effect
    if (flagRef.current) {
      const vertices = flagRef.current.geometry.attributes.position
        .array as number[]

      for (let i = 0; i < vertices.length; i += 3) {
        const waveX1 = 0.4 * Math.sin(vertices[i] * 2 + elapsedTime * 8)
        const waveY1 = 0.8 * Math.sin(vertices[i + 1] + elapsedTime * 16)
        const waveY2 = -0.6 * Math.sin(vertices[i + 1] + elapsedTime * 8)
        const multi = (vertices[i + 1] - 13) / flagHeight

        vertices[i + 2] = (waveY1 + waveY2 + waveX1) * multi
      }

      flagRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <group
      ref={flagGroupRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <Plane
        ref={flagRef}
        position={[0, 3, 0]}
        args={[flagWidth, flagHeight, flagWidth * 4, flagHeight * 4]}
        receiveShadow
      >
        <meshStandardMaterial map={texture} side={THREE.DoubleSide} />
      </Plane>
    </group>
  )
}

export default Banner
