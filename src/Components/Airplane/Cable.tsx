import { QuadraticBezierLine } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import * as THREE from "three"

interface CableProps {
  start: React.MutableRefObject<THREE.Group>
  end: React.MutableRefObject<THREE.Mesh>
  v1?: THREE.Vector3
  flagHeight: number
}

const Cable = ({ start, end, flagHeight }: CableProps) => {
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
    const flagMidRight = new THREE.Vector3().copy(flagSize).multiplyScalar(0.5)
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

export default Cable
