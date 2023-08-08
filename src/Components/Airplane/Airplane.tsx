/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as THREE from "three"
import { useRef, useState } from "react"

import { useFBX } from "@react-three/drei"
import { TextureLoader } from "three/src/loaders/TextureLoader"
import { useFrame, useLoader } from "@react-three/fiber"
import { useControls } from "leva"

import Cable from "./Cable"
import Banner from "./Banner"

const Airplane = () => {
  const flagWidth = 4 // Width of the plane
  const flagHeight = 20 // Height of the plane
  const radius = 60 // Radius of the airplane's circular path
  const speed = 0.14 // Speed of the airplane

  const airplaneRef = useRef<THREE.Group>(null!)
  const flagRef = useRef<THREE.Mesh>(null!)
  // useHelper(flagRef, THREE.Box3Helper)
  const flagGroupRef = useRef<THREE.Group>(null!)
  const [hideCable, setHideCable] = useState(false)

  const fbx = useFBX("/3dmodels/airplane/airplane.fbx")
  const [colorMap, normalMap] = useLoader(TextureLoader, [
    "/3dmodels/airplane/color.png",
    "/3dmodels/airplane/normal.png",
  ])

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

  useFrame((state) => {
    const elapsedTime = state.clock.getElapsedTime() * speed
    const angle = elapsedTime % Math.PI

    console.log(angle)

    if (angle < 0.4 || angle > 3) {
      setHideCable(true)
    } else {
      setHideCable(false)
    }

    // Calculate the object's new position based on a semi-circle path
    const airplaneX = -20 + radius * Math.cos(angle)
    const airplaneZ = 30 - Math.abs(radius * Math.sin(angle))

    airplaneRef.current.position.set(airplaneX, 7, airplaneZ)
    airplaneRef.current.rotation.set(0, angle, angle * 0.5)
  })

  return (
    <>
      <Banner
        text="DÉVELOPPEUR FRONT-END | OPEN TO WORK :)"
        flagGroupRef={flagGroupRef}
        flagRef={flagRef}
        flagWidth={flagWidth}
        flagHeight={flagHeight}
        radius={radius}
        speed={speed}
      />
      <group dispose={null} ref={airplaneRef}>
        <mesh scale={0.03} rotation={[Math.PI, -Math.PI, 0]}>
          <primitive object={fbx} />
        </mesh>
      </group>
      {hideCable ? null : (
        <Cable start={airplaneRef} end={flagRef} flagHeight={flagHeight} />
      )}
    </>
  )
}

export default Airplane
