import * as THREE from "three"
import { useFBX } from "@react-three/drei"
import { TextureLoader } from "three/src/loaders/TextureLoader"
import { useLoader } from "@react-three/fiber"

export default function Plane() {
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

  // const map = new TextureLoader().load("/3dmodels/airplane/map.png")
  return (
    <group dispose={null}>
      <mesh rotation={[Math.PI, 0, 0]} scale={0.1}>
        <primitive object={fbx} />
        {/* <meshStandardMaterial map={map} /> */}
      </mesh>
    </group>
  )
}
