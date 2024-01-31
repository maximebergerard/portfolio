import { useSpring, animated } from "@react-spring/three"
import { useFBX, Box } from "@react-three/drei"
import { useLanguage } from "../Utils/useLanguage"
import { useLayoutEffect } from "react"
import * as THREE from "three"

const LanguageButton = () => {
  const { language, toggleLanguage } = useLanguage()
  const frenchFlag = useFBX("./3dmodels/Flags/french.fbx")
  const englishFlag = useFBX("./3dmodels/Flags/english.fbx")

  const animation = useSpring({
    position: language === "fr" ? [12.45, 0.6, 15] : [9.95, 0.6, 15],
    config: {
      mass: 1,
      tension: 60,
      friction: 20,
    },
  })

  useLayoutEffect(
    () =>
      frenchFlag.traverse(
        (o) =>
          o instanceof THREE.Mesh && (o.castShadow = o.receiveShadow = true),
      ),
    [frenchFlag],
  )

  useLayoutEffect(
    () =>
      englishFlag.traverse(
        (o) =>
          o instanceof THREE.Mesh && (o.castShadow = o.receiveShadow = true),
      ),
    [englishFlag],
  )

  return (
    <>
      <animated.group position={animation.position.to((x, y, z) => [x, y, z])}>
        <Box args={[2, 1.2, 0.5]}>
          <meshStandardMaterial color="green" opacity={0.3} transparent />
        </Box>
      </animated.group>
      <primitive
        object={frenchFlag}
        position={[12.5, 0.6, 15]}
        scale={0.04}
        rotation={[0, -Math.PI / 2, 0]}
        onClick={() => toggleLanguage("fr")}
        onPointerOver={() => (document.body.style.cursor = "pointer")}
        onPointerOut={() => (document.body.style.cursor = "grab")}
      />
      <primitive
        object={englishFlag}
        position={[10, 0.6, 15]}
        scale={0.04}
        rotation={[0, -Math.PI / 2, 0]}
        onClick={() => toggleLanguage("en")}
        onPointerOver={() => (document.body.style.cursor = "pointer")}
        onPointerOut={() => (document.body.style.cursor = "grab")}
      />
    </>
  )
}

export default LanguageButton
