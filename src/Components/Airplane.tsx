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
    v2?: THREE.Vector3
  }

  const Cable = ({
    start,
    end,
    v1 = new THREE.Vector3(),
    v2 = new THREE.Vector3(),
  }: CableProps) => {
    const lineRef = useRef<any>(null!)

    useFrame(() => {
      const flagSize = new THREE.Vector3(5, 15, 10) // Width, Height, Depth of the flag
      const flagPosition = flagRef.current?.position || new THREE.Vector3()
      const flagRotation = flagRef.current?.rotation || new THREE.Euler()

      // Calculate the position of the flag's top-right corner in world space
      const flagTopRight = new THREE.Vector3()
        .copy(flagSize)
        .multiplyScalar(0.05)
      flagTopRight.applyEuler(flagRotation).add(flagPosition)

      // Update the points of the quadratic bezier curve
      lineRef.current.setPoints(
        new THREE.Vector3(
          start.current.getWorldPosition(v1).x,
          start.current.getWorldPosition(v1).y + 0.5,
          start.current.getWorldPosition(v1).z,
        ),
        flagTopRight,
        end.current.getWorldPosition(v2),
      )
      // console.log(end.current.getWorldPosition(v2))
      // lineRef.current.setPoints(
      //   new THREE.Vector3(
      //     start.current.getWorldPosition(v1).x,
      //     start.current.getWorldPosition(v1).y + 0.5,
      //     start.current.getWorldPosition(v1).z,
      //   ),
      //   new THREE.Vector3(
      //     end.current.getWorldPosition(v2).x,
      //     end.current.getWorldPosition(v2).y,
      //     end.current.getWorldPosition(v2).z,
      //   ),
      // )
    })

    return (
      <QuadraticBezierLine
        start={[0, 0, 0]}
        end={[0, 0, 0]}
        ref={lineRef}
        lineWidth={3}
        color="#964B00"
      />
    )
  }

  return (
    <>
      <group ref={flagGroupRef}>
        <Plane
          ref={flagRef}
          position={[0, 3, 0]}
          args={[5, 15, 20, 60]}
          rotation={[0, 0, 0]}
        >
          <meshBasicMaterial side={THREE.DoubleSide} wireframe color={"blue"} />
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
