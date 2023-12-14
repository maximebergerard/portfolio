/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useLayoutEffect, useRef, useState } from "react"
import * as THREE from "three"

import { Box, RoundedBox, Text, useFBX } from "@react-three/drei"
import { Euler, ThreeEvent, useFrame, useThree } from "@react-three/fiber"
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
  const title = "WINO"
  const date = "2021-2022"

  const reactLogo1 = useFBX("./3dmodels/Logo/reactLogo1.fbx")
  const rescriptLogo = useFBX("./3dmodels/Logo/rescriptLogo.fbx")
  const groupRef = useRef<THREE.Group>(null)
  const [flipped, setFlipped] = useState(false)
  const { camera } = useThree()

  // Define the closeAnimation spring
  const closeAnimation = useSpring({
    scale: isVisible ? 1 : 0,
    config: {
      tension: 200,
      friction: 20,
    },
  })

  const flippedAnimation = useSpring({
    rotation: flipped ? ([0, Math.PI, 0] as Euler) : ([0, 0, 0] as Euler),
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
      position={[-1.8, 8, 0]}
      scale={closeAnimation.scale}
    >
      <animated.group rotation={flippedAnimation.rotation as unknown as Euler}>
        <RoundedBox
          args={[10, 9, 1]}
          position={[0, 0, -0.6]}
          radius={0.1}
          castShadow
        >
          <meshStandardMaterial color="#fffaa0" />
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
          font={"./fonts/Quicksand-Regular.ttf"}
          onClick={() => window.open("https://wino.fr", "_blank")}
        >
          <meshBasicMaterial color="#0c0cff" />
          wino.fr
        </Text>
        {/** Technos */}
        <Text
          fontSize={1}
          position={[2.5, 3.5, -1.11]}
          font={"./fonts/Quicksand-Bold.ttf"}
          rotation-y={Math.PI}
        >
          <meshBasicMaterial color="black" />
          {"Technos"}
        </Text>
        <primitive
          object={rescriptLogo}
          scale={0.02}
          rotation={[Math.PI / 2, 0, 0]}
          position={[2, 1, -1.3]}
        />
        <Text
          fontSize={0.6}
          position={[2.65, 0.5, -1.11]}
          font={"./fonts/Quicksand-Bold.ttf"}
          rotation-y={Math.PI}
        >
          <meshBasicMaterial color="#545454" />
          {"Rescript"}
        </Text>
        <primitive
          object={reactLogo1}
          scale={0.015}
          rotation={[Math.PI / 2, 0, 0]}
          position={[-2, 0.6, -1.3]}
        />
        <Text
          fontSize={0.6}
          position={[-0.8, 0.5, -1.11]}
          font={"./fonts/Quicksand-Bold.ttf"}
          rotation-y={Math.PI}
        >
          <meshBasicMaterial color="#545454" />
          {"ReactJS"}
        </Text>
        {/** Close hitbox button front */}
        <Box
          args={[1, 1, 1]}
          position={[4, 3.5, 0]}
          visible={false}
          onClick={() => {
            setIsVisible(false)
            setFlipped(false)
          }}
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
        {/** Close hitbox button back */}
        <Box
          args={[1, 1, 1]}
          position={[-4, 3.5, -1.2]}
          visible={false}
          onClick={() => {
            setIsVisible(false)
            setFlipped(false)
          }}
        />
        <group position={[-4, 3.5, -1.2]} rotation={[0, 0, Math.PI / 4]}>
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
        {/** Flip hitbox button front */}
        <Box
          args={[1, 1, 1]}
          position={[4, 2.5, 0]}
          visible={false}
          onClick={() => {
            setFlipped(!flipped)
          }}
        />
        <group position={[4, 2.5, 0]}>
          <RoundedBox args={[0.8, 0.2, 0.2]} radius={0.05}>
            <meshStandardMaterial color="#6365b7" />
          </RoundedBox>
          <RoundedBox
            args={[0.5, 0.2, 0.2]}
            radius={0.05}
            rotation={[0, 0, Math.PI / 4]}
            position={[0.17, -0.17, 0]}
          >
            <meshStandardMaterial color="#6365b7" />
          </RoundedBox>
          <RoundedBox
            args={[0.5, 0.2, 0.2]}
            radius={0.05}
            rotation={[0, 0, -Math.PI / 4]}
            position={[0.17, 0.17, 0]}
          >
            <meshStandardMaterial color="#6365b7" />
          </RoundedBox>
        </group>
        {/** Flip hitbox button back */}
        <Box
          args={[1, 1, 1]}
          position={[-4, 2.5, -1.2]}
          visible={false}
          onClick={() => {
            setFlipped(!flipped)
          }}
        />
        <group position={[-4, 2.5, -1.2]}>
          <RoundedBox args={[0.8, 0.2, 0.2]} radius={0.05}>
            <meshStandardMaterial color="#6365b7" />
          </RoundedBox>
          <RoundedBox
            args={[0.5, 0.2, 0.2]}
            radius={0.05}
            rotation={[0, 0, Math.PI / 4]}
            position={[0.17, -0.17, 0]}
          >
            <meshStandardMaterial color="#6365b7" />
          </RoundedBox>
          <RoundedBox
            args={[0.5, 0.2, 0.2]}
            radius={0.05}
            rotation={[0, 0, -Math.PI / 4]}
            position={[0.17, 0.17, 0]}
          >
            <meshStandardMaterial color="#6365b7" />
          </RoundedBox>
        </group>
      </animated.group>
    </animated.group>
  )
}

interface Props {
  description: string
  position: [number, number, number]
}
const Wino = ({ description, position }: Props) => {
  const logoWino = useFBX("./3dmodels/Logo/winoLogo.fbx")
  const ref = useRef<THREE.Mesh | null>(null)

  const { camera, scene } = useThree()
  const [isVisible, setIsVisible] = useState(false)

  if (ref.current) {
    ref.current.name = "Wino"
  }

  useLayoutEffect(
    () =>
      logoWino.traverse(
        (o) =>
          o instanceof THREE.Mesh && (o.castShadow = o.receiveShadow = true),
      ),
    [logoWino],
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

    if (intersects.length > 0 && intersects[0].object.name === "Wino") {
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
      <group position={position} rotation={[0, Math.PI / 12, Math.PI / 5]}>
        <Box
          args={[7.1, 2, 2]}
          position={[-3.9, 0, -1]}
          visible={false}
          scale={1.1}
          onClick={handleClick}
          ref={ref}
        >
          <meshStandardMaterial color="blue" />
        </Box>
        <primitive object={logoWino} scale={0.02} />
      </group>
    </>
  )
}

export default Wino
