import Wino from "./Wino"
import SmartGarant from "./SmartGarant"
import { useFBX } from "@react-three/drei"
import { useLayoutEffect } from "react"
import * as THREE from "three"

const Podium = () => {
  return (
    <>
      <mesh position={[-3, 0, 0]} castShadow receiveShadow>
        <boxBufferGeometry args={[3, 2.5, 3]} />
        <meshStandardMaterial color="#ffcffd" />
      </mesh>
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <boxBufferGeometry args={[3, 3, 3]} />
        <meshStandardMaterial color="#ffcffd" />
      </mesh>
      <mesh position={[3, 0, 0]} castShadow receiveShadow>
        <boxBufferGeometry args={[3, 2, 3]} />
        <meshStandardMaterial color="#ffcffd" />
      </mesh>
    </>
  )
}

const Project = () => {
  const fbx = useFBX("./3dmodels/projects_panel.fbx")

  useLayoutEffect(
    () =>
      fbx.traverse(
        (o) =>
          o instanceof THREE.Mesh && (o.castShadow = o.receiveShadow = true),
      ),
    [fbx],
  )

  return (
    <group position={[-5, 0, -4]}>
      <primitive
        object={fbx}
        scale={0.0013}
        position={[-5, 6, 4.6]}
        rotation={[0, -Math.PI / 4, 0]}
      />
      <Wino
        description="Développeur en alternance sur le site vitrine et l'application back-office pour Wino, une startup de caisse enregistreuse connectée. J'étais spécialisé dans le développement de l'interface en ReScript."
        position={[-4.3, 4.2, 5.2]}
      />
      <SmartGarant
        description="J'ai collaboré et supervisé la création d'un site web complet, en contribuant au frontend avec du ReactJS ainsi que du TypeScript et au backend avec la mise en place du headless CMS Strapi."
        position={[-9.4, -0.36, 9.6]}
      />
      <group position={[-5, 0.5, 5]} rotation={[0, -Math.PI / 4, 0]}>
        <Podium />
      </group>
    </group>
  )
}

export default Project
