import * as THREE from "three"
import { useFBX } from "@react-three/drei"
import { TextureLoader } from "three/src/loaders/TextureLoader"
import { useFrame, useLoader } from "@react-three/fiber"
import { useControls } from "leva"
import { useRef } from "react"

export default function Plane() {
  const ref = useRef<THREE.Group>(null!)
  const fbx = useFBX("/3dmodels/airplane/airplane.fbx")
  const [colorMap, normalMap] = useLoader(TextureLoader, [
    "/3dmodels/airplane/color.png",
    "/3dmodels/airplane/normal.png",
  ])

  const { speed } = useControls({
    speed: {
      value: 0.4,
      min: 0,
      max: 4,
      step: 0.01,
    },
  })

  if (fbx) {
    fbx.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // Change the color of the material
        const material = new THREE.MeshStandardMaterial()
        child.material = material

        // Apply texture map to the material
        material.map = colorMap
        material.normalMap = normalMap
      }
    })
  }

  const radius = 60
  // const speed = 0.1

  useFrame((state) => {
    const elapsedTime = state.clock.getElapsedTime() * speed
    const angle = elapsedTime % Math.PI

    // Calculate the object's new position based on a semi-circle path
    const x = -20 + radius * Math.cos(angle)
    const z = 30 - Math.abs(radius * Math.sin(angle))

    ref.current.position.set(x, 7, z)
    ref.current.rotation.y = angle
  })

  return (
    <group dispose={null} ref={ref}>
      <mesh scale={0.03} rotation={[Math.PI, -Math.PI, 0]}>
        <primitive object={fbx} />
      </mesh>
    </group>
  )
}
