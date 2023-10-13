import { useEffect, useLayoutEffect, useRef, useState } from "react"
import * as THREE from "three"

import { Box, Plane, RoundedBox, Text, useFBX } from "@react-three/drei"
import { useFrame, useThree } from "@react-three/fiber"

const TypingText = ({ isVisible }: { isVisible: boolean }) => {
  const text =
    "Développeur en atlernance sur l'application back-office pour Wino, une startup de caisse enregistreuse connectée. J'étais spécialisé dans le développement de l'interface en ReScript."
  const [visibleText, setVisibleText] = useState("")
  const textRef = useRef<THREE.Mesh>(null!)
  const groupRef = useRef<THREE.Group>(null!)
  const scaleRef = useRef([0, 0, 0])

  const typingSpeed = 40 // Characters per second
  const targetScale = [1, 1, 1]
  const scaleSpeed = 0.02 // Vitesse de l'animation de transition

  // Function to simulate typing effect
  const typeText = () => {
    let currentIndex = 0

    const typingInterval = setInterval(() => {
      if (currentIndex <= text.length) {
        setVisibleText(text.slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(typingInterval)
      }
    }, 1000 / typingSpeed)
  }

  // Call the typing function when the component mounts
  useEffect(() => {
    typeText()
  }, [])

  const { camera } = useThree()
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.lookAt(camera.position)
    }
  })

  return (
    <group ref={groupRef} position={[0, 8, 0]}>
      <RoundedBox
        args={[10, 8, 1]}
        position={[0, 0, -0.6]}
        radius={0.1}
        castShadow
      >
        <meshStandardMaterial color="#f5f5f5" side={THREE.DoubleSide} />
      </RoundedBox>
      <Text
        ref={textRef}
        font={"./fonts/Quicksand-Regular.ttf"}
        maxWidth={8}
        fontSize={0.6}
        anchorX={"center"}
      >
        <meshBasicMaterial color="black" side={THREE.DoubleSide} />
        {visibleText}
      </Text>
      <group>
        <RoundedBox></RoundedBox>
      </group>
    </group>
  )
}

interface Props {
  text: string
  position: [number, number, number]
}
const Wino = ({ text, position }: Props) => {
  const logoWino = useFBX("./3dmodels/Logo/winoLogo.fbx")
  const raycaster = new THREE.Raycaster()
  const ref = useRef<THREE.Mesh>(null!)

  const { camera, scene } = useThree()
  const [isVisible, setIsVisible] = useState(true)

  if (ref.current) {
    ref.current.name = "wino"
  }

  useLayoutEffect(
    () =>
      logoWino.traverse(
        (o) =>
          o instanceof THREE.Mesh && (o.castShadow = o.receiveShadow = true),
      ),
    [logoWino],
  )

  useFrame((state) => {
    raycaster.setFromCamera(state.mouse, camera)
    const intersects = raycaster.intersectObjects([scene])
    if (intersects.length > 0 && intersects[0].object.name === "wino") {
      setIsVisible(true)
    }
  })

  return (
    <>
      {isVisible && <TypingText isVisible={isVisible} />}
      <group position={position} rotation={[0, Math.PI / 12, Math.PI / 5]}>
        <Box
          args={[7.1, 2, 2]}
          position={[-3.9, 0, -1]}
          ref={ref}
          visible={false}
          scale={1.1}
        >
          <meshStandardMaterial color="blue" />
        </Box>
        <primitive object={logoWino} scale={0.02} />
      </group>
    </>
  )
}

export default Wino
