import { useLayoutEffect, useRef, useState } from "react"
import { RoundedBox, useFBX, Text, Box } from "@react-three/drei"
import * as THREE from "three"
import { ThreeEvent, useFrame, useThree } from "@react-three/fiber"
import { animated, useSpring } from "@react-spring/three"
import { useLanguage } from "../Utils/useLanguage"

const TextModal = ({
  isVisible,
  setIsVisible,
  text,
}: {
  isVisible: boolean
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
  text: string
}) => {
  const textRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)
  const { camera } = useThree()

  const title = "HETIC"
  const date = "2017-2022"

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
    <animated.group ref={groupRef} position={[0, 8, 6]} scale={animation.scale}>
      <RoundedBox
        args={[8.5, 6.4, 1]}
        position={[0.3, -1, -0.6]}
        radius={0.1}
        castShadow
      >
        <meshStandardMaterial color="#a6f7a0" />
      </RoundedBox>
      <group position={[0, -0.3, 0]}>
        <Text
          fontSize={1}
          position={[-2, 1.6, 0]}
          font={"./fonts/Montserrat-Bold.ttf"}
          color={"#242323"}
        >
          {title}
        </Text>
        <Text
          fontSize={0.5}
          position={[-2.2, 0.8, 0]}
          font={"./fonts/Montserrat-SemiBold.ttf"}
          color="#4a4a4a"
        >
          {date}
        </Text>
        <Text
          ref={textRef}
          font={"./fonts/Montserrat-Regular.ttf"}
          maxWidth={7.6}
          fontSize={0.6}
          anchorX={"center"}
          anchorY={"top"}
          position={[0.4, 0.3, 0]}
        >
          <meshBasicMaterial color="black" />
          {text}
        </Text>
        <Box
          args={[1, 1, 1]}
          position={[3.6, 1.7, 0]}
          visible={false}
          onClick={() => setIsVisible(false)}
          onPointerOver={() => (document.body.style.cursor = "pointer")}
          onPointerOut={() => (document.body.style.cursor = "grab")}
        />
        <group position={[3.6, 1.7, 0]} rotation={[0, 0, Math.PI / 4]}>
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
      </group>
    </animated.group>
  )
}

const Hetic = () => {
  const logoHetic = useFBX("./3dmodels/hetic_cap2.fbx")

  const { language } = useLanguage()
  const { camera, scene } = useThree()
  const [isVisible, setIsVisible] = useState(false)
  const ref1 = useRef<THREE.Mesh | null>(null)
  const ref2 = useRef<THREE.Mesh | null>(null)
  const [hovered, setHover] = useState(false)

  if (ref1.current) {
    ref1.current.name = "Hetic"
  }
  if (ref2.current) {
    ref2.current.name = "Hetic"
  }

  useLayoutEffect(
    () =>
      logoHetic.traverse((o) => {
        if (o instanceof THREE.Mesh) {
          o.castShadow = o.receiveShadow = true
          o.material.emissiveIntensity = 0
        }
      }),
    [logoHetic],
  )
  useFrame(() => {
    const glowIntensity = 0.08
    const glowColor = "#ffffff"

    logoHetic.traverse((o) => {
      if (o instanceof THREE.Mesh) {
        o.material.emissive = new THREE.Color(glowColor)

        if (hovered && o.material.emissiveIntensity < glowIntensity) {
          o.material.emissiveIntensity += 0.01
        } else if (!hovered && o.material.emissiveIntensity > 0) {
          o.material.emissiveIntensity -= 0.01
        }
      }
    })
  })

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()

    // Calculate the mouse position in normalized device coordinates
    // (-1 to +1) for both components
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

    // Set the origin and direction of the ray based on the mouse position
    raycaster.setFromCamera(mouse, camera)

    const intersects = raycaster.intersectObjects(scene.children, true)

    if (intersects.length > 0 && intersects[0].object.name === "Hetic") {
      setIsVisible(true)
    }
  }

  return (
    <>
      <TextModal
        setIsVisible={setIsVisible}
        isVisible={isVisible}
        text={
          language === "en"
            ? "Graduated in 2023 after 5 years of a Master in digital and technological transformation"
            : "Diplômé en 2023 d'un Master en Ingénierie et Management de la communication numérique"
        }
      />
      <group
        position={[0, 0.4, 8]}
        onPointerOver={() => {
          document.body.style.cursor = "pointer"
          setHover(true)
        }}
        onPointerOut={() => {
          document.body.style.cursor = "grab"
          setHover(false)
        }}
      >
        <group onClick={handleClick}>
          <Box
            args={[5.2, 1, 1.4]}
            position={[0.1, 0.1, 0]}
            visible={false}
            ref={ref1}
          />
          <Box
            args={[1.8, 0.4, 2]}
            position={[2.2, 1, 0]}
            rotation={[-Math.PI / 9, 0, 0]}
            visible={false}
            ref={ref2}
          />
        </group>
        <primitive object={logoHetic} scale={1} />
      </group>
    </>
  )
}

export default Hetic
