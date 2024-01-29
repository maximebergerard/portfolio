import { Box, useFBX } from "@react-three/drei"
import { useRef, useState } from "react"
import * as THREE from "three"
import { ThreeEvent, useThree } from "@react-three/fiber"

import Grass from "./Grass"
import TextModal from "../TextModal"

const MailBoxScene = () => {
  const fbx = useFBX("./3dmodels/MailBox/mailbox.fbx")
  const ref = useRef<THREE.Mesh | null>(null)
  const { camera, scene } = useThree()
  const [isVisible, setIsVisible] = useState(false)

  if (ref.current) {
    ref.current.name = "MailBox"
  }

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
    <>
      <Grass />
      <primitive
        object={fbx}
        scale={0.04}
        position={[14, 1.6, -1.6]}
        rotation={[0, (-7 * Math.PI) / 9, 0]}
      />
      <TextModal
        title="MAIL"
        titlePosition={[-3.3, 1, 0]}
        modalSize={[10, 3.5, 1]}
        modalPosition={[14, 8, -1.4]}
        setIsVisible={setIsVisible}
        isVisible={isVisible}
        text="maxime.bergerard@gmail.com"
        textPosition={[0, 0, 0]}
      />
      {/* Hitbox click */}
      <group
        position={[14, 2.6, -1.3]}
        rotation={[0, (-7 * Math.PI) / 9, 0]}
        onPointerOver={() => (document.body.style.cursor = "pointer")}
        onPointerOut={() => (document.body.style.cursor = "grab")}
      >
        <Box
          args={[2.2, 5, 1.4]}
          visible={false}
          scale={1.1}
          onClick={handleClick}
          ref={ref}
        />
      </group>
    </>
  )
}

export default MailBoxScene
