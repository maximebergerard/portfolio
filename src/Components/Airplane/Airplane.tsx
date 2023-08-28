/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as THREE from "three"
import { useEffect, useRef, useState } from "react"

import { useCursor, useFBX } from "@react-three/drei"
import { TextureLoader } from "three/src/loaders/TextureLoader"
import { useFrame, useLoader } from "@react-three/fiber"

import Cable from "./Cable"
import Banner from "./Banner"

const Airplane = () => {
  const flagWidth = 4 // Width of the plane
  const flagHeight = 20 // Height of the plane
  const radius = 56 // Radius of the airplane's circular path
  const speed = 0.2 // Speed of the airplane

  const airplaneRef = useRef<THREE.Group>(null!)
  const flagRef = useRef<THREE.Mesh>(null!)
  const flagGroupRef = useRef<THREE.Group>(null!)
  const clockRef = useRef<THREE.Clock>(new THREE.Clock())

  const [hasIncremented, setHasIncremented] = useState(false)
  const [angle, setAngle] = useState(0)
  const [circle, setCircle] = useState(2)
  const [rotationStart, setRotationStart] = useState(0)
  const [isRotating, setIsRotating] = useState(false)
  const [hovered, setHovered] = useState(false)

  useCursor(hovered, "pointer", "auto")

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

  useFrame(() => {
    const elapsedTime = clockRef.current.getElapsedTime()

    setAngle((elapsedTime * speed) % (2 * Math.PI))

    // Calculate the object's new position based on a semi-circle path
    const airplaneX = radius * Math.cos(elapsedTime * speed)
    const airplaneZ = radius * Math.sin(elapsedTime * speed)
    airplaneRef.current.position.set(airplaneX, 6, airplaneZ)

    if (isRotating) {
      const rotationDelta = elapsedTime - rotationStart
      if (rotationDelta < 5) {
        const t = rotationDelta / 5
        const easeT = 1 - (1 - t) ** 4 // easing function
        airplaneRef.current.rotation.set(
          0,
          (7 * Math.PI) / 7 - elapsedTime * speed,
          easeT * Math.PI * 10 + Math.sin(elapsedTime) - Math.PI / 6,
        )
      } else {
        setIsRotating(false)
        airplaneRef.current.rotation.z = Math.sin(elapsedTime) - Math.PI / 6
      }
    } else {
      airplaneRef.current.rotation.set(
        0,
        (7 * Math.PI) / 7 - elapsedTime * speed,
        Math.sin(elapsedTime) - Math.PI / 6,
      )
    }
  })

  const handleClick = () => {
    setIsRotating(true)
    setRotationStart(clockRef.current.getElapsedTime())
  }

  useEffect(() => {
    if (angle < 0.1 && !hasIncremented) {
      setCircle((circle) => (circle + 1) % 2)
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
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
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
      return "MAXIME.BERGERARD@GMAIL.COM"
    default:
      return "DÉVELOPPEUR FRONT-END | OPEN TO WORK :)"
  }
}
