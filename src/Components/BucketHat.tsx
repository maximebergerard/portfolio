// import * as THREE from "three"
// import { useFBX } from "@react-three/drei"
// import { useLoader } from "@react-three/fiber"
// import { TextureLoader } from "three/src/loaders/TextureLoader"

// const BucketHat = () => {
//   const fbx = useFBX("./3dmodels/BucketHat/BucketHat.fbx")

//   // const [colorMap, normalMap] = useLoader(TextureLoader, [
//   //   "./3dmodels/BucketHat/TexturesCom_Rope_NaturalSisal_512_height.png",
//   //   "./3dmodels/BucketHat/TexturesCom_Rope_NaturalSisal_512_roughness@channels=G.png",
//   // ])

//   // if (fbx) {
//   //   fbx.traverse((child) => {
//   //     if (child instanceof THREE.Mesh) {
//   //       // Change the color of the material
//   //       const material = new THREE.MeshStandardMaterial()
//   //       child.material = material

//   //       // Apply texture map to the material
//   //       material.map = colorMap
//   //       material.normalMap = normalMap
//   //       material.color = new THREE.Color("grey")
//   //     }
//   //   })
//   // }

//   return (
//     <group position={[0, 2, 0]}>
//       {/* <primitive object={fbx} scale={1} /> */}
//     </group>
//   )
// }

// export default BucketHat
