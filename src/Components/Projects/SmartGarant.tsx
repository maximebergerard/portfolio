import { useLayoutEffect, useRef, useState, useCallback } from "react"
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
  const title = "SMARTGARANT"
  const date = "2021"

  const textRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)
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
    <animated.group
      ref={groupRef}
      position={[-1, 8, 10]}
      scale={animation.scale}
    >
      <RoundedBox
        args={[10, 9, 1]}
        position={[0, 0, -0.6]}
        radius={0.1}
        castShadow
      >
        <meshStandardMaterial color="#cfffcc" />
      </RoundedBox>
      <Text
        fontSize={1}
        position={[-0.8, 3.5, 0]}
        font={"./fonts/Quicksand-Bold.ttf"}
      >
        <meshBasicMaterial color="black" />
        {title}
      </Text>
      <Text
        fontSize={0.6}
        position={[-3.8, 2.5, 0]}
        font={"./fonts/Quicksand-Regular.ttf"}
      >
        <meshBasicMaterial color="#545454" />
        {date}
      </Text>
      <Text
        ref={textRef}
        font={"./fonts/Quicksand-Regular.ttf"}
        maxWidth={8}
        fontSize={0.6}
        anchorX={"center"}
        anchorY={"top"}
        position={[-0.4, 2, 0]}
      >
        <meshBasicMaterial color="black" />
        {text}
      </Text>
      <Text
        position={[3, -3.8, 0]}
        fontSize={0.4}
        onClick={() => window.open("https://smart-garant.com", "_blank")}
      >
        <meshBasicMaterial color="#371ac9" />
        smart-garant.com
      </Text>
      <Box
        args={[1, 1, 1]}
        position={[4, 3.5, 0]}
        visible={false}
        onClick={() => setIsVisible(false)}
      />

      <group position={[4, 3.5, 0]} rotation={[0, 0, Math.PI / 4]}>
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
const SmartGarant = ({ description, position }: Props) => {
  const logoSmartgarant = useFBX("./3dmodels/Logo/smartgarantLogo.fbx")
  const [isVisible, setIsVisible] = useState(false)

  useLayoutEffect(
    () =>
      logoSmartgarant.traverse(
        (o) =>
          o instanceof THREE.Mesh && (o.castShadow = o.receiveShadow = true),
      ),
    [logoSmartgarant],
  )

  const handleClick = useCallback(() => {
    setIsVisible(true)
  }, [])

  return (
    <>
      {/* <TypingText setIsVisible={setIsVisible} text={description} /> */}
      {/* {isVisible && ( */}
      <TypingText
        setIsVisible={setIsVisible}
        isVisible={isVisible}
        text={description}
      />
      {/* )} */}

      <group
        position={position}
        rotation={[Math.PI / 5.2, Math.PI / -8, Math.PI / 10]}
      >
        <group onClick={handleClick}>
          <Box
            args={[5, 1, 1]}
            position={[2.7, 0.3, -0.7]}
            visible={false}
            scale={1.1}
          />
          <Box
            args={[3, 1, 1]}
            position={[0.4, 0.3, -2.8]}
            rotation={[0, Math.PI / 2, 0]}
            visible={false}
            scale={1.1}
          />
          <Box
            args={[3, 1, 1]}
            position={[1.5, 0.3, -4.8]}
            rotation={[0, Math.PI / 5, 0]}
            visible={false}
            scale={1.1}
          />
          <Box
            args={[3, 1, 1]}
            position={[3.8, 0.3, -4.8]}
            rotation={[0, -Math.PI / 5, 0]}
            visible={false}
            scale={1.1}
          />
          <Box
            args={[3, 1, 1]}
            position={[5, 0.3, -2.8]}
            rotation={[0, Math.PI / 2, 0]}
            visible={false}
            scale={1.1}
          />
          <Box
            args={[2, 1, 0.8]}
            position={[4, 0.3, -3.1]}
            rotation={[0, Math.PI / 3, 0]}
            visible={false}
            scale={1.1}
          />
        </group>
        <primitive object={logoSmartgarant} scale={0.015} />
      </group>
    </>
  )
}

export default SmartGarant
