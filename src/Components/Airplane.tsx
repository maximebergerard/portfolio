/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as THREE from "three"
import { Plane, QuadraticBezierLine, useFBX } from "@react-three/drei"
import { TextureLoader } from "three/src/loaders/TextureLoader"
import { useFrame, useLoader } from "@react-three/fiber"
import { useControls } from "leva"
import { useRef } from "react"

export default function Airplane() {
  const airplaneRef = useRef<THREE.Group>(null!)
  const flagRef = useRef<THREE.Mesh>(null!)
  const flagGroupRef = useRef<THREE.Group>(null!)

  const fbx = useFBX("/3dmodels/airplane/airplane.fbx")
  const [colorMap, normalMap] = useLoader(TextureLoader, [
    "/3dmodels/airplane/color.png",
    "/3dmodels/airplane/normal.png",
  ])

  const { speed } = useControls({
    speed: {
      value: 0.14,
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
    const flagAngle = (elapsedTime - 0.4) % Math.PI

    // Calculate the object's new position based on a semi-circle path
    const planeX = -20 + radius * Math.cos(angle)
    const planeZ = 30 - Math.abs(radius * Math.sin(angle))

    airplaneRef.current.position.set(planeX, 7, planeZ)
    airplaneRef.current.rotation.set(0, angle, angle * 0.5)

    // Calculate the flag's new position based on a semi-circle path
    const flagX = -20 + radius * Math.cos(flagAngle)
    const flagZ = 30 - Math.abs(radius * Math.sin(flagAngle))

    flagRef.current.position.set(flagX, 7, flagZ)
    flagRef.current.rotation.set(0, angle + (5 * Math.PI) / 12, -Math.PI / 2)
    // console.log(flagRef.current.geometry.attributes.uv.array)

    // Update the vertices of the plane using a wave effect
    if (flagRef.current) {
      const vertices = flagRef.current.geometry.attributes.position.array
      const width = 5 // Width of the plane
      const height = 15 // Height of the plane
      const widthSegments = width * 4 // Number of segments along the width of the plane
      const heightSegments = height * 4 // Number of segments along the height of the plane

      for (let j = 0; j <= heightSegments; j++) {
        for (let i = 0; i <= widthSegments; i++) {
          const vertexIndex = j * (widthSegments + 1) + i
          // const x = vertices[vertexIndex * 3]
          const y = vertices[vertexIndex * 3 + 1]
          const z = j === 0 ? 0 : Math.sin(y + elapsedTime * 15) * 0.5 // Adjust amplitude and frequency as needed

          // @ts-ignore
          // TODO fix this
          vertices[vertexIndex * 3 + 2] = z
        }
      }

      flagRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  interface CableProps {
    start: React.MutableRefObject<THREE.Group>
    end: React.MutableRefObject<THREE.Mesh>
    v1?: THREE.Vector3
  }

  const Cable = ({ start, end }: CableProps) => {
    const lineRef = useRef<any>(null!)

    useFrame(() => {
      const airplaneSize = new THREE.Vector3(0, 2, 7)
      const airplanePosition = start.current?.position || new THREE.Vector3()
      const airplaneRotation = start.current?.rotation || new THREE.Euler()

      const airPlaneTail = new THREE.Vector3()
        .copy(airplaneSize)
        .multiplyScalar(0.5)
      airPlaneTail.applyEuler(airplaneRotation).add(airplanePosition)

      const flagSize = new THREE.Vector3(0, 15, 0) // Width, Height, Depth of the flag
      const flagPosition = end.current?.position || new THREE.Vector3()
      const flagRotation = end.current?.rotation || new THREE.Euler()

      // Calculate the position of the flag's top-right corner in world space
      const flagMidRight = new THREE.Vector3()
        .copy(flagSize)
        .multiplyScalar(0.5)
      flagMidRight.applyEuler(flagRotation).add(flagPosition)

      // Update the points of the quadratic bezier curve
      lineRef.current.setPoints(airPlaneTail, flagMidRight)
    })

    return (
      <QuadraticBezierLine
        start={[0, 0, 0]}
        end={[0, 0, 0]}
        ref={lineRef}
        lineWidth={1}
        color="#000000"
      />
    )
  }

  return (
    <>
      <group ref={flagGroupRef}>
        <Plane
          ref={flagRef}
          position={[0, 3, 0]}
          args={[4, 15, 16, 60]}
          rotation={[0, 0, 0]}
        >
          <meshStandardMaterial side={THREE.DoubleSide} color={"white"} />
        </Plane>
      </group>
      <group dispose={null} ref={airplaneRef}>
        <mesh scale={0.03} rotation={[Math.PI, -Math.PI, 0]}>
          <primitive object={fbx} />
        </mesh>
      </group>
      <Cable start={airplaneRef} end={flagRef} />
    </>
  )
}
