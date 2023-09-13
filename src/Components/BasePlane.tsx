import { Geometry, Base, Subtraction } from "@react-three/csg"
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry"
import * as THREE from "three"

const BasePlane = () => {
  const roundedBox = new RoundedBoxGeometry(32, 32, 1, 1, 0.4)
  const cylinder = new THREE.CylinderGeometry(5, 5, 2, 32)
  return (
    <>
      <mesh position={[0, -0.5, 0]}>
        <Geometry>
          <Base
            name="base"
            geometry={roundedBox}
            rotation={[Math.PI / 2, 0, 0]}
          ></Base>
          <Subtraction name="hole" geometry={cylinder} />
        </Geometry>
        <meshStandardMaterial color={"#a88cf5"} />
      </mesh>
    </>
  )
}

export default BasePlane
