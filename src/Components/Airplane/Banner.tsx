import { Plane } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

const drawTextOnCanvas = (text: string) => {
  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")
  canvas.width = 760
  canvas.height = 100

  if (!ctx) return canvas
  // Background
  ctx.fillStyle = "#ffffff"
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // Font
  ctx.font = "36px 'Oswald', serif"

  ctx.fillStyle = "#000000"
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  ctx.letterSpacing = "2px"

  ctx.fillText(text, canvas.width / 2, canvas.height / 2)

  return canvas
}

interface BannerProps {
  text: string
  flagGroupRef: React.Ref<THREE.Group>
  flagRef: React.MutableRefObject<
    THREE.Mesh<
      THREE.BufferGeometry<THREE.NormalBufferAttributes>,
      THREE.Material | THREE.Material[]
    >
  >
  flagWidth: number
  flagHeight: number
  radius: number
  speed: number
}

const Banner = ({
  text,
  flagGroupRef,
  flagRef,
  flagWidth,
  flagHeight,
  radius,
  speed,
}: BannerProps) => {
  // Create the texture using the canvas with the text
  const texture = new THREE.CanvasTexture(drawTextOnCanvas(text))

  // Adjust texture properties to fit the rotated texture on the plane
  texture.rotation = Math.PI / 2
  texture.center.set(0.5, 0.5)
  texture.offset.set(0, 0)

  useFrame((state) => {
    const elapsedTime = state.clock.getElapsedTime() * speed
    const flagAngle = elapsedTime - 0.6

    // Calculate the flag's new position based on a semi-circle path
    const flagX = radius * Math.cos(flagAngle)
    const flagZ = radius * Math.sin(flagAngle)

    flagRef.current.position.set(flagX, 8, flagZ)
    flagRef.current.rotation.set(
      0,
      (8.2 * Math.PI) / 5 - elapsedTime,
      -Math.PI / 2,
    )

    // Update the vertices of the plane using a wave effect
    if (flagRef.current) {
      const vertices = flagRef.current.geometry.attributes.position.array

      for (let i = 0; i < vertices.length; i += 3) {
        const waveY1 = 0.8 * Math.sin(vertices[i + 1] + elapsedTime * 16)
        const waveY2 = -0.6 * Math.sin(vertices[i + 1] + elapsedTime * 8)
        const waveX1 = 0.4 * Math.sin(vertices[i] * 2 + elapsedTime * 8)
        const multi = (vertices[i + 1] - 13) / flagHeight

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        vertices[i + 2] = (waveY1 + waveY2 + waveX1) * multi
      }

      flagRef.current.geometry.attributes.position.needsUpdate = true
    }
  })
  return (
    <group ref={flagGroupRef}>
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
