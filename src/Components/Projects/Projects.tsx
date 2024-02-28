import { useFBX } from "@react-three/drei"
import { useLayoutEffect, useRef } from "react"
import * as THREE from "three"

import Wino from "./Wino"
import SmartGarant from "./SmartGarant"
import RubiksCube from "./RubiksCube"
import { useFrame } from "@react-three/fiber"
import { useProject } from "../../Utils/useProject"
import { animated, useSpring } from "@react-spring/three"

const Podium = () => {
  return (
    <>
      <mesh position={[-3, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[3, 2.5, 3]} />
        <meshPhongMaterial color="#ffcffd" />
      </mesh>
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[3, 3, 3]} />
        <meshPhongMaterial color="#ffcffd" />
      </mesh>
      <mesh position={[3, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[3, 2, 3]} />
        <meshPhongMaterial color="#ffcffd" />
      </mesh>
    </>
  )
}

const Project = () => {
  const fbx = useFBX("./3dmodels/projects_panel.fbx")
  const objectRef = useRef<THREE.Mesh | null>(null)
  const { projects } = useProject()

  const amplitude = 0.5
  const speed = 3

  const animation = useSpring({
    position: projects !== "none" ? [-5, 10, 4.6] : [-5, 0, 4.6],
    rotation:
      projects !== "none" ? [0, (15 * Math.PI) / 4, 0] : [0, -Math.PI / 4, 0],
    config: {
      tension: 100,
      friction: 20,
    },
  })

  useFrame((state) => {
    if (objectRef.current) {
      objectRef.current.position.y =
        amplitude * Math.sin(speed * state.clock.elapsedTime) + 6
    }
  })

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
      <animated.group
        position={animation.position.to((x, y, z) => [x, y, z])}
        rotation={animation.rotation as unknown as THREE.Euler}
      >
        <primitive object={fbx} scale={0.0013} ref={objectRef} />
      </animated.group>
      <Wino
        descriptionFr="Développeur en alternance sur le site vitrine et l'application back-office pour Wino, une startup de caisse enregistreuse connectée. J'étais spécialisé dans le développement de l'interface en ReScript."
        descriptionEn="Developer in apprenticeship on the showcase website and the back-office application for Wino, a connected cash register startup. I was specialized in the development of the interface in ReScript."
        position={[-4.3, 4.2, 5.2]}
      />
      <SmartGarant
        descriptionEn="I collaborated on and supervised the creation of an entire website, contributing to the frontend with ReactJS and TypeScript and to the backend with the implementation of the headless CMS Strapi."
        descriptionFr="J'ai collaboré et supervisé la création d'un site web complet, en contribuant au frontend avec du ReactJS ainsi que du TypeScript et au backend avec la mise en place du headless CMS Strapi."
        position={[-9.4, -0.36, 9.6]}
      />
      <RubiksCube position={[-8.6, 2.05, 2]} />
      <group position={[-5, 0.5, 5]} rotation={[0, -Math.PI / 4, 0]}>
        <Podium />
      </group>
    </group>
  )
}

export default Project
