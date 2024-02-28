import * as THREE from "three"

import { Text3D } from "@react-three/drei"
import { useEffect, useRef } from "react"

import {
  Physics,
  useBox,
  useCylinder,
  Triplet,
  CylinderArgs,
} from "@react-three/cannon"

export interface LetterProps {
  id?: number
  letter: string
  positionGroup: THREE.Vector3
  positionMesh: THREE.Vector3
  argsHitbox: Triplet
  rotationX: number
  rotationY?: number
  isMoving?: boolean
  isReset?: boolean
  count?: number
}

const Letter = ({
  letter,
  positionGroup,
  positionMesh,
  argsHitbox,
  rotationX,
  rotationY = 0,
  isMoving,
  count = 0,
}: LetterProps) => {
  const fontSize = 2
  const randomVelocityRotation = Math.random() * 20 - 10

  const [ref, api] = useBox(
    () => ({
      mass: 0.7,
      position: [positionGroup.x, positionGroup.y + 10, positionGroup.z],
      velocity: [0, 0, 1],
      rotation: [-Math.PI / 4, 0, 0],
      args: argsHitbox,
    }),
    useRef<THREE.Mesh>(null),
  )

  const pos = useRef([0, 0, 0])

  useEffect(() => {
    api.position.subscribe((v) => (pos.current = v))
  }, [api.position])

  useEffect(() => {
    if (isMoving && ref.current) {
      const newPosition = positionGroup
        .clone()
        .sub(new THREE.Vector3(pos.current[0], pos.current[1], pos.current[2]))

      if (pos.current[1] < -1 && count < 3) {
        api.position.set(positionGroup.x, positionGroup.y + 20, positionGroup.z)
        api.velocity.set(0, 0, 0)
        api.angularVelocity.set(0, 0, 0)
        api.rotation.set(Math.PI * 2, 0, 0)
      } else if (count >= 3) {
        api.velocity.set(0, 2, -40)
        api.angularVelocity.set(0, 0, randomVelocityRotation)
      } else if (pos.current[2] > -2) {
        api.velocity.set(newPosition.x, 7, newPosition.z)
        api.angularVelocity.set(0, 0, randomVelocityRotation)
      }
    }
  })
  return (
    <mesh ref={ref}>
      <boxGeometry args={argsHitbox} />
      <meshPhongMaterial color={"#ff0000"} visible={false} />
      <Text3D
        font={"./fonts/Bree_Serif_Regular.json"}
        position={positionMesh}
        rotation={[rotationX, rotationY, 0]}
        size={fontSize}
        bevelEnabled
        bevelSize={0.05}
        castShadow
        receiveShadow
      >
        {letter}
        <meshPhongMaterial color={"#ffffff"} />
      </Text3D>
    </mesh>
  )
}

interface NameProps {
  position: THREE.Vector3
  rotationY?: number
  name: LetterProps[]
  isMoving?: boolean
  count?: number
}

const Name = ({ position, rotationY, name, isMoving, count }: NameProps) => {
  return (
    <group position={position}>
      <Physics>
        {/* <Box /> */}
        <Plane />
        {/* Hitbox */}
        <Post position={[10.5, 3, -3.5]} args={[0.1, 0.1, 6, 16]} />
        <Post position={[13.5, 3, -3]} args={[0.1, 0.1, 6, 16]} />
        <Post position={[-16.5, 3, -3]} args={[0.4, 0.4, 6, 16]} />
        <Post position={[-1.5, 2.25, -2]} args={[0.4, 0.4, 4.5, 16]} />
        <Box
          position={[-16, 8, -2.2]}
          rotation={[0, Math.PI / 6, 0]}
          args={[12, 6, 1]}
        />
        <Box
          position={[10.5, 7, -3.1]}
          rotation={[0, -Math.PI / 5, 0]}
          args={[3, 3, 0.5]}
        />
        <Box
          position={[13.5, 4.8, -3.1]}
          rotation={[0, -Math.PI / 5, 0]}
          args={[2, 2, 0.5]}
        />
        {/* Letter */}
        {name.map((letter, i) => (
          <Letter
            key={i}
            letter={letter.letter}
            id={i}
            positionGroup={letter.positionGroup}
            positionMesh={letter.positionMesh}
            argsHitbox={letter.argsHitbox}
            rotationX={letter.rotationX}
            rotationY={rotationY}
            isMoving={isMoving}
            count={count}
          />
        ))}
      </Physics>
    </group>
  )
}

export default Name

const Plane = () => {
  const [ref] = useBox(
    () => ({
      rotation: [-Math.PI / 2, 0, 0],
      position: [-1.5, 0.01, 11],
      args: [32, 30, 0.02],
    }),
    useRef<THREE.Mesh>(null),
  )

  return (
    <mesh ref={ref} visible={false}>
      <planeGeometry args={[32, 30, 2]} />
      <meshPhongMaterial color="blue" />
    </mesh>
  )
}

interface Post {
  position: Triplet
  args: CylinderArgs
}

const Post = ({ position, args }: Post) => {
  const [ref] = useCylinder(
    () => ({
      position: position,
      args: args,
    }),
    useRef<THREE.Mesh>(null),
  )

  return (
    <mesh ref={ref} visible={false}>
      <cylinderGeometry args={args} />
      <meshPhongMaterial color={"blue"} />
    </mesh>
  )
}

interface Box {
  position: Triplet
  args: Triplet
  rotation?: Triplet
}

const Box = ({ position, args, rotation }: Box) => {
  const [ref] = useBox(
    () => ({
      args: args,
      position: position,
      rotation: rotation,
    }),
    useRef<THREE.Mesh>(null),
  )

  return (
    <mesh ref={ref} visible={false}>
      <boxGeometry args={args} />
      <meshPhongMaterial color={"green"} />
    </mesh>
  )
}
