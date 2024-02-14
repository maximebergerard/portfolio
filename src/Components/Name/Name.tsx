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

const Plane = () => {
  const [ref] = useBox(
    () => ({
      rotation: [-Math.PI / 2, 0, 0],
      position: [-0.5, 0.01, 11],
      args: [32, 30, 0.02],
    }),
    useRef<THREE.Mesh>(null),
  )

  return (
    <mesh ref={ref} visible={false}>
      <planeGeometry args={[32, 30, 2]} />
      <meshStandardMaterial color="blue" />
    </mesh>
  )
}

interface Post {
  position: Triplet
}

const Post = ({ position }: Post) => {
  const args: CylinderArgs = [0.1, 0.1, 6, 16]
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
      <meshStandardMaterial color={"blue"} />
    </mesh>
  )
}

export interface LetterProps {
  id?: number
  letter: string
  positionGroup: THREE.Vector3
  positionMesh: THREE.Vector3
  argsHitbox: Triplet
  rotationX: number
  rotationY?: number
  isClicked?: boolean
}

const Letter = ({
  letter,
  positionGroup,
  positionMesh,
  argsHitbox,
  rotationX,
  rotationY = 0,
  isClicked,
}: LetterProps) => {
  const fontSize = 2
  const randomRotation = (Math.random() * -Math.PI) / 2
  const randomVelocityRotation = Math.random() * 20 - 10

  const [ref, api] = useBox(
    () => ({
      mass: 0.7,
      position: [positionGroup.x, positionGroup.y + 6, positionGroup.z],
      velocity: [0, 0, 2],
      rotation: [randomRotation, -Math.PI / 3, 0],
      args: argsHitbox,
    }),
    useRef<THREE.Mesh>(null),
  )

  const pos = useRef([0, 0, 0])

  useEffect(() => {
    api.position.subscribe((v) => (pos.current = v))
  }, [api.position])

  useEffect(() => {
    if (isClicked && ref.current) {
      const newPosition = positionGroup
        .clone()
        .sub(new THREE.Vector3(pos.current[0], pos.current[1], pos.current[2]))

      if (pos.current[1] < 0) {
        api.position.set(positionGroup.x, positionGroup.y + 20, positionGroup.z)
        api.velocity.set(0, 0, 0)
      } else {
        api.velocity.set(newPosition.x, 7, newPosition.z)
        api.angularVelocity.set(0, 0, randomVelocityRotation)
      }
    }
  })

  // const { position } = useSpring({
  //   position: isClicked
  //     ? [positionGroup.x, positionGroup.y + 10, positionGroup.z]
  //     : [0, 0, 0],
  //   config: {
  //     duration: 2000,
  //   },
  // })
  // const ref = useRef<THREE.Mesh | null>(null)

  // const [hoveredRotation, setHoveredRotation] = useState(false)

  // const raycaster = new THREE.Raycaster()
  // const { camera, scene } = useThree()

  // if (ref.current) ref.current.name = letter + key

  // TODO - FIX Performances issues
  // useFrame((state) => {
  //   raycaster.setFromCamera(state.mouse, camera)
  //   const intersects = raycaster.intersectObjects([scene])
  //   if (intersects.length > 0 && intersects[0].object.name === letter + key) {
  //     setHoveredRotation(true)
  //   }
  // })

  return (
    // <animated.group
    //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //   // @ts-ignore
    //   rotation={rotation}
    //   onPointerEnter={() => {
    //     setHoveredRotation(true)
    //   }}
    //   onPointerLeave={() => {
    //     setTimeout(() => setHoveredRotation(false), 4000)
    //   }}
    // >
    // <animated.group position={position.to((x, y, z) => [x, y, z])}>
    <mesh ref={ref}>
      <boxGeometry args={argsHitbox} />
      <meshStandardMaterial color={"#ff0000"} visible={false} />
      <Text3D
        // ref={ref}
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
        <meshStandardMaterial color={"#ffffff"} />
      </Text3D>
    </mesh>
    // </animated.group>
    // </animated.group>
  )
}

interface NameProps {
  position: THREE.Vector3
  rotationY?: number
  name: LetterProps[]
  isClicked?: boolean
}

const Name = ({ position, rotationY, name, isClicked }: NameProps) => {
  return (
    <group position={position}>
      <Physics>
        {/* <Box /> */}
        <Plane />
        <Post position={[11.5, 3, -3.5]} />
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
            isClicked={isClicked}
          />
        ))}
      </Physics>
    </group>
  )
}

export default Name
