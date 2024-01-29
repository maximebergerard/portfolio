import { useLayoutEffect, useRef, useState } from "react"
import * as THREE from "three"

import { Box, RoundedBox, Text, useFBX } from "@react-three/drei"
import { Euler, ThreeEvent, useFrame, useThree } from "@react-three/fiber"
import { useSpring, animated } from "@react-spring/three"
import { useLanguage } from "../useLanguage"

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

  const typescriptLogo = useFBX("./3dmodels/Logo/typescriptLogo.fbx")
  const reactLogo2 = useFBX("./3dmodels/Logo/reactLogo2.fbx")
  const strapiLogo = useFBX("./3dmodels/Logo/strapiLogo.fbx")
  const groupRef = useRef<THREE.Group>(null)
  const [flipped, setFlipped] = useState(false)
  const { camera } = useThree()

  // Define the animation spring
  const animation = useSpring({
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
      position={[-5, 9, 10.3]}
      scale={animation.scale}
    >
      <animated.group rotation={flippedAnimation.rotation as unknown as Euler}>
        <RoundedBox
          args={[10.5, 10, 1]}
          position={[0, 0, -0.6]}
          radius={0.1}
          castShadow
        >
          <meshStandardMaterial color="#8affe0" />
        </RoundedBox>
        <Text
          fontSize={1}
          position={[-0.8, 3.9, 0]}
          font={"./fonts/Montserrat-Bold.ttf"}
          color={"#242323"}
        >
          {title}
        </Text>
        <Text
          fontSize={0.5}
          position={[-4.2, 3, 0]}
          font={"./fonts/Montserrat-SemiBold.ttf"}
        >
          <meshBasicMaterial color="#4a4a4a" />
          {date}
        </Text>
        <Text
          font={"./fonts/Montserrat-Regular.ttf"}
          maxWidth={9}
          fontSize={0.6}
          anchorX={"center"}
          anchorY={"top"}
          position={[-0.1, 2.4, 0]}
        >
          <meshBasicMaterial color="black" />
          {text}
        </Text>
        <Text
          position={[3, -4.2, 0]}
          fontSize={0.4}
          font={"./fonts/Montserrat-Regular.ttf"}
          onClick={() => window.open("https://smart-garant.com", "_blank")}
          onPointerOver={() => (document.body.style.cursor = "pointer")}
          onPointerOut={() => (document.body.style.cursor = "grab")}
        >
          <meshBasicMaterial color="#0c0cff" />
          smart-garant.com
        </Text>
        {/** Technos */}
        <Text
          fontSize={1}
          position={[2.5, 4, -1.11]}
          font={"./fonts/Montserrat-Bold.ttf"}
          rotation-y={Math.PI}
        >
          <meshBasicMaterial color="black" />
          {"Technos"}
        </Text>
        <primitive
          object={typescriptLogo}
          scale={0.01}
          rotation={[Math.PI / 2, 0, Math.PI]}
          position={[3.3, 1.5, -1.1]}
        />
        <Text
          fontSize={0.6}
          position={[2.6, 1, -1.11]}
          font={"./fonts/Montserrat-Bold.ttf"}
          rotation-y={Math.PI}
        >
          <meshBasicMaterial color="#000312" />
          {"TypeScript"}
        </Text>
        <primitive
          object={reactLogo2}
          scale={0.015}
          rotation={[Math.PI / 2, 0, 0]}
          position={[-2, 1.1, -1.3]}
        />
        <Text
          fontSize={0.6}
          position={[-0.8, 1, -1.11]}
          font={"./fonts/Montserrat-Bold.ttf"}
          rotation-y={Math.PI}
        >
          <meshBasicMaterial color="#000312" />
          {"ReactJS"}
        </Text>
        <primitive
          object={strapiLogo}
          scale={0.015}
          rotation={[Math.PI / 2, 0, Math.PI]}
          position={[3.3, -2, -1.1]}
        />
        <Text
          fontSize={0.6}
          position={[2.5, -2.5, -1.11]}
          font={"./fonts/Montserrat-Bold.ttf"}
          rotation-y={Math.PI}
        >
          <meshBasicMaterial color="#000312" />
          {"Strapi"}
        </Text>
        {/** Close hitbox button front */}
        <Box
          args={[1, 1, 1]}
          position={[4.3, 4, 0]}
          visible={false}
          onClick={() => setIsVisible(false)}
          onPointerOver={() => (document.body.style.cursor = "pointer")}
          onPointerOut={() => (document.body.style.cursor = "grab")}
        />
        <group position={[4.3, 4, 0]} rotation={[0, 0, Math.PI / 4]}>
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
          position={[-4.3, 4, -1.2]}
          visible={false}
          onClick={() => {
            setIsVisible(false)
            setFlipped(false)
          }}
          onPointerOver={() => (document.body.style.cursor = "pointer")}
          onPointerOut={() => (document.body.style.cursor = "grab")}
        />
        <group position={[-4.3, 4, -1.2]} rotation={[0, 0, Math.PI / 4]}>
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
          position={[4.3, 3, 0]}
          visible={false}
          onClick={() => {
            setFlipped(!flipped)
          }}
        />
        <group
          position={[4.3, 3, 0]}
          onPointerOver={() => (document.body.style.cursor = "pointer")}
          onPointerOut={() => (document.body.style.cursor = "grab")}
        >
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
          position={[-4.3, 3, -1.2]}
          visible={false}
          onClick={() => {
            setFlipped(!flipped)
          }}
          onPointerOver={() => (document.body.style.cursor = "pointer")}
          onPointerOut={() => (document.body.style.cursor = "grab")}
        />
        <group position={[-4.3, 3, -1.2]}>
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
  descriptionEn: string
  descriptionFr: string
  position: [number, number, number]
}
const SmartGarant = ({ descriptionEn, descriptionFr, position }: Props) => {
  const logoSmartgarant = useFBX("./3dmodels/Logo/smartgarantLogo.fbx")
  const { language } = useLanguage()

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
        text={language === "en" ? descriptionEn : descriptionFr}
      />
      <group
        position={position}
        rotation={[Math.PI / 5.2, Math.PI / -8, Math.PI / 10]}
        onPointerOver={() => (document.body.style.cursor = "pointer")}
        onPointerOut={() => (document.body.style.cursor = "grab")}
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
