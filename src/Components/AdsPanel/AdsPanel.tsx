import { Box, Cylinder } from "@react-three/drei"
import { Base, Geometry, Subtraction } from "@react-three/csg"
import { useLoader } from "@react-three/fiber"
import * as THREE from "three"
import { useLanguage } from "../../Utils/useLanguage"

const AdsPanel = () => {
  const panelHeight = 10

  const texture1 = useLoader(THREE.TextureLoader, "/images/adsImgFr1.jpg")
  const texture2 = useLoader(THREE.TextureLoader, "/images/adsImgEn1.jpg")
  const texture3 = useLoader(THREE.TextureLoader, "/images/adsImg2.jpg")
  const { language } = useLanguage()

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
          <meshPhongMaterial color={"#d3d3d3"} />
        </Cylinder>
        {/** Front panel */}
        <group
          position={[0.9, panelHeight / 2 - 2, 0]}
          rotation={[0, Math.PI / 2, 0]}
        >
          <Panel texture={language === "fr" ? texture1 : texture2} />
        </group>
        {/** Back panel */}
        <group
          position={[-0.9, panelHeight / 2 - 2, 0]}
          rotation={[0, -Math.PI / 2, 0]}
        >
          <Panel texture={texture3} />
        </group>
        <Box
          args={[0.8, 0.8, 0.8]}
          position={[1, 1.25, 3.6]}
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
          args={[0.8, 0.8, 0.8]}
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

  return (
    <group>
      <mesh rotation={[0, 0, -Math.PI / 2]}>
        <Geometry useGroups>
          <Base name="base" scale={[panelWidth, panelHeight, 1]}>
            <boxGeometry />
            <meshPhongMaterial color={"#81B1CC"} />
          </Base>
          <Subtraction
            name="hole"
            scale={[panelWidth - 0.8, panelHeight - 0.8, 0.5]}
            position={[0, 0, 0.4]}
            rotation={[0, 0, 0]}
          >
            <boxGeometry />
            <meshPhongMaterial color={"#D3CCCA"} map={texture} />
          </Subtraction>
        </Geometry>
      </mesh>
    </group>
  )
}

export default AdsPanel
