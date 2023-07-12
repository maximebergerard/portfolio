import { useSpring, animated } from "@react-spring/three"
import { useCursor, Text3D } from "@react-three/drei"
import { useRef, useState } from "react"
import * as THREE from "three"

interface LetterProps {
  letter: string
  position: THREE.Vector3
  rotationX: number
}

const Letter = ({ letter, position, rotationX }: LetterProps) => {
  const fontSize = 2
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const ref = useRef<THREE.Mesh>(null!)

  const [hovered, set] = useState(false)
  useCursor(hovered /*'pointer', 'auto'*/)

  const { rotation } = useSpring({
    rotation: hovered ? [-Math.PI / 2, 0, 0] : [0, 0, 0],
    config: {
      tension: 80,
    },
  })

  return (
    <animated.group
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      rotation={rotation}
      onPointerOver={() => set(true)}
      onPointerOut={() => setTimeout(() => set(false), 4000)}
    >
      <Text3D
        ref={ref}
        font={"./fonts/Bree Serif_Regular.json"}
        position={position}
        rotation={[rotationX, 0, 0]}
        size={fontSize}
        bevelEnabled
        bevelSize={0.05}
        castShadow
      >
        {letter}
        {/* <meshNormalMaterial /> */}
        <meshStandardMaterial color={"#ffffff"} />
      </Text3D>
    </animated.group>
  )
}

const Name = () => {
  return (
    <group position={[0.5, 0, -10]}>
      {Letters.map((letter, i) => (
        <Letter
          key={i}
          letter={letter.letter}
          position={letter.position}
          rotationX={letter.rotationX}
        />
      ))}
    </group>
  )
}

export default Name

const Letters = [
  {
    letter: "M",
    position: new THREE.Vector3(-15, 0, 0),
    rotationX: 0,
  },
  {
    letter: "A",
    position: new THREE.Vector3(-12.5, 0, 0),
    rotationX: 0,
  },
  {
    letter: "X",
    position: new THREE.Vector3(-10.45, 0, 0),
    rotationX: 0,
  },
  {
    letter: "I",
    position: new THREE.Vector3(-8.6, 0, 0),
    rotationX: 0,
  },
  {
    letter: "M",
    position: new THREE.Vector3(-7.65, 0, 0),
    rotationX: 0,
  },
  {
    letter: "E",
    position: new THREE.Vector3(-5.2, 0, 0),
    rotationX: 0,
  },
  {
    letter: "B",
    position: new THREE.Vector3(-2, 0, 0),
    rotationX: 0,
  },
  {
    letter: "E",
    position: new THREE.Vector3(-0.3, 0, 0),
    rotationX: 0,
  },
  {
    letter: "R",
    position: new THREE.Vector3(1.4, 0, 0),
    rotationX: 0,
  },
  {
    letter: "G",
    position: new THREE.Vector3(3.1, 0, 0),
    rotationX: 0,
  },
  {
    letter: "E",
    position: new THREE.Vector3(4.9, 0, 0),
    rotationX: 0,
  },
  {
    letter: "R",
    position: new THREE.Vector3(6.5, 0, 0),
    rotationX: 0,
  },
  {
    letter: "A",
    position: new THREE.Vector3(8.4, 0, 0),
    rotationX: 0,
  },
  {
    letter: "R",
    position: new THREE.Vector3(10.35, 0, 0),
    rotationX: 0,
  },
  {
    letter: "D",
    position: new THREE.Vector3(12.2, 0, 0),
    rotationX: 0,
  },
]
