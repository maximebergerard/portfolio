import * as THREE from "three"

// import { useSpring, animated } from "@react-spring/three"
import { Text3D } from "@react-three/drei"
import { useRef } from "react"
// import { useFrame, useThree } from "@react-three/fiber"
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
      position: [-0.5, 0.01, 1],
      args: [32, 10, 0.02],
    }),
    useRef<THREE.Mesh>(null),
  )

  return (
    <mesh ref={ref} visible={false}>
      <planeGeometry args={[32, 10, 0.02]} />
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
  // isClicked: boolean
}

const Letter = ({
  letter,
  positionGroup,
  positionMesh,
  argsHitbox,
  rotationX,
  rotationY = 0,
}: // isClicked,
LetterProps) => {
  const fontSize = 2
  const randomRotation = (Math.random() * -Math.PI) / 2
  const [ref] = useBox(
    () => ({
      mass: 0.7,
      position: [positionGroup.x, positionGroup.y + 10, positionGroup.z],
      rotation: [randomRotation, -Math.PI / 3, 0],
      args: argsHitbox,
    }),
    useRef<THREE.Mesh>(null),
  )

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
  // const { rotation } = useSpring({
  //   rotation: hoveredRotation ? [-Math.PI / 2, 0, 0] : [0, 0, 0],
  //   config: {
  //     tension: 80,
  //   },
  // })

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
}

const Name = ({ position, rotationY, name }: NameProps) => {
  // const [isClicked, setIsClicked] = useState(false)

  // const handleResetLetters = () => {
  //   console.log("click")
  //   setIsClicked(true)
  // }

  return (
    <group position={position}>
      <Physics>
        {/* <Debug color={"blue"} scale={1}> */}
        {/* <Box /> */}
        <Plane />
        <Post position={[11.5, 3, -3.5]} />
        {/* <Box args={[2, 2, 2]} position={[0, 1, 3]} onClick={handleResetLetters}>
          <meshStandardMaterial color={"red"} />
        </Box> */}
        {/* </Debug> */}
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
            // isClicked={isClicked}
          />
        ))}
      </Physics>
    </group>
  )
}

export default Name
