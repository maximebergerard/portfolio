import { animated, useSpring } from "@react-spring/three"
import { Box, RoundedBox, Text } from "@react-three/drei"
import { Euler, ObjectMap, useFrame, useThree } from "@react-three/fiber"
import { useEffect, useRef, useState } from "react"
import { useProject } from "../Utils/useProject"
import * as THREE from "three"
import { useLanguage } from "../Utils/useLanguage"
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader"

interface TextModalProps {
  modalSize: [number, number, number]
  modalPosition: [number, number, number]
  title: string
  titlePosition?: [number, number, number]
  date?: string
  isVisible: boolean
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
  textFr: string
  textEn: string
  textPosition?: [number, number, number]
  linkName?: string
  linkUrl?: string
  linkPosition?: [number, number, number]
  groupPosition?: [number, number, number]
  technosTitlePosition?: [number, number, number]
  technosArray?: {
    title: string
    logo: THREE.Group | (GLTF & ObjectMap)
    logoScale: number
    logoPosition: [number, number, number]
    titlePosition: [number, number, number]
    rotation?: [number, number, number]
  }[]
}

const TextModal = (props: TextModalProps) => {
  const groupRef = useRef<THREE.Group>(null)
  const [flipped, setFlipped] = useState(false)
  const { camera } = useThree()
  const { toggleProjects } = useProject()
  const { language } = useLanguage()

  const closeAnimation = useSpring({
    scale: props.isVisible ? 1 : 0,
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

  useEffect(() => {
    if (!props.isVisible) {
      setFlipped(false)
    }
  }, [props.isVisible])

  return (
    <animated.group
      ref={groupRef}
      position={props.modalPosition}
      scale={closeAnimation.scale}
    >
      <animated.group rotation={flippedAnimation.rotation as unknown as Euler}>
        <RoundedBox
          args={props.modalSize}
          position={[0, 0, -0.6]}
          radius={0.1}
          castShadow
        >
          <meshPhongMaterial color="#fffaa0" />
        </RoundedBox>
        <group position={props.groupPosition}>
          <Text
            fontSize={1}
            position={props.titlePosition}
            font={"./fonts/Montserrat-Bold.ttf"}
            color={"#242323"}
          >
            {props.title}
          </Text>
          {props.titlePosition && props.date && (
            <Text
              fontSize={0.5}
              position={[-3.6, props.titlePosition[1] - 0.7, 0]}
              font={"./fonts/Montserrat-SemiBold.ttf"}
              color="#4a4a4a"
            >
              {props.date}
            </Text>
          )}
          <Text
            font={"./fonts/Montserrat-Regular.ttf"}
            maxWidth={8.5}
            fontSize={0.6}
            anchorX={"center"}
            anchorY={"top"}
            position={props.textPosition}
          >
            <meshBasicMaterial color="black" />
            {language === "fr" ? props.textFr : props.textEn}
          </Text>
          {props.linkName && props.linkUrl && (
            <Text
              position={props.linkPosition}
              fontSize={0.4}
              font={"./fonts/Montserrat-Regular.ttf"}
              onClick={() => window.open(props.linkUrl, "_blank")}
              onPointerOver={() => (document.body.style.cursor = "pointer")}
              onPointerOut={() => (document.body.style.cursor = "grab")}
            >
              <meshBasicMaterial color="#0c0cff" />
              {props.linkName}
            </Text>
          )}
          {/** Technos */}
          {props.technosArray &&
            props.technosArray.map((techno) => (
              <group key={techno.title}>
                <Text
                  fontSize={1}
                  position={props.technosTitlePosition}
                  font={"./fonts/Montserrat-Bold.ttf"}
                  rotation-y={Math.PI}
                  color="#242323"
                >
                  {"Technos"}
                </Text>
                <primitive
                  object={techno.logo}
                  scale={techno.logoScale}
                  position={techno.logoPosition}
                  rotation={
                    techno.rotation ? techno.rotation : [Math.PI / 2, 0, 0]
                  }
                />
                <Text
                  fontSize={0.6}
                  position={techno.titlePosition}
                  font={"./fonts/Montserrat-Bold.ttf"}
                  rotation-y={Math.PI}
                  color="#242323"
                >
                  {techno.title}
                </Text>
              </group>
            ))}
          {/** Close hitbox button front */}
          <Box
            args={[1, 1, 1]}
            position={[props.modalSize[0] / 2.5, 0.2, 0]}
            visible={false}
            onClick={() => {
              props.setIsVisible(false)
              setFlipped(false)
              toggleProjects("none")
            }}
            onPointerOver={() => (document.body.style.cursor = "pointer")}
            onPointerOut={() => (document.body.style.cursor = "grab")}
          />
          <group
            position={[props.modalSize[0] / 2.5, 0.2, 0]}
            rotation={[0, 0, Math.PI / 4]}
          >
            <RoundedBox args={[0.8, 0.2, 0.2]} radius={0.05}>
              <meshPhongMaterial color="#f25050" />
            </RoundedBox>
            <RoundedBox
              args={[0.8, 0.2, 0.2]}
              radius={0.05}
              rotation={[0, 0, Math.PI / 2]}
            >
              <meshPhongMaterial color="#f25050" />
            </RoundedBox>
          </group>
          {props.technosTitlePosition && (
            <>
              {/** Close hitbox button back */}
              <Box
                args={[1, 1, 1]}
                position={[-4, 0.2, -1.2]}
                visible={false}
                onClick={() => {
                  props.setIsVisible(false)
                  setFlipped(false)
                  toggleProjects("none")
                }}
              />
              <group position={[-4, 0.2, -1.2]} rotation={[0, 0, Math.PI / 4]}>
                <RoundedBox args={[0.8, 0.2, 0.2]} radius={0.05}>
                  <meshPhongMaterial color="#f25050" />
                </RoundedBox>
                <RoundedBox
                  args={[0.8, 0.2, 0.2]}
                  radius={0.05}
                  rotation={[0, 0, Math.PI / 2]}
                >
                  <meshPhongMaterial color="#f25050" />
                </RoundedBox>
              </group>
              {/** Flip hitbox button front */}
              <Box
                args={[1, 1, 1]}
                position={[4, -0.8, 0]}
                visible={false}
                onClick={() => {
                  setFlipped(!flipped)
                }}
              />
              <group position={[4, -0.8, 0]}>
                <RoundedBox args={[0.8, 0.2, 0.2]} radius={0.05}>
                  <meshPhongMaterial color="#6365b7" />
                </RoundedBox>
                <RoundedBox
                  args={[0.5, 0.2, 0.2]}
                  radius={0.05}
                  rotation={[0, 0, Math.PI / 4]}
                  position={[0.17, -0.17, 0]}
                >
                  <meshPhongMaterial color="#6365b7" />
                </RoundedBox>
                <RoundedBox
                  args={[0.5, 0.2, 0.2]}
                  radius={0.05}
                  rotation={[0, 0, -Math.PI / 4]}
                  position={[0.17, 0.17, 0]}
                >
                  <meshPhongMaterial color="#6365b7" />
                </RoundedBox>
              </group>
              {/** Flip hitbox button back */}
              <Box
                args={[1, 1, 1]}
                position={[-4, -0.8, -1.2]}
                visible={false}
                onClick={() => {
                  setFlipped(!flipped)
                }}
              />
              <group position={[-4, -0.8, -1.2]}>
                <RoundedBox args={[0.8, 0.2, 0.2]} radius={0.05}>
                  <meshPhongMaterial color="#6365b7" />
                </RoundedBox>
                <RoundedBox
                  args={[0.5, 0.2, 0.2]}
                  radius={0.05}
                  rotation={[0, 0, Math.PI / 4]}
                  position={[0.17, -0.17, 0]}
                >
                  <meshPhongMaterial color="#6365b7" />
                </RoundedBox>
                <RoundedBox
                  args={[0.5, 0.2, 0.2]}
                  radius={0.05}
                  rotation={[0, 0, -Math.PI / 4]}
                  position={[0.17, 0.17, 0]}
                >
                  <meshPhongMaterial color="#6365b7" />
                </RoundedBox>
              </group>
            </>
          )}
        </group>
      </animated.group>
    </animated.group>
  )
}

export default TextModal
