import { Plane } from "@react-three/drei"
import * as THREE from "three"

interface CabinProps {
  craneBaseLength: number
}

interface TriangleProps {
  position: [number, number, number]
  triangleParam: [THREE.Vector3, THREE.Vector3, THREE.Vector3]
}

interface TriangleGeometryProps {
  triangleParam: [THREE.Vector3, THREE.Vector3, THREE.Vector3]
}

const TriangleGeometry = ({ triangleParam }: TriangleGeometryProps) => {
  const a = triangleParam[0]
  const b = triangleParam[1]
  const c = triangleParam[2]
  const triangle = new THREE.Triangle(a, b, c)

  const geometry = new THREE.BufferGeometry()
  const vertices = new Float32Array(9)
  triangle.getNormal(new THREE.Vector3(0, 0, 0)).toArray(vertices, 0)

  triangle.a.toArray(vertices, 0)
  triangle.b.toArray(vertices, 3)
  triangle.c.toArray(vertices, 6)
  geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3))

  return geometry
}

const Triangle = ({ position, triangleParam }: TriangleProps) => {
  const geometry = TriangleGeometry({ triangleParam })
  const material = new THREE.MeshBasicMaterial({
    color: "#ff8330",
    side: THREE.DoubleSide,
  })
  return <mesh geometry={geometry} material={material} position={position} />
}

const Cabin = ({ craneBaseLength }: CabinProps) => {
  return (
    <>
      {/** Floor */}
      <Plane
        args={[5, 7]}
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 15.82, -craneBaseLength / 2]}
      >
        <meshBasicMaterial color="#ff8330" side={THREE.DoubleSide} />
      </Plane>
      {/** Front */}
      <Plane
        args={[5, 2]}
        rotation={[Math.PI / 4, 0, 0]}
        position={[0, 15.82 + 0.705, -craneBaseLength + 5.7]}
      >
        <meshBasicMaterial color="#ff8330" side={THREE.DoubleSide} />
      </Plane>
      <Plane
        args={[5, 3.9]}
        rotation={[-Math.PI / 8.5, 0, 0]}
        position={[0, 15.82 + 3.2, -craneBaseLength + 5.7]}
      >
        <meshPhysicalMaterial
          color="white"
          side={THREE.DoubleSide}
          metalness={0}
          roughness={0}
          transmission={1}
        />
      </Plane>
      {/** Back */}
      <Plane
        args={[5, 5]}
        rotation={[0, 0, 0]}
        position={[0, 15.82 + 5 / 2, -craneBaseLength / 2 - 7 / 2]}
      >
        <meshBasicMaterial color="#ff8330" side={THREE.DoubleSide} />
      </Plane>
      {/** Top */}
      <Plane
        args={[5, 7]}
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 15.82 + 5, -craneBaseLength / 2]}
      >
        <meshBasicMaterial color="#ff8330" side={THREE.DoubleSide} />
      </Plane>
      {/** Left */}
      <Plane
        args={[4, 5]}
        rotation={[0, Math.PI / 2, 0]}
        position={[-2.5, 15.82 + 5 / 2, -craneBaseLength / 2 - 1.5]}
      >
        <meshBasicMaterial color="#ff8330" side={THREE.DoubleSide} />
      </Plane>
      <Plane
        args={[3, 1.5]}
        rotation={[0, Math.PI / 2, 0]}
        position={[-2.5, 15.82 + 0.75, 0.5]}
      >
        <meshBasicMaterial color="#ff8330" side={THREE.DoubleSide} />
      </Plane>
      <Plane
        args={[3, 3.5]}
        rotation={[0, Math.PI / 2, 0]}
        position={[-2.5, 15.82 + 3.25, 0.5]}
      >
        <meshPhysicalMaterial
          color="white"
          side={THREE.DoubleSide}
          metalness={0}
          roughness={0}
          transmission={1}
        />
      </Plane>
      <Triangle
        position={[-2.5, 15.82 + 1.5, 2]}
        triangleParam={[
          new THREE.Vector3(0, 3.5, 0),
          new THREE.Vector3(0, -0.1, 1.4),
          new THREE.Vector3(0, -1.5, 0),
        ]}
      />
      {/** Right */}
      <Plane
        args={[4, 5]}
        rotation={[0, -Math.PI / 2, 0]}
        position={[2.501, 15.82 + 5 / 2, -craneBaseLength / 2 - 1.5]}
      >
        <meshBasicMaterial color="#ff8330" side={THREE.DoubleSide} />
      </Plane>
      <Plane
        args={[3, 1.5]}
        rotation={[0, Math.PI / 2, 0]}
        position={[2.5, 15.82 + 0.75, 0.5]}
      >
        <meshBasicMaterial color="#ff8330" side={THREE.DoubleSide} />
      </Plane>
      <Plane
        args={[3, 3.5]}
        rotation={[0, Math.PI / 2, 0]}
        position={[2.5, 15.82 + 3.25, 0.5]}
      >
        <meshPhysicalMaterial
          color="white"
          side={THREE.DoubleSide}
          metalness={0}
          roughness={0}
          transmission={1}
        />
      </Plane>
      <Triangle
        position={[2.5, 15.82 + 1.5, 2]}
        triangleParam={[
          new THREE.Vector3(0, 3.5, 0),
          new THREE.Vector3(0, -0.1, 1.4),
          new THREE.Vector3(0, -1.5, 0),
        ]}
      />
    </>
  )
}

export default Cabin
