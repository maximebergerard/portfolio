import { useLayoutEffect, useRef, useState } from "react"
import * as THREE from "three"

import { Box, RoundedBox, Text, useFBX } from "@react-three/drei"
import { ThreeEvent, useFrame, useThree } from "@react-three/fiber"
import { useSpring, animated } from "@react-spring/three"

const TextModal = ({
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
      position={[-4, 8, 10.3]}
      scale={animation.scale}
    >
      <RoundedBox
        args={[10, 9, 1]}
        position={[0, 0, -0.6]}
        radius={0.1}
        castShadow
      >
        <meshStandardMaterial color="#a6f7a0" />
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
        font={"./fonts/Quicksand-Regular.ttf"}
        onClick={() => window.open("https://smart-garant.com", "_blank")}
      >
        <meshBasicMaterial color="#0c0cff" />
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

  const { camera, scene } = useThree()
  const [isVisible, setIsVisible] = useState(false)
  const ref1 = useRef<THREE.Mesh | null>(null)
  const ref2 = useRef<THREE.Mesh | null>(null)
  const ref3 = useRef<THREE.Mesh | null>(null)
  const ref4 = useRef<THREE.Mesh | null>(null)
  const ref5 = useRef<THREE.Mesh | null>(null)
  const ref6 = useRef<THREE.Mesh | null>(null)

  if (ref1.current) {
    ref1.current.name = "Smartgarant"
  }
  if (ref2.current) {
    ref2.current.name = "Smartgarant"
  }
  if (ref3.current) {
    ref3.current.name = "Smartgarant"
  }
  if (ref4.current) {
    ref4.current.name = "Smartgarant"
  }
  if (ref5.current) {
    ref5.current.name = "Smartgarant"
  }
  if (ref6.current) {
    ref6.current.name = "Smartgarant"
  }

  useLayoutEffect(
    () =>
      logoSmartgarant.traverse(
        (o) =>
          o instanceof THREE.Mesh && (o.castShadow = o.receiveShadow = true),
      ),
    [logoSmartgarant],
  )

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()

    // Calculate the mouse position in normalized device coordinates
    // (-1 to +1) for both components
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

    // Set the origin and direction of the ray based on the mouse position
    raycaster.setFromCamera(mouse, camera)

    // Check if the ray intersects with the mannequin mesh
    const intersects = raycaster.intersectObjects(scene.children, true)

    if (intersects.length > 0 && intersects[0].object.name === "Smartgarant") {
      setIsVisible(true)
    }
  }

  return (
    <>
      <TextModal
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
            args={[3, 1, 1]}
            position={[0.4, 0.3, -2.8]}
            rotation={[0, Math.PI / 2, 0]}
            visible={false}
            scale={1.1}
            ref={ref1}
          />
          <Box
            args={[3, 1, 1]}
            position={[1.5, 0.3, -4.8]}
            rotation={[0, Math.PI / 5, 0]}
            visible={false}
            scale={1.1}
            ref={ref2}
          />
          <Box
            args={[3, 1, 1]}
            position={[3.8, 0.3, -4.8]}
            rotation={[0, -Math.PI / 5, 0]}
            visible={false}
            scale={1.1}
            ref={ref3}
          />
          <Box
            args={[3, 1, 1]}
            position={[5, 0.3, -2.8]}
            rotation={[0, Math.PI / 2, 0]}
            visible={false}
            scale={1.1}
            ref={ref4}
          />
          <Box
            args={[2, 1, 0.8]}
            position={[4, 0.3, -3.1]}
            rotation={[0, Math.PI / 3, 0]}
            visible={false}
            scale={1.1}
            ref={ref5}
          />
          <Box
            args={[5, 1, 1]}
            position={[2.7, 0.3, -0.7]}
            visible={false}
            scale={1.1}
            ref={ref6}
          />
        </group>
        <primitive object={logoSmartgarant} scale={0.015} />
      </group>
    </>
  )
}

export default SmartGarant
