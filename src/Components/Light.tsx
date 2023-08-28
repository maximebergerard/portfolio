import * as THREE from "three"

import { useHelper } from "@react-three/drei"
import { useRef } from "react"

const Light = () => {
  const directionalLight = useRef(new THREE.DirectionalLight())
  // useHelper(directionalLight, THREE.DirectionalLightHelper, 1, "cyan")

  const hemisphereLight = useRef(new THREE.HemisphereLight())
  // useHelper(hemisphereLight, THREE.HemisphereLightHelper, 1, "red")

  return (
    <>
      <ambientLight intensity={0.05} />
      <directionalLight
        ref={directionalLight}
        position={[6, 20, 26]}
        color={"white"}
        castShadow={true}
        intensity={0.4}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />

      <hemisphereLight
        ref={hemisphereLight}
        position={[0, 10, 16]}
        intensity={0.3}
        color={"#c9e5ff"}
        groundColor={"#c9e5ff"}
      />
    </>
  )
}

export default Light
