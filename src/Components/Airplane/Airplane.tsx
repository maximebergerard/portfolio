import * as THREE from "three"
import { useEffect, useRef, useState } from "react"

import { Box, useFBX } from "@react-three/drei"
import { TextureLoader } from "three/src/loaders/TextureLoader"
import { ThreeEvent, useFrame, useLoader, useThree } from "@react-three/fiber"

import Cable from "./Cable"
import Banner from "./Banner"
import { drawTextOnCanvasProps } from "./Banner"

const Airplane = () => {
  const flagWidth = 3 // Width of the plane
  const flagHeight = 20 // Height of the plane
  const radius = 70 // Radius of the airplane's circular path
  const speed = 0.15 // Speed of the airplane

  const { camera, scene } = useThree()
  const airplaneRef = useRef<THREE.Group | null>(null)
  const flagRef = useRef<THREE.Mesh | null>(null)
  const flagGroupRef = useRef<THREE.Group | null>(null)
  const clockRef = useRef<THREE.Clock>(new THREE.Clock())
  const hitboxRef1 = useRef<THREE.Mesh | null>(null)
  const hitboxRef2 = useRef<THREE.Mesh | null>(null)
  const fbx = useFBX("./3dmodels/Airplane/airplane.fbx")

  const [hasIncremented, setHasIncremented] = useState(false)
  const [angle, setAngle] = useState(0)
  const [circle, setCircle] = useState(2)
  const [rotationStart, setRotationStart] = useState(0)
  const [isRotating, setIsRotating] = useState(false)

  if (hitboxRef1.current) {
    hitboxRef1.current.name = "Airplane"
  }
  if (hitboxRef2.current) {
    hitboxRef2.current.name = "Airplane"
  }

  const [colorMap, normalMap] = useLoader(TextureLoader, [
    "./3dmodels/Airplane/color.png",
    "./3dmodels/Airplane/normal.png",
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
    const elapsedTime = state.clock.getElapsedTime()

    setAngle((elapsedTime * speed) % (2 * Math.PI))

    if (airplaneRef.current) {
      // Calculate the object's new position based on a semi-circle path
      const airplaneX = radius * Math.cos(elapsedTime * speed)
      const airplaneZ = radius * Math.sin(elapsedTime * speed)
      airplaneRef.current.position.set(airplaneX, 4, airplaneZ)

      if (isRotating) {
        const rotationDelta = elapsedTime - rotationStart
        if (rotationDelta < 5) {
          const t = rotationDelta / 5
          const easeT = 1 - (1 - t) ** 4 // easing function
          airplaneRef.current.rotation.set(
            0,
            (7 * Math.PI) / 7 - elapsedTime * speed,
            easeT * Math.PI * 400 + Math.sin(elapsedTime) - Math.PI / 6,
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
    }
  })

  useEffect(() => {
    if (angle < 0.1 && !hasIncremented) {
      setCircle((circle) => (circle + 1) % 2)
      setHasIncremented(true)
    } else if (angle > 0.1) {
      setHasIncremented(false)
    }
  }, [angle, hasIncremented])

  useEffect(() => {
    const timer = setTimeout(() => {
      setRotationStart(clockRef.current.getElapsedTime())
    }, 2000)

    // Cleanup function to clear the timeout if the component unmounts before the timeout finishes
    return () => clearTimeout(timer)
  }, []) // Empty dependency array means this effect runs once on mount

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()

    // Calculate the mouse position in normalized device coordinates
    // (-1 to +1) for both components
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

    // Set the origin and direction of the ray based on the mouse position
    raycaster.setFromCamera(mouse, camera)

    // Check if the ray intersects with the mannequin mesh
    const intersects = raycaster.intersectObjects(scene.children, true)

    if (intersects.length > 0 && intersects[0].object.name === "Airplane") {
      setIsRotating(true)
      setRotationStart(clockRef.current.getElapsedTime())
    }
  }

  return (
    <>
      <Banner
        textParams={setBannerText(circle).textParams}
        flagGroupRef={flagGroupRef}
        flagRef={flagRef as React.MutableRefObject<THREE.Mesh> | null}
        flagWidth={flagWidth}
        flagHeight={flagHeight}
        radius={radius}
        speed={speed}
      />
      <group dispose={null} ref={airplaneRef} onClick={handleClick}>
        <mesh scale={0.03} rotation={[Math.PI, -Math.PI, 0]}>
          <primitive object={fbx} />
        </mesh>
        <Box
          args={[1.7, 1.2, 5]}
          position={[0, 1, 1.3]}
          ref={hitboxRef1}
          visible={false}
        />
        <Box
          args={[7, 1, 1.2]}
          position={[0, 1, 0.5]}
          ref={hitboxRef2}
          visible={false}
        />
      </group>
      <Cable
        start={airplaneRef as React.MutableRefObject<THREE.Group> | null}
        end={flagRef as React.MutableRefObject<THREE.Mesh> | null}
        flagHeight={flagHeight}
        speed={speed}
      />
    </>
  )
}

export default Airplane

const setBannerText = (circle: number): drawTextOnCanvasProps => {
  switch (circle) {
    default:
      return {
        textParams: {
          text: "OUVERT AUX PROPOSITIONS FRONT-END & NOCODE",
        },
      }
  }
}
