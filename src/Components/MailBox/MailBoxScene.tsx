import { Box, useFBX } from "@react-three/drei"
import { useLayoutEffect, useRef, useState } from "react"
import * as THREE from "three"
import { ThreeEvent, useFrame, useThree } from "@react-three/fiber"

import Grass from "./Grass"
import TextModal from "../TextModal"
import { ProjectsProvider } from "../../Providers/ProjectProvider"

const MailBoxScene = () => {
  const mailboxObj = useFBX("./3dmodels/MailBox/mailbox.fbx")
  const ref = useRef<THREE.Mesh | null>(null)
  const ref2 = useRef<THREE.Mesh | null>(null)
  const { camera, scene } = useThree()
  const [isVisible, setIsVisible] = useState(false)
  const [hovered, setHover] = useState(false)

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
        scale={0.04}
        position={[14, 1.6, -1.6]}
        rotation={[0, (-7 * Math.PI) / 9, 0]}
      />
      <TextModal
        modalSize={[10, 3.5, 1]}
        modalPosition={[14, 8, -1.4]}
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
        position={[14, 2.6, -1.3]}
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
          args={[2.2, 5, 1.4]}
          visible={false}
          scale={1.1}
          onClick={handleClick}
          ref={ref}
        />
        <Box
          args={[1.2, 0.5, 1.3]}
          visible={false}
          scale={1.1}
          position={[1.6, 1, 0]}
          rotation={[0, 0, -Math.PI / 5]}
          onClick={handleClick}
          ref={ref2}
        />
      </group>
    </ProjectsProvider>
  )
}

export default MailBoxScene
