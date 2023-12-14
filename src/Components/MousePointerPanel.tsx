import * as THREE from "three"

import { Cylinder, useFBX } from "@react-three/drei"
import { useLayoutEffect, useRef } from "react"
import { Base, Geometry, Subtraction } from "@react-three/csg"

const MousePointer = () => {
  const fbx1 = useFBX("./3dmodels/mousePointer.fbx")

  const modelRef = useRef<THREE.Group>()

  useLayoutEffect(() => {
    // Access the underlying THREE.Group
    modelRef.current = fbx1 as THREE.Group
  }, [fbx1])

  return (
    <group position={[12, 0, -15.5]} rotation={[0, -Math.PI / 5, 0]}>
      <primitive
        object={fbx1}
        position={[0, 6.5, 0.1]}
        scale={[0.005, 0.01, 0.005]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <Cylinder
        position={[0, 2.5, 0]}
        args={[0.1, 0.1, 6, 32]}
        rotation={[0, 0, 0]}
        castShadow
      >
        <meshStandardMaterial color="#d0bdde" />
      </Cylinder>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 7, 0]} castShadow>
        <Geometry useGroups>
          <Base name="base">
            <cylinderBufferGeometry args={[1.7, 1.7, 0.4, 32]} />
            <meshStandardMaterial color="#ffffff" side={THREE.DoubleSide} />
          </Base>
          <Subtraction name="hole" position={[0, 0.15, 0]}>
            <cylinderBufferGeometry args={[1.5, 1.5, 0.3, 32]} />
            <meshStandardMaterial color="#585efc" side={THREE.DoubleSide} />
          </Subtraction>
          <Subtraction name="hole" position={[0, -0.3, 0]}>
            <cylinderBufferGeometry args={[1.5, 1.5, 0.3, 32]} />
            <meshStandardMaterial color="#585efc" side={THREE.DoubleSide} />
          </Subtraction>
        </Geometry>
      </mesh>
    </group>
  )
}

export default MousePointer
