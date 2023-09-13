import * as THREE from "three"
import { Cylinder, Box } from "@react-three/drei"
import { Base, Geometry, Subtraction } from "@react-three/csg"
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry"

const AdsPanel = () => {
  const panelHeight = 10

  return (
    <>
      {/** Base */}
      <group
        position={[-15, panelHeight / 2 + 0.01, -15]}
        rotation={[0, -Math.PI / 4, 0]}
      >
        <Cylinder
          args={[0.4, 0.4, panelHeight, 16]}
          rotation={[0, 0, 0]}
          receiveShadow={true}
        >
          <meshStandardMaterial color={"#d3d3d3"} />
        </Cylinder>
        {/** Front panel */}
        <group
          position={[0.9, panelHeight / 2 - 2, 0]}
          rotation={[0, Math.PI / 2, 0]}
        >
          <Panel />
        </group>
        {/** Back panel */}
        <group
          position={[-0.9, panelHeight / 2 - 2, 0]}
          rotation={[0, -Math.PI / 2, 0]}
        >
          <Panel />
        </group>
      </group>
    </>
  )
}

const Panel = () => {
  return (
    <>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <Geometry useGroups>
          <Base name="base" scale={[5, 10, 1]}>
            <boxGeometry />
            <meshStandardMaterial color={"#81B1CC"} />
          </Base>
          <Subtraction
            name="hole"
            scale={[4.2, 9.2, 0.5]}
            position={[0, 0, 0.4]}
          >
            <boxGeometry />
            <meshStandardMaterial color={"#D3CCCA"} />
          </Subtraction>
        </Geometry>
      </mesh>
    </>
  )
}

export default AdsPanel
