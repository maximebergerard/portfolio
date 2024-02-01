import { Box, useFBX } from "@react-three/drei"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import * as THREE from "three"
import TextModal from "../TextModal"
import { ThreeEvent, useThree } from "@react-three/fiber"
import { ProjectsProvider } from "../../Providers/ProjectProvider"
import { useProject } from "../../Utils/useProject"

interface RubiksCubeProps {
  position: [number, number, number]
}

const RubiksCube = ({ position }: RubiksCubeProps) => {
  const logoFolio = useFBX("./3dmodels/Logo/rubiks_cube.fbx")
  const reactLogo = useFBX("./3dmodels/Logo/reactLogo1.fbx")
  const ref = useRef<THREE.Mesh | null>(null)
  const { camera, scene } = useThree()
  const [isVisible, setIsVisible] = useState(false)
  const { projects, toggleProjects } = useProject()

  if (ref.current) {
    ref.current.name = "RubiksCube"
  }

  useLayoutEffect(
    () =>
      logoFolio.traverse(
        (o) =>
          o instanceof THREE.Mesh && (o.castShadow = o.receiveShadow = true),
      ),
    [logoFolio],
  )

  useEffect(() => {
    if (projects !== "rubiksCube") {
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

    if (intersects.length > 0 && intersects[0].object.name === "RubiksCube") {
      setIsVisible(true)
      toggleProjects("rubiksCube")
    }
  }

  return (
    <>
      <primitive
        object={logoFolio}
        position={position}
        scale={0.018}
        rotation={[0, -Math.PI / 3, 0]}
      />
      <TextModal
        modalSize={[10, 8, 1]}
        modalPosition={[-7, 9, 2]}
        title="PORTFOLIO"
        titlePosition={[-1.3, 0, 0]}
        date="2023"
        setIsVisible={setIsVisible}
        isVisible={isVisible}
        text="Ce portfolio est réalisé avec React et Three.js."
        textPosition={[0, -1.4, 0]}
        groupPosition={[0, 2.9, 0]}
        linkName="threejs-journey.com"
        linkUrl="https://threejs-journey.com/"
        linkPosition={[2.6, -6.3, 0]}
        technosTitlePosition={[2.3, 0, -1.11]}
        technosArray={[
          {
            title: "React",
            titlePosition: [2.7, -3.2, -1.11],
            logo: reactLogo,
            logoPosition: [1.6, -3, -1.3],
          },
        ]}
      />
      <Box
        args={[2.1, 2.1, 2.1]}
        position={[position[0] + 0.9, position[1] + 0.5, position[2] + 0.3]}
        rotation={[0, -Math.PI / 3, 0]}
        ref={ref}
        visible={false}
        onClick={handleClick}
        onPointerOver={() => (document.body.style.cursor = "pointer")}
        onPointerOut={() => (document.body.style.cursor = "grab")}
      />
    </>
  )
}

export default RubiksCube
