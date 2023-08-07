/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as THREE from "three"
import {
  Plane,
  QuadraticBezierLine,
  Text,
  useFBX,
  useHelper,
} from "@react-three/drei"
import { TextureLoader } from "three/src/loaders/TextureLoader"
import { useFrame, useLoader } from "@react-three/fiber"
import { useControls } from "leva"
import { useRef, useState } from "react"

export default function Airplane() {
  const flagWidth = 4 // Width of the plane
  const flagHeight = 20 // Height of the plane

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

    // Calculate the flag's new position based on a semi-circle path
    const flagX = -20 + radius * Math.cos(flagAngle)
    const flagZ = 30 - Math.abs(radius * Math.sin(flagAngle))

    flagRef.current.position.set(flagX, 8, flagZ)
    flagRef.current.rotation.set(0, angle + (-7 * Math.PI) / 12, -Math.PI / 2)

    // Update the vertices of the plane using a wave effect
    if (flagRef.current) {
      const vertices = flagRef.current.geometry.attributes.position.array

      for (let i = 0; i < vertices.length; i += 3) {
        const waveY1 = 0.4 * Math.sin(vertices[i + 1] - elapsedTime * 16)
        const waveY2 = -0.2 * Math.sin(vertices[i + 1] - elapsedTime * 8)
        const waveX1 = 0.1 * Math.sin(vertices[i] * 2 + elapsedTime * 8)
        const multi = (vertices[i + 1] + 13) / flagHeight

        // @ts-ignore
        // TODO fix this
        vertices[i + 2] = (waveY1 + waveY2 + waveX1) * multi
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

      const flagSize = new THREE.Vector3(0, -flagHeight, 0) // Width, Height, Depth of the flag
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

  const drawTextOnCanvas = (text: string) => {
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    canvas.width = 600
    canvas.height = 100

    if (!ctx) return canvas
    ctx.font = "32px sans-serif"
    ctx.fillStyle = "white"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"

    ctx.fillText(text, canvas.width / 2, canvas.height / 2)
    return canvas
  }

  interface TexturedPlaneProps {
    text: string
  }

  function TexturedPlane({ text }: TexturedPlaneProps) {
    // Create the texture using the canvas with the text
    const texture = new THREE.CanvasTexture(drawTextOnCanvas(text))
    // texture.needsUpdate = true

    // Adjust texture properties to fit the rotated texture on the plane
    texture.rotation = Math.PI / 2
    texture.center.set(0.5, 0.5)
    texture.offset.set(0, 0)

    return (
      <group ref={flagGroupRef}>
        <Plane
          ref={flagRef}
          position={[0, 3, 0]}
          args={[flagWidth, flagHeight, flagWidth * 4, flagHeight * 4]}
        >
          <meshBasicMaterial
            // color={"white"}
            map={texture}
            // wireframe
          />
        </Plane>
      </group>
    )
  }

  return (
    <>
      <TexturedPlane text="Développeur Front-End - Open to work :)" />
      <group dispose={null} ref={airplaneRef}>
        <mesh scale={0.03} rotation={[Math.PI, -Math.PI, 0]}>
          <primitive object={fbx} />
        </mesh>
      </group>
      {hideCable ? null : <Cable start={airplaneRef} end={flagRef} />}
    </>
  )
}
