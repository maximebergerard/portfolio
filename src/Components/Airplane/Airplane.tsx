/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as THREE from "three"
import { useEffect, useRef, useState } from "react"

import { useFBX } from "@react-three/drei"
import { TextureLoader } from "three/src/loaders/TextureLoader"
import { useFrame, useLoader } from "@react-three/fiber"

import Cable from "./Cable"
import Banner from "./Banner"

const Airplane = () => {
  const flagWidth = 4 // Width of the plane
  const flagHeight = 20 // Height of the plane
  const radius = 50 // Radius of the airplane's circular path
  const speed = 0.2 // Speed of the airplane

  const airplaneRef = useRef<THREE.Group>(null!)
  const flagRef = useRef<THREE.Mesh>(null!)
  const flagGroupRef = useRef<THREE.Group>(null!)

  const [hasIncremented, setHasIncremented] = useState(false)
  const [angle, setAngle] = useState(0)
  const [circle, setCircle] = useState(2)
  const [isClicked, setIsClicked] = useState(false)

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
    setAngle(elapsedTime % (2 * Math.PI))

    // Calculate the object's new position based on a semi-circle path
    const airplaneX = radius * Math.cos(elapsedTime)
    const airplaneZ = radius * Math.sin(elapsedTime)

    airplaneRef.current.position.set(airplaneX, 7, airplaneZ)
    // airplaneRef.current.position.set(0, 7, 0)

    // TODO - Fix the rotation of the airplane when it clicked is false
    if (isClicked) {
      airplaneRef.current.rotation.set(
        0,
        (6 * Math.PI) / 7 - elapsedTime,
        airplaneRef.current.rotation.z - 0.05,
      )
    } else {
      airplaneRef.current.rotation.set(
        0,
        (6 * Math.PI) / 7 - elapsedTime,
        Math.sin(elapsedTime) - Math.PI / 6,
      )
    }
  })

  useEffect(() => {
    if (angle < 0.1 && !hasIncremented) {
      setCircle((circle) => (circle + 1) % 3)
      setHasIncremented(true)
    } else if (angle > 0.1) {
      setHasIncremented(false)
    }
  }, [angle, hasIncremented])

  return (
    <>
      <Banner
        text={setBannerText(circle)}
        flagGroupRef={flagGroupRef}
        flagRef={flagRef}
        flagWidth={flagWidth}
        flagHeight={flagHeight}
        radius={radius}
        speed={speed}
      />
      <group
        dispose={null}
        ref={airplaneRef}
        onClick={() => {
          if (isClicked) return
          setIsClicked(true)
          setTimeout(() => {
            setIsClicked(false)
          }, 4000)
        }}
      >
        <mesh scale={0.03} rotation={[Math.PI, -Math.PI, 0]}>
          <primitive object={fbx} />
        </mesh>
      </group>
      <Cable
        start={airplaneRef}
        end={flagRef}
        flagHeight={flagHeight}
        speed={speed}
      />
    </>
  )
}

export default Airplane

const setBannerText = (circle: number) => {
  switch (circle) {
    case 0:
      return "DÉVELOPPEUR FRONT-END | OPEN TO WORK :)"
    case 1:
      return "INTÉGRATION WEB | MAINTENANCE DE SITE"
    case 2:
      return "MAXIME.BERGERARD@GMAIL.COM"
    default:
      return "DÉVELOPPEUR FRONT-END | OPEN TO WORK :)"
  }
}
