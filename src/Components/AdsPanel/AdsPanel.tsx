import { Box, Cylinder } from "@react-three/drei"
import { Base, Geometry, Subtraction } from "@react-three/csg"
import { useLoader } from "@react-three/fiber"
import * as THREE from "three"

const AdsPanel = () => {
  const panelHeight = 10
  const texture1 = useLoader(THREE.TextureLoader, "/images/adsImg1.png")
  const texture2 = useLoader(THREE.TextureLoader, "/images/adsImg2.png")

  return (
    <>
      {/** Base */}
      <group
        position={[-15, panelHeight / 2 + 0.01, -15]}
        rotation={[0, -Math.PI / 3, 0]}
      >
        <Cylinder
          args={[0.4, 0.4, panelHeight, 16]}
          rotation={[0, 0, 0]}
          receiveShadow={true}
          castShadow
        >
          <meshStandardMaterial color={"#d3d3d3"} />
        </Cylinder>
        {/** Front panel */}
        <group
          position={[0.9, panelHeight / 2 - 2, 0]}
          rotation={[0, Math.PI / 2, 0]}
        >
          <Panel texture={texture1} />
        </group>
        {/** Back panel */}
        <group
          position={[-0.9, panelHeight / 2 - 2, 0]}
          rotation={[0, -Math.PI / 2, 0]}
        >
          <Panel texture={texture2} />
        </group>
        <Box
          args={[0.6, 0.6, 0.6]}
          position={[1, 1.25, 4]}
          visible={false}
          onClick={() =>
            window.open(
              "https://www.linkedin.com/in/maxime-bergerard/",
              "_blank",
            )
          }
          onPointerOver={() => (document.body.style.cursor = "pointer")}
          onPointerOut={() => (document.body.style.cursor = "grab")}
        />
        <Box
          args={[0.6, 0.6, 0.6]}
          position={[1, 1.25, 4.8]}
          visible={false}
          onClick={() =>
            window.open("https://github.com/maximebergerard", "_blank")
          }
          onPointerOver={() => (document.body.style.cursor = "pointer")}
          onPointerOut={() => (document.body.style.cursor = "grab")}
        />
      </group>
    </>
  )
}

const Panel = ({ texture }: { texture: THREE.Texture }) => {
  const panelWidth = 6
  const panelHeight = 12
  //load an image as a texture

  // rotate the texture
  texture.rotation = Math.PI / 2
  texture.flipY = false
  // repeat the texture
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping

  texture.repeat.set(1, 1)

  return (
    <group>
      <mesh rotation={[0, 0, -Math.PI / 2]}>
        <Geometry useGroups>
          <Base name="base" scale={[panelWidth, panelHeight, 1]}>
            <boxGeometry />
            <meshStandardMaterial color={"#81B1CC"} />
          </Base>
          <Subtraction
            name="hole"
            scale={[panelWidth - 0.8, panelHeight - 0.8, 0.5]}
            position={[0, 0, 0.4]}
            rotation={[0, 0, 0]}
          >
            <boxGeometry />
            <meshStandardMaterial color={"#D3CCCA"} map={texture} />
          </Subtraction>
        </Geometry>
      </mesh>
    </group>
  )
}

export default AdsPanel
