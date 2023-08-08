import * as THREE from "three"

import { useHelper } from "@react-three/drei"
import { useRef } from "react"

const Light = () => {
  const directionalLight = useRef(new THREE.DirectionalLight())
  // useHelper(directionalLight, THREE.DirectionalLightHelper, 1, "transparent")
  return (
    <>
      <ambientLight intensity={0.1} />
      <directionalLight
        ref={directionalLight}
        position={[0, 14, 16]}
        color={"white"}
        castShadow={true}
        intensity={0.7}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />
    </>
  )
}

export default Light
