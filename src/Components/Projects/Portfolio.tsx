import { useFBX } from "@react-three/drei"
import { useLayoutEffect } from "react"
import * as THREE from "three"

interface PortfolioProps {
  position: [number, number, number]
}

const Portfolio = ({ position }: PortfolioProps) => {
  const logoFolio = useFBX("./3dmodels/Logo/rubiks_cube.fbx")

  useLayoutEffect(
    () =>
      logoFolio.traverse(
        (o) =>
          o instanceof THREE.Mesh && (o.castShadow = o.receiveShadow = true),
      ),
    [logoFolio],
  )
  return (
    <>
      <primitive
        object={logoFolio}
        position={position}
        scale={0.018}
        rotation={[0, -Math.PI / 3, 0]}
      />
    </>
  )
}

export default Portfolio
