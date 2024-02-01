/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import * as THREE from "three"

import { Box, RoundedBox, Text, useFBX } from "@react-three/drei"
import { Euler, ThreeEvent, useFrame, useThree } from "@react-three/fiber"
import { useSpring, animated } from "@react-spring/three"
import { useLanguage } from "../../Utils/useLanguage"
import { useProject } from "../../Utils/useProject"

// TODO : Rewrite this component with the new TextModal component
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

  const { camera } = useThree()
  const reactLogo1 = useFBX("./3dmodels/Logo/reactLogo1.fbx")
  const rescriptLogo = useFBX("./3dmodels/Logo/rescriptLogo.fbx")
  const groupRef = useRef<THREE.Group>(null)
  const [flipped, setFlipped] = useState(false)
  const { toggleProjects } = useProject()

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
      position={[-5, 9.4, 5]}
      scale={closeAnimation.scale}
    >
      <animated.group rotation={flippedAnimation.rotation as unknown as Euler}>
        <RoundedBox
          args={[10, 9, 1]}
          position={[0, 0, -0.6]}
          radius={0.1}
          castShadow
        >
          <meshStandardMaterial color="#d7a6ff" />
        </RoundedBox>
        <Text
          fontSize={1}
          position={[-3, 3.5, 0]}
          font={"./fonts/Montserrat-Bold.ttf"}
          color={"#242323"}
        >
          {title}
        </Text>
        <Text
          fontSize={0.5}
          position={[-3.2, 2.7, 0]}
          font={"./fonts/Montserrat-SemiBold.ttf"}
          color="#4a4a4a"
        >
          {date}
        </Text>
        <Text
          font={"./fonts/Montserrat-Regular.ttf"}
          maxWidth={8.7}
          fontSize={0.6}
          anchorX={"center"}
          anchorY={"top"}
          position={[0, 2.1, 0]}
          color="black"
        >
          {text}
        </Text>

        <Text
          position={[4, -3.8, 0]}
          fontSize={0.4}
          font={"./fonts/Montserrat-Regular.ttf"}
          onClick={() => window.open("https://wino.fr", "_blank")}
          color="#0c0cff"
          onPointerOver={() => (document.body.style.cursor = "pointer")}
          onPointerOut={() => (document.body.style.cursor = "grab")}
        >
          wino.fr
        </Text>
        {/** Technos */}
        <Text
          fontSize={1}
          position={[2.3, 3.5, -1.11]}
          font={"./fonts/Montserrat-Bold.ttf"}
          rotation-y={Math.PI}
          color="#242323"
        >
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
          font={"./fonts/Montserrat-Bold.ttf"}
          rotation-y={Math.PI}
          color="#242323"
        >
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
          font={"./fonts/Montserrat-Bold.ttf"}
          rotation-y={Math.PI}
          color="#242323"
        >
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
            toggleProjects("none")
          }}
          onPointerOver={() => (document.body.style.cursor = "pointer")}
          onPointerOut={() => (document.body.style.cursor = "grab")}
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
            toggleProjects("none")
          }}
          onPointerOver={() => (document.body.style.cursor = "pointer")}
          onPointerOut={() => (document.body.style.cursor = "grab")}
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
          position={[4, 2.45, 0]}
          visible={false}
          onClick={() => {
            setFlipped(!flipped)
          }}
          onPointerOver={() => (document.body.style.cursor = "pointer")}
          onPointerOut={() => (document.body.style.cursor = "grab")}
        />
        <group position={[4, 2.45, 0]}>
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
          position={[-4, 2.45, -1.2]}
          visible={false}
          onClick={() => {
            setFlipped(!flipped)
          }}
          onPointerOver={() => (document.body.style.cursor = "pointer")}
          onPointerOut={() => (document.body.style.cursor = "grab")}
        />
        <group position={[-4, 2.45, -1.2]}>
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
const Wino = ({ descriptionEn, descriptionFr, position }: Props) => {
  const logoWino = useFBX("./3dmodels/Logo/winoLogo.fbx")
  const ref = useRef<THREE.Mesh | null>(null)
  const { language } = useLanguage()
  const { projects, toggleProjects } = useProject()

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

  useEffect(() => {
    if (projects !== "wino") {
      setIsVisible(false)
    }
  }, [projects])

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
      toggleProjects("wino")
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
        rotation={[0, Math.PI / 12, Math.PI / 5]}
        onPointerOver={() => (document.body.style.cursor = "pointer")}
        onPointerOut={() => (document.body.style.cursor = "grab")}
      >
        <Box
          args={[7.1, 1.3, 2]}
          position={[-3.9, 0, -1]}
          visible={false}
          scale={1.1}
          onClick={handleClick}
          ref={ref}
        />
        <primitive object={logoWino} scale={0.02} />
      </group>
    </>
  )
}

export default Wino
