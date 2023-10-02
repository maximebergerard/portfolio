import { useEffect, useRef, useState } from "react"
import * as THREE from "three"

import { Box, Text, useFBX } from "@react-three/drei"
import { useFrame, useThree } from "@react-three/fiber"

function TypingText() {
  const text = "Hello, world!"
  const [visibleText, setVisibleText] = useState("")
  const textRef = useRef<THREE.Mesh>(null!)
  const cursorRef = useRef<any>(null!)
  const typingSpeed = 50 // Characters per second

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

  // Make the cursor blink
  useFrame(() => {
    if (cursorRef.current) {
      cursorRef.current.visible = !cursorRef.current.visible
    }
  })

  return (
    <>
      <Text ref={textRef}>
        <meshBasicMaterial color="black" side={THREE.DoubleSide} />
        {visibleText}
      </Text>
    </>
  )
}

interface Props {
  text: string
}
const Wino = ({ text }: Props) => {
  const logoWino = useFBX("./3dmodels/Logo/winoLogo.fbx")
  const [hovered, setHovered] = useState(false)

  const ref = useRef<THREE.Mesh>(null!)

  if (ref.current) {
    ref.current.name = "wino"
  }

  const raycaster = new THREE.Raycaster()

  const { camera, scene } = useThree()

  useFrame((state) => {
    raycaster.setFromCamera(state.mouse, camera)
    const intersects = raycaster.intersectObjects([scene])
    if (intersects.length > 0 && intersects[0].object.name === "wino") {
      setHovered(true)
    } else setHovered(false)
  })

  return (
    <>
      {hovered && <TypingText />}
      <group
        position={[-4.3, 4.2, 5.2]}
        rotation={[0, Math.PI / 12, Math.PI / 5]}
      >
        <Box
          args={[7.1, 2, 2]}
          position={[-3.9, 0, -1]}
          ref={ref}
          // onPointerOver={() => setHovered(true)}
          // onPointerLeave={() => setTimeout(() => setHovered(false), 1000)}
          // visible={false}
        >
          <meshStandardMaterial color="blue" />
        </Box>
        <primitive object={logoWino} scale={0.02} />
      </group>
    </>
  )
}

export default Wino
