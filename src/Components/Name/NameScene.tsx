import * as THREE from "three"
import Name, { LetterProps } from "./Name"
import { useEffect, useState } from "react"
import { Box } from "@react-three/drei"

const NameScene = () => {
  const [isClicked, setIsClicked] = useState(false)

  const handleResetLetters = () => {
    setIsClicked(true)
  }

  useEffect(() => {
    if (isClicked) setTimeout(() => setIsClicked(false), 1000)
  }, [isClicked])

  return (
    <>
      <Name
        position={new THREE.Vector3(0.5, 0, -12)}
        name={firstName}
        isClicked={isClicked}
      />
      <Name
        position={new THREE.Vector3(0.5, 0, -12)}
        name={lastName}
        isClicked={isClicked}
      />
      <Box args={[2, 2, 2]} position={[0, 1, -3]} onClick={handleResetLetters}>
        <meshStandardMaterial color={"red"} />
      </Box>
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
    positionGroup: new THREE.Vector3(-8.6, 0, 0),
    positionMesh: new THREE.Vector3(-0.45, -1, -0.1),
    argsHitbox: [0.8, 2, 0.35],
    rotationX: 0,
  },
  {
    letter: "M",
    positionGroup: new THREE.Vector3(-7.65, 0, 0),
    positionMesh: new THREE.Vector3(-1.1, -1, -0.1),
    argsHitbox: [2.3, 2, 0.35],
    rotationX: 0,
  },
  {
    letter: "E",
    positionGroup: new THREE.Vector3(-5.2, 0, 0),
    positionMesh: new THREE.Vector3(-0.8, -1, -0.1),
    argsHitbox: [1.6, 2, 0.35],
    rotationX: 0,
  },
]

const lastName: LetterProps[] = [
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
