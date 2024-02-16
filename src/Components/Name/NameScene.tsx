import * as THREE from "three"
import Name, { LetterProps } from "./Name"
import { useEffect, useState } from "react"
import { Box, Cylinder, Sphere } from "@react-three/drei"
import { animated, useSpring } from "@react-spring/three"

const NameScene = () => {
  const [isMoving, setIsMoving] = useState(false)
  const [count, setCount] = useState(0)

  const positionRedBuzzer = useSpring({
    position: isMoving ? [0, 3.95, 0] : [0, 4.05, 0],
    config: {
      tension: 80,
      friction: 10,
    },
  })

  useEffect(() => {
    if (isMoving && count <= 2) {
      setTimeout(() => setIsMoving(false), 1000)
    } else if (isMoving && count === 3) {
      setTimeout(() => setIsMoving(false), 3000)
    }
    if (count > 3) setCount(0)
  }, [isMoving, count])

  return (
    <>
      <Name
        position={new THREE.Vector3(1.5, 0, -12)}
        name={firstName}
        isMoving={isMoving}
        count={count}
      />
      <group position={[0, 0, -14]}>
        <Box
          args={[0.8, 0.8, 0.8]}
          position={[0, 4, 0]}
          onClick={() => {
            if (!isMoving) {
              setIsMoving(true)
              setCount((prev) => prev + 1)
            }
          }}
          onPointerOver={() => (document.body.style.cursor = "pointer")}
          onPointerOut={() => (document.body.style.cursor = "grab")}
        >
          <meshStandardMaterial color={"red"} visible={false} />
        </Box>
        <Cylinder
          args={[0.4, 0.4, 4, 16]}
          position={[0, 2, 0]}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial color="lightgrey" />
        </Cylinder>
        <Cylinder
          args={[0.35, 0.35, 0.1, 16]}
          position={[0, 4.05, 0]}
          castShadow
        >
          <meshStandardMaterial color={"black"} />
        </Cylinder>
        <animated.group
          position={positionRedBuzzer.position.to((x, y, z) => [x, y, z])}
        >
          <Sphere args={[0.35, 16, 16]} castShadow>
            <meshStandardMaterial color="red" />
          </Sphere>
        </animated.group>
      </group>
    </>
  )
}

export default NameScene

const firstName: LetterProps[] = [
  {
    letter: "M",
    positionGroup: new THREE.Vector3(-15, 0, 0),
    positionMesh: new THREE.Vector3(-1.1, -1, -0.1),
    argsHitbox: [2.3, 2, 0.35],
    rotationX: 0,
  },
  {
    letter: "A",
    positionGroup: new THREE.Vector3(-12.5, 0, 0),
    positionMesh: new THREE.Vector3(-0.9, -1, -0.1),
    argsHitbox: [2, 2, 0.35],
    rotationX: 0,
  },
  {
    letter: "X",
    positionGroup: new THREE.Vector3(-10.45, 0, 0),
    positionMesh: new THREE.Vector3(-0.85, -1, -0.1),
    argsHitbox: [1.9, 2, 0.35],
    rotationX: 0,
  },
  {
    letter: "I",
    positionGroup: new THREE.Vector3(-8.7, 0, 0),
    positionMesh: new THREE.Vector3(-0.45, -1, -0.1),
    argsHitbox: [0.8, 2, 0.35],
    rotationX: 0,
  },
  {
    letter: "M",
    positionGroup: new THREE.Vector3(-7, 0, 0),
    positionMesh: new THREE.Vector3(-1.1, -1, -0.1),
    argsHitbox: [2.3, 2, 0.35],
    rotationX: 0,
  },
  {
    letter: "E",
    positionGroup: new THREE.Vector3(-4.8, 0, 0),
    positionMesh: new THREE.Vector3(-0.8, -1, -0.1),
    argsHitbox: [1.6, 2, 0.35],
    rotationX: 0,
  },
  {
    letter: "B",
    positionGroup: new THREE.Vector3(-2, 0, 0),
    positionMesh: new THREE.Vector3(-0.8, -1, -0.1),
    argsHitbox: [1.6, 2, 0.35],
    rotationX: 0,
  },
  {
    letter: "E",
    positionGroup: new THREE.Vector3(-0.3, 0, 0),
    positionMesh: new THREE.Vector3(-0.8, -1, -0.1),
    argsHitbox: [1.6, 2, 0.35],
    rotationX: 0,
  },
  {
    letter: "R",
    positionGroup: new THREE.Vector3(1.4, 0, 0),
    positionMesh: new THREE.Vector3(-0.9, -1, -0.1),
    argsHitbox: [1.8, 2, 0.35],
    rotationX: 0,
  },
  {
    letter: "G",
    positionGroup: new THREE.Vector3(3.1, 0, 0),
    positionMesh: new THREE.Vector3(-0.9, -1, -0.1),
    argsHitbox: [1.8, 2, 0.35],
    rotationX: 0,
  },
  {
    letter: "E",
    positionGroup: new THREE.Vector3(4.9, 0, 0),
    positionMesh: new THREE.Vector3(-0.8, -1, -0.1),
    argsHitbox: [1.6, 2, 0.35],
    rotationX: 0,
  },
  {
    letter: "R",
    positionGroup: new THREE.Vector3(6.5, 0, 0),
    positionMesh: new THREE.Vector3(-0.9, -1, -0.1),
    argsHitbox: [1.8, 2, 0.35],
    rotationX: 0,
  },
  {
    letter: "A",
    positionGroup: new THREE.Vector3(8.4, 0, 0),
    positionMesh: new THREE.Vector3(-0.9, -1, -0.1),
    argsHitbox: [2, 2, 0.35],
    rotationX: 0,
  },
  {
    letter: "R",
    positionGroup: new THREE.Vector3(10.35, 0, 0),
    positionMesh: new THREE.Vector3(-0.9, -1, -0.1),
    argsHitbox: [1.8, 2, 0.35],
    rotationX: 0,
  },
  {
    letter: "D",
    positionGroup: new THREE.Vector3(12.2, 0, 0),
    positionMesh: new THREE.Vector3(-0.9, -1, -0.1),
    argsHitbox: [1.8, 2, 0.35],
    rotationX: 0,
  },
]
