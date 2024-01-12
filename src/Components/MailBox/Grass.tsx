import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import * as THREE from "three"

import { memo } from "react"

interface GrassProps {
  grassCount?: number
  grassHeight?: number
  grassWidth?: number
}

const Grass = memo(
  ({ grassCount = 1000, grassHeight = 0.5, grassWidth = 0.1 }: GrassProps) => {
    const grassPositions = Array.from({ length: grassCount }, () => ({
      x: Math.random() * 5 - 2.5,
      y: 0.22,
      z: Math.random() * 5 - 2.5,
    }))

    const grassRef = useRef<THREE.Group>(null)

    useFrame((state) => {
      const elapsedTime = state.clock.getElapsedTime() * 0.5

      if (grassRef.current) {
        grassRef.current.children.forEach((object) => {
          const grass = object as THREE.Mesh
          const vertices = grass.geometry.attributes.position.array as number[]
          for (let i = 0; i < vertices.length; i += 3) {
            const waveY1 = 0.06 * Math.sin(vertices[i + 1] + elapsedTime * 3)
            const multi = (vertices[i + 1] + 0.25) / grassHeight

            vertices[i + 2] = waveY1 * multi
          }
          grass.geometry.attributes.position.needsUpdate = true
        })
      }
    })

    return (
      <>
        <group ref={grassRef} position={[13, 0, 0]}>
          {grassPositions.map((position, index) => (
            <mesh
              key={index}
              position={[position.x, position.y, position.z]}
              rotation={[0, Math.random() * 360, 0]}
              castShadow
            >
              <planeBufferGeometry args={[grassWidth, grassHeight]} />
              <meshStandardMaterial color="#3A9D23" side={THREE.DoubleSide} />
            </mesh>
          ))}
        </group>
      </>
    )
  },
)

export default Grass
