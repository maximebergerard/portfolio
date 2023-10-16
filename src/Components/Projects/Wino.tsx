import { useLayoutEffect, useRef, useState } from "react"
import * as THREE from "three"

import { Box, RoundedBox, Text, useFBX } from "@react-three/drei"
import { useFrame, useThree } from "@react-three/fiber"
import { useSpring, animated } from "@react-spring/three"

const TypingText = ({
  isVisible,
  setIsVisible,
  text,
}: {
  isVisible: boolean
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
  text: string
}) => {
  const title = "WINO"
  const date = "2021-2022"
  const textRef = useRef<THREE.Mesh>(null!)
  const groupRef = useRef<THREE.Group>(null!)
  const { camera } = useThree()

  // Define the animation spring
  const animation = useSpring({
    scale: isVisible ? 1 : 0,
    config: {
      tension: 200,
      friction: 20,
    },
  })

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.lookAt(camera.position)
    }
  })

  return (
    <animated.group ref={groupRef} position={[0, 8, 0]} scale={animation.scale}>
      <RoundedBox
        args={[10, 9, 1]}
        position={[0, 0, -0.6]}
        radius={0.1}
        castShadow
      >
        <meshStandardMaterial color="#fffdcc" />
      </RoundedBox>
      <Text
        fontSize={1}
        position={[-3, 3.5, 0]}
        font={"./fonts/Quicksand-Bold.ttf"}
      >
        <meshBasicMaterial color="black" />
        {title}
      </Text>
      <Text
        fontSize={0.6}
        position={[-3, 2.5, 0]}
        font={"./fonts/Quicksand-Regular.ttf"}
      >
        <meshBasicMaterial color="#545454" />
        {date}
      </Text>
      <Text
        ref={textRef}
        font={"./fonts/Quicksand-Regular.ttf"}
        maxWidth={8.5}
        fontSize={0.6}
        anchorX={"center"}
        anchorY={"top"}
        position={[0, 1.95, 0]}
      >
        <meshBasicMaterial color="black" />
        {text}
      </Text>
      <Text
        position={[4, -3.8, 0]}
        fontSize={0.4}
        onClick={() => window.open("https://wino.fr", "_blank")}
      >
        <meshBasicMaterial color="#371ac9" />
        wino.fr
      </Text>
      <group
        position={[4, 3.5, 0]}
        rotation={[0, 0, Math.PI / 4]}
        onClick={() => setIsVisible(false)}
      >
        <RoundedBox args={[0.8, 0.2, 0.2]} radius={0.05}>
          <meshStandardMaterial color="#f25050" />
        </RoundedBox>
        <RoundedBox
          args={[0.8, 0.2, 0.2]}
          radius={0.05}
          rotation={[0, 0, Math.PI / 2]}
        >
          <meshStandardMaterial color="#f25050" />
        </RoundedBox>
      </group>
    </animated.group>
  )
}

interface Props {
  description: string
  position: [number, number, number]
}
const Wino = ({ description, position }: Props) => {
  const logoWino = useFBX("./3dmodels/Logo/winoLogo.fbx")

  const [isVisible, setIsVisible] = useState(false)

  useLayoutEffect(
    () =>
      logoWino.traverse(
        (o) =>
          o instanceof THREE.Mesh && (o.castShadow = o.receiveShadow = true),
      ),
    [logoWino],
  )

  return (
    <>
      <TypingText
        setIsVisible={setIsVisible}
        isVisible={isVisible}
        text={description}
      />
      <group position={position} rotation={[0, Math.PI / 12, Math.PI / 5]}>
        <Box
          args={[7.1, 2, 2]}
          position={[-3.9, 0, -1]}
          visible={false}
          scale={1.1}
          onClick={() => setIsVisible(true)}
        >
          <meshStandardMaterial color="blue" />
        </Box>
        <primitive object={logoWino} scale={0.02} />
      </group>
    </>
  )
}

export default Wino
