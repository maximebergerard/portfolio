import { useLayoutEffect, useRef, useState } from "react"
import { RoundedBox, useFBX, Text, Box } from "@react-three/drei"
import * as THREE from "three"
import { ThreeEvent, useFrame, useThree } from "@react-three/fiber"
import { animated, useSpring } from "@react-spring/three"

const TextModal = ({
  isVisible,
  setIsVisible,
  text,
}: {
  isVisible: boolean
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
  text: string
}) => {
  const title = "HETIC"
  const date = "2017-2022"

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
      position={[0, 12, 6]}
      scale={animation.scale}
    >
      <RoundedBox
        args={[8, 5, 1]}
        position={[0, 0, -0.6]}
        radius={0.1}
        castShadow
      >
        <meshStandardMaterial color="#cfffcc" />
      </RoundedBox>
      <Text
        fontSize={1}
        position={[-2, 1.6, 0]}
        font={"./fonts/Quicksand-Bold.ttf"}
      >
        <meshBasicMaterial color="black" />
        {title}
      </Text>
      <Text
        fontSize={0.6}
        position={[-2, 0.6, 0]}
        font={"./fonts/Quicksand-Regular.ttf"}
      >
        <meshBasicMaterial color="#545454" />
        {date}
      </Text>
      <Text
        ref={textRef}
        font={"./fonts/Quicksand-Regular.ttf"}
        maxWidth={7.4}
        fontSize={0.6}
        anchorX={"center"}
        anchorY={"top"}
        position={[0.4, 0, 0]}
      >
        <meshBasicMaterial color="black" />
        {text}
      </Text>
      {/* <Text
        position={[3, -3.8, 0]}
        fontSize={0.4}
        font={"./fonts/Quicksand-Regular.ttf"}
        onClick={() => window.open("https://smart-garant.com", "_blank")}
      >
        <meshBasicMaterial color="#0c0cff" />
        smart-garant.com
      </Text> */}
      <Box
        args={[1, 1, 1]}
        position={[3.2, 1.7, 0]}
        visible={false}
        onClick={() => setIsVisible(false)}
      />

      <group position={[3.2, 1.7, 0]} rotation={[0, 0, Math.PI / 4]}>
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

const Hetic = () => {
  const heticLogo = useFBX("./3dmodels/hetic_cap.fbx")

  const { camera, scene } = useThree()
  const [isVisible, setIsVisible] = useState(false)
  const ref1 = useRef<THREE.Mesh>(null!)
  const ref2 = useRef<THREE.Mesh>(null!)

  if (ref1.current) {
    ref1.current.name = "Hetic"
  }
  if (ref2.current) {
    ref2.current.name = "Hetic"
  }

  useLayoutEffect(
    () =>
      heticLogo.traverse(
        (o) =>
          o instanceof THREE.Mesh && (o.castShadow = o.receiveShadow = true),
      ),
    [heticLogo],
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

    if (intersects.length > 0 && intersects[0].object.name === "Hetic") {
      setIsVisible(true)
    }
  }

  return (
    <>
      <TextModal
        setIsVisible={setIsVisible}
        isVisible={isVisible}
        text={"Diplômé en 2023 du cursus Grande Ecole"}
      />
      <group position={[0, 0.4, 8]}>
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
        <primitive object={heticLogo} scale={0.015} />
      </group>
    </>
  )
}

export default Hetic
