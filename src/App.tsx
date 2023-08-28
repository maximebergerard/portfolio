/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as THREE from "three"
import { useRef, Suspense } from "react"

import "./App.css"

import { Canvas, useThree } from "@react-three/fiber"
import {
  OrbitControls,
  GradientTexture,
  RoundedBox,
  OrthographicCamera,
  PerspectiveCamera,
  PresentationControls,
  useHelper,
} from "@react-three/drei"

import Mannequin from "./Components/Mannequin"
import Name from "./Components/Name"
import Light from "./Components/Light"
import Airplane from "./Components/Airplane/Airplane"
import House from "./Components/House"
import Construction from "./Components/Constructions/Construction"

const OCamera = () => {
  const camera = useRef<THREE.OrthographicCamera>(null!)
  const three = useThree()
  const zoom = three.size.width * 0.02
  if (camera.current) {
    camera.current.zoom = zoom
  }

  // useHelper(camera, THREE.CameraHelper)
  return (
    <OrthographicCamera
      makeDefault
      position={[0, 2, 40]}
      rotation={[0, 0, 0]}
      ref={camera}
      near={0.1}
      far={100}
      // zoom={30}
    >
      {/* <OrbitControls rotation={[0, Math.PI / 4, 0]} /> */}
    </OrthographicCamera>
  )
}

const PCamera = () => {
  // const camera = useRef<THREE.PerspectiveCamera>(null!)
  // useHelper(camera, THREE.CameraHelper)
  return (
    <PerspectiveCamera makeDefault position={[0, 0, 40]}>
      <OrbitControls />
    </PerspectiveCamera>
  )
}

export default function App() {
  return (
    <div className="App">
      <Canvas shadows>
        <GradientTexture
          attach={"background"}
          stops={[0, 0.25, 0.75, 1]}
          colors={["#d0bdde", "#eaafc8", "#a88cf5", "#d0bdde"]}
        />
        <OCamera />
        {/* <PresentationControls
          global
          cursor={false}
          rotation={[0, Math.PI / 4, 0]}
          polar={[0.1, Math.PI / 3]}
          config={{
            mass: 1,
            tension: 60,
            friction: 20,
          }}
        > */}
        <Name position={new THREE.Vector3(0.5, 0, -12)} name={firstName} />
        <Name position={new THREE.Vector3(0.5, 0, -12)} name={lastName} />
        <RoundedBox
          args={[32, 32, 1]}
          radius={0.4}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -0.5, 0]}
          receiveShadow={true}
        >
          <meshStandardMaterial color={"#a88cf5"} />
        </RoundedBox>
        <Suspense fallback={null}>
          <Mannequin />
        </Suspense>
        <Airplane />
        <House />
        <Construction />
        <Light />
        {/* </PresentationControls> */}
        <PCamera />
      </Canvas>
    </div>
  )
}

const firstName = [
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
]

const lastName = [
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
