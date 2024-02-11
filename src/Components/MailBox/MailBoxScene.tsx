import { Box, useFBX } from "@react-three/drei"
import { useLayoutEffect, useRef, useState } from "react"
import * as THREE from "three"
import { ThreeEvent, useFrame, useThree } from "@react-three/fiber"

import Grass from "./Grass"
import TextModal from "../TextModal"
import { ProjectsProvider } from "../../Providers/ProjectProvider"
import { animated, useSpring } from "@react-spring/three"

const MailBoxScene = () => {
  const mailboxObj = useFBX("./3dmodels/MailBox/mailbox.fbx")
  const antenna = useFBX("./3dmodels/MailBox/antenna.fbx")

  const ref = useRef<THREE.Mesh | null>(null)
  const ref2 = useRef<THREE.Mesh | null>(null)
  const ref3 = useRef<THREE.Group | null>(null)
  const { camera, scene } = useThree()
  const [isVisible, setIsVisible] = useState(false)
  const [hovered, setHover] = useState(false)

  const antennaAnimation = useSpring({
    rotation: isVisible
      ? [0, (-7 * Math.PI) / 9, 0]
      : [0, (-7 * Math.PI) / 9, Math.PI / 2],
    config: {
      tension: 200,
    },
  })

  if (ref.current) {
    ref.current.name = "MailBox"
  }
  if (ref2.current) {
    ref2.current.name = "MailBox"
  }

  useLayoutEffect(
    () =>
      mailboxObj.traverse((o) => {
        if (o instanceof THREE.Mesh) {
          o.castShadow = o.receiveShadow = true
          o.material.emissiveIntensity = 0
        }
      }),
    [mailboxObj],
  )
  useFrame(() => {
    const glowIntensity = 0.08
    const glowColor = "#ffffff"

    mailboxObj.traverse((o) => {
      if (o instanceof THREE.Mesh) {
        o.material.emissive = new THREE.Color(glowColor)

        if (hovered && o.material.emissiveIntensity < glowIntensity) {
          o.material.emissiveIntensity += 0.01
        } else if (!hovered && o.material.emissiveIntensity > 0) {
          o.material.emissiveIntensity -= 0.01
        }
      }
    })

    if (ref3.current) {
      // ref3.current.rotation.z += 0.01
      // ref3.current.rotation.y += 0.01
    }
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

    // Check if the ray intersects with the mannequin mesh
    const intersects = raycaster.intersectObjects(scene.children, true)

    if (intersects.length > 0 && intersects[0].object.name === "MailBox") {
      setIsVisible(true)
    }
  }

  return (
    <ProjectsProvider>
      <Grass />
      <primitive
        object={mailboxObj}
        scale={0.9}
        position={[14, 2.1, -1.6]}
        rotation={[0, (-7 * Math.PI) / 9, 0]}
      />
      <animated.group
        rotation={antennaAnimation.rotation as unknown as THREE.Euler}
        position={[14, 5, -0.23]}
        ref={ref3}
      >
        <primitive
          object={antenna}
          scale={0.9}
          // rotation={[0, (-7 * Math.PI) / 9, 0]}
          // position={[14, 2.2, -1.6]}
        />
      </animated.group>
      <TextModal
        modalSize={[10, 3.5, 1]}
        modalPosition={[14, 8.6, -1.4]}
        title="MAIL"
        titlePosition={[-3.3, 0, 0]}
        setIsVisible={setIsVisible}
        isVisible={isVisible}
        textFr="maxime.bergerard@gmail.com"
        textEn="maxime.bergerard@gmail.com"
        textPosition={[0, -1, 0]}
        groupPosition={[0, 0.8, 0]}
      />
      {/* Hitbox click */}
      <group
        position={[14, 3.2, -1.15]}
        rotation={[0, (-7 * Math.PI) / 9, 0]}
        onPointerOver={() => {
          document.body.style.cursor = "pointer"
          setHover(true)
        }}
        onPointerOut={() => {
          document.body.style.cursor = "grab"
          setHover(false)
        }}
      >
        <Box
          args={[2.6, 6, 1.9]}
          visible={false}
          scale={1.1}
          onClick={handleClick}
          ref={ref}
        />
        <Box
          args={[2.4, 0.5, 1.6]}
          visible={false}
          scale={1.1}
          position={[1.7, 1.3, 0.1]}
          rotation={[0, 0, -Math.PI / 5]}
          onClick={handleClick}
          ref={ref2}
        />
      </group>
    </ProjectsProvider>
  )
}

export default MailBoxScene
