import * as THREE from "three"

import { useSpring, animated } from "@react-spring/three"
import { Text3D } from "@react-three/drei"
import { useRef, useState } from "react"
import { useFrame, useThree } from "@react-three/fiber"

interface LetterProps {
  id?: number
  letter: string
  position: THREE.Vector3
  rotationX: number
  rotationY?: number
}

const Letter = ({
  id: key,
  letter,
  position,
  rotationX,
  rotationY = 0,
}: LetterProps) => {
  const fontSize = 2
  const ref = useRef<THREE.Mesh | null>(null)

  const [hoveredRotation, setHoveredRotation] = useState(false)
  const { rotation } = useSpring({
    rotation: hoveredRotation ? [-Math.PI / 2, 0, 0] : [0, 0, 0],
    config: {
      tension: 80,
    },
  })

  // const raycaster = new THREE.Raycaster()
  // const { camera, scene } = useThree()

  if (ref.current) ref.current.name = letter + key

  // useFrame((state) => {
  //   raycaster.setFromCamera(state.mouse, camera)
  //   const intersects = raycaster.intersectObjects([scene])
  //   if (intersects.length > 0 && intersects[0].object.name === letter + key) {
  //     setHoveredRotation(true)
  //   }
  // })

  return (
    <animated.group
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      rotation={rotation}
      onPointerEnter={() => {
        setHoveredRotation(true)
      }}
      onPointerLeave={() => {
        setTimeout(() => setHoveredRotation(false), 4000)
      }}
    >
      <Text3D
        ref={ref}
        font={"./fonts/Bree_Serif_Regular.json"}
        position={position}
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
    </animated.group>
  )
}

interface NameProps {
  position: THREE.Vector3
  rotationY?: number
  name: LetterProps[]
}

const Name = ({ position, rotationY, name }: NameProps) => {
  return (
    <group position={position}>
      {name.map((letter, i) => (
        <Letter
          key={i}
          letter={letter.letter}
          id={i}
          position={letter.position}
          rotationX={letter.rotationX}
          rotationY={rotationY}
        />
      ))}
    </group>
  )
}

export default Name
