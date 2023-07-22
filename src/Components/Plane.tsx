import React, { useRef } from "react"
import { useGLTF } from "@react-three/drei"
import * as THREE from "three"
import { GLTF } from "three-stdlib"

type GLTFResult = GLTF & {
  nodes: {
    awionetka: THREE.Mesh
  }
  materials: {
    ["airplane.002"]: THREE.MeshStandardMaterial
  }
}

export function Model(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/airplane.glb") as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.awionetka.geometry}
        material={materials["airplane.002"]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.1}
      />
    </group>
  )
}

useGLTF.preload("/airplane.glb")
