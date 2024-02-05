import { useSpring, animated } from "@react-spring/three"
import { useFBX, Box } from "@react-three/drei"
import { useLanguage } from "../Utils/useLanguage"
import { useLayoutEffect, useState } from "react"
import * as THREE from "three"
import { useFrame } from "@react-three/fiber"

const LanguageButton = () => {
  const { language, toggleLanguage } = useLanguage()
  const frenchFlag = useFBX("./3dmodels/Flags/french.fbx")
  const englishFlag = useFBX("./3dmodels/Flags/english.fbx")
  const [frenchHovered, setFrenchHover] = useState(false)
  const [englishHovered, setEnglishHover] = useState(false)

  const animation = useSpring({
    position: language === "fr" ? [12.45, 0.6, 15] : [9.95, 0.6, 15],
    config: {
      mass: 1,
      tension: 60,
      friction: 20,
    },
  })

  useLayoutEffect(() => {
    frenchFlag.traverse((o) => {
      if (o instanceof THREE.Mesh) {
        o.castShadow = o.receiveShadow = true
        o.material.forEach((m: { emissiveIntensity: number }) => {
          m.emissiveIntensity = 0
        })
      }
    }),
      englishFlag.traverse((o) => {
        if (o instanceof THREE.Mesh) {
          o.castShadow = o.receiveShadow = true
          o.material.forEach((m: { emissiveIntensity: number }) => {
            m.emissiveIntensity = 0
          })
        }
      }),
      [frenchFlag, englishFlag]
  })

  useFrame(() => {
    const glowIntensity = 0.06
    const glowColor = "#ffffff"

    frenchFlag.traverse((o) => {
      if (o instanceof THREE.Mesh) {
        o.material.forEach(
          (m: { emissive: THREE.Color; emissiveIntensity: number }) => {
            m.emissive = new THREE.Color(glowColor)

            if (frenchHovered && m.emissiveIntensity < glowIntensity) {
              m.emissiveIntensity += 0.01
            } else if (!frenchHovered && m.emissiveIntensity > 0) {
              m.emissiveIntensity -= 0.01
            }
          },
        )
      }
    })

    englishFlag.traverse((o) => {
      if (o instanceof THREE.Mesh) {
        o.material.forEach(
          (m: { emissive: THREE.Color; emissiveIntensity: number }) => {
            m.emissive = new THREE.Color(glowColor)

            if (englishHovered && m.emissiveIntensity < glowIntensity) {
              m.emissiveIntensity += 0.01
            } else if (!englishHovered && m.emissiveIntensity > 0) {
              m.emissiveIntensity -= 0.01
            }
          },
        )
      }
    })
  })

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
        onPointerOver={() => {
          document.body.style.cursor = "pointer"
          setFrenchHover(true)
        }}
        onPointerOut={() => {
          document.body.style.cursor = "grab"
          setFrenchHover(false)
        }}
      />
      <primitive
        object={englishFlag}
        position={[10, 0.6, 15]}
        scale={0.04}
        rotation={[0, -Math.PI / 2, 0]}
        onClick={() => toggleLanguage("en")}
        onPointerOver={() => {
          document.body.style.cursor = "pointer"
          setEnglishHover(true)
        }}
        onPointerOut={() => {
          document.body.style.cursor = "grab"
          setEnglishHover(false)
        }}
      />
    </>
  )
}

export default LanguageButton
