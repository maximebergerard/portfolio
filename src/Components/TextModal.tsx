import { animated, useSpring } from "@react-spring/three"
import { Box, RoundedBox, Text } from "@react-three/drei"
import { Euler, useFrame, useThree } from "@react-three/fiber"
import { useRef, useState } from "react"

interface TextModalProps {
  modalSize: [number, number, number]
  modalPosition: [number, number, number]
  title: string
  titlePosition?: [number, number, number]
  date?: string
  isVisible: boolean
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
  text: string
  textPosition?: [number, number, number]
  linkName?: string
  linkUrl?: string
}

const TextModal = (props: TextModalProps) => {
  const groupRef = useRef<THREE.Group>(null)
  const [flipped, setFlipped] = useState(false)
  const { camera } = useThree()

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
          <meshStandardMaterial color="#fffaa0" />
        </RoundedBox>
        <Text
          fontSize={1}
          position={props.titlePosition}
          font={"./fonts/Quicksand-Bold.ttf"}
        >
          <meshBasicMaterial color="black" />
          {props.title}
        </Text>
        <Text
          fontSize={0.6}
          position={[-3, 2.5, 0]}
          font={"./fonts/Quicksand-Regular.ttf"}
        >
          <meshBasicMaterial color="#545454" />
          {props.date}
        </Text>
        <Text
          font={"./fonts/Quicksand-Regular.ttf"}
          maxWidth={8.5}
          fontSize={0.6}
          anchorX={"center"}
          anchorY={"top"}
          position={props.textPosition}
        >
          <meshBasicMaterial color="black" />
          {props.text}
        </Text>
        {props.linkName && props.linkUrl && (
          <Text
            position={[4, -3.8, 0]}
            fontSize={0.4}
            font={"./fonts/Quicksand-Regular.ttf"}
            onClick={() => window.open(props.linkUrl, "_blank")}
          >
            <meshBasicMaterial color="#0c0cff" />
            {props.linkName}
          </Text>
        )}
        {/** Technos */}
        {/* <Text
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
        </Text> */}
        {/** Close hitbox button front */}
        <Box
          args={[1, 1, 1]}
          position={[props.modalSize[0] / 2.5, props.modalSize[1] / 3.2, 0]}
          visible={false}
          onClick={() => {
            props.setIsVisible(false)
            setFlipped(false)
          }}
        />
        <group
          position={[props.modalSize[0] / 2.5, props.modalSize[1] / 3.2, 0]}
          rotation={[0, 0, Math.PI / 4]}
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
        {/** Close hitbox button back */}
        {/* <Box
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
        </group> */}
        {/** Flip hitbox button front */}
        {/* <Box
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
        </group> */}
        {/** Flip hitbox button back */}
        {/* <Box
          args={[1, 1, 1]}
          position={[-4, 2.5, -1.2]}
          visible={false}
          onClick={() => {
            setFlipped(!flipped)
          }}
        /> */}
      </animated.group>
    </animated.group>
  )
}

export default TextModal
