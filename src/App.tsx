/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as THREE from "three"
import { useRef, useState, Suspense } from "react"
import "./App.css"

import { Canvas } from "@react-three/fiber"
import {
  useHelper,
  OrbitControls,
  GradientTexture,
  RoundedBox,
  OrthographicCamera,
  PerspectiveCamera,
  PresentationControls,
} from "@react-three/drei"

import Man from "./Components/Mannequin"
import Name from "./Components/Name"

const Light = () => {
  const directionalLight = useRef(new THREE.DirectionalLight())
  // useHelper(directionalLight, THREE.DirectionalLightHelper, 1, "cyan")
  return (
    <>
      <ambientLight intensity={0.1} />
      <directionalLight
        ref={directionalLight}
        position={[0, 12, 16]}
        color={"white"}
        castShadow={true}
        intensity={1}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />
    </>
  )
}

const OCamera = () => {
  const camera = useRef<THREE.OrthographicCamera>(null!)
  // useHelper(camera, THREE.CameraHelper)
  return (
    <OrthographicCamera
      makeDefault
      position={[0, 1, 40]}
      rotation={[0, 0, 0]}
      ref={camera}
      near={0.1}
      far={100}
      zoom={40}
    />
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

        <PresentationControls
          snap
          global
          rotation={[0, Math.PI / 4, 0]}
          polar={[Math.PI / 20, Math.PI / 4]}
          azimuth={[-Math.PI / 4, Math.PI / 4]}
          config={{
            mass: 1,
            tension: 60,
            friction: 20,
          }}
        >
          <Name />
          <RoundedBox
            args={[32, 30, 1]}
            radius={0.4}
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -0.5, 0]}
            receiveShadow={true}
          >
            <meshStandardMaterial color={"#a88cf5"}></meshStandardMaterial>
          </RoundedBox>
          <Suspense fallback={null}>
            <Man />
          </Suspense>
        </PresentationControls>
        {/* <PCamera /> */}
        <Light />
      </Canvas>
    </div>
  )
}
