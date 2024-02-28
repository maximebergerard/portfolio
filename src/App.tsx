/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useRef, Suspense, useLayoutEffect, useState } from "react"
import * as THREE from "three"

import "./App.css"

import { Canvas, useFrame, useThree } from "@react-three/fiber"
import {
  // OrbitControls,
  GradientTexture,
  // Loader,
  OrthographicCamera,
  // PerspectiveCamera,
  PresentationControls,
  // Stats,
  useFBX,
  useProgress,
} from "@react-three/drei"

import Light from "./Components/Light"
import Airplane from "./Components/Airplane/Airplane"
import AdsPanel from "./Components/AdsPanel/AdsPanel"
import BasePlane from "./Components/BasePlane"
import Projects from "./Components/Projects/Projects"
import Loader from "./Components/Loader/Loader"
import Hetic from "./Components/Hetic"
import MousePointerPanel from "./Components/MousePointerPanel"
import MailBoxScene from "./Components/MailBox/MailBoxScene"
import NameScene from "./Components/Name/NameScene"
import LanguageButton from "./Components/Languages"
import { ProjectsProvider } from "./Providers/ProjectProvider"

// WIP
// import Mannequin from "./Components/Mannequin"
// import Construction from "./Components/Constructions/Construction"
// import BucketHat from "./Components/BucketHat"

const OCamera = () => {
  const camera = useRef<THREE.OrthographicCamera | null>(null)

  const three = useThree()

  three.gl.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  const zoom = three.size.width * 0.023
  if (camera.current) {
    camera.current.zoom = zoom
    if (three.size.width < 768) {
      camera.current.zoom = 20
      // camera.current.position.set(0, 4, 40)
    }
  }

  return (
    <OrthographicCamera
      makeDefault
      position={[0, 5, 40]}
      rotation={[0, 0, 0]}
      ref={camera}
      near={0.1}
      far={120}
      zoom={20}
    >
      {/* <OrbitControls rotation={[0, Math.PI / 4, 0]} /> */}
    </OrthographicCamera>
  )
}

// const PCamera = () => {
//   // const camera = useRef<THREE.PerspectiveCamera| null>(null)
//   // useHelper(camera, THREE.CameraHelper)
//   return (
//     <PerspectiveCamera makeDefault position={[0, 0, 40]}>
//       <OrbitControls />
//     </PerspectiveCamera>
//   )
// }

const LoaderScreen = () => {
  const { active, loaded } = useProgress()
  const [opacity, setOpacity] = useState(1)

  useFrame(() => {
    if (loaded && !active && opacity > 0) {
      setOpacity((prev) => prev - 0.01)
    }
  })

  return (
    <>
      {opacity < 0 ? null : (
        <mesh position={[0, 4, 30]}>
          <planeGeometry args={[50, 50, 1]} />
          <meshBasicMaterial color="#a88cf5" transparent opacity={opacity} />
        </mesh>
      )}
    </>
  )
}

const ThreeJsScene = () => {
  return (
    <Canvas
      shadows
      onPointerDown={() => (document.body.style.cursor = "grabbing")}
      onPointerUp={() => (document.body.style.cursor = "grab")}
    >
      <Suspense fallback={<Loader />}>
        <LoaderScreen />
        <GradientTexture
          attach={"background"}
          stops={[0, 0.25, 0.75, 1]}
          colors={["#d0bdde", "#eaafc8", "#a88cf5", "#d0bdde"]}
        />

        <OCamera />
        <PresentationControls
          global
          rotation={[0, Math.PI / 4, 0]}
          polar={[0.1, Math.PI / 3]}
          config={{
            mass: 1,
            tension: 80,
            friction: 20,
          }}
          cursor={false}
        >
          <LanguageButton />
          <NameScene />
          <BasePlane />
          {/* <Mannequin /> */}
          <Airplane />
          <PlanePanel />
          <ProjectsProvider>
            <Projects />
          </ProjectsProvider>
          <MousePointerPanel />
          {/* <BucketHat /> */}
          {/* <Construction /> */}
          <MailBoxScene />
          <AdsPanel />
          <Hetic />
          <Light />
          {/* <Stats /> */}
        </PresentationControls>
        {/* <PCamera /> */}
      </Suspense>
    </Canvas>
  )
}

export default function App() {
  return (
    <div className="App">
      <ThreeJsScene />
    </div>
  )
}

const PlanePanel = () => {
  const obj = useFBX("./3dmodels/AirplanePanel/planePanel.fbx")

  useLayoutEffect(
    () =>
      obj.traverse(
        (o) =>
          o instanceof THREE.Mesh && (o.castShadow = o.receiveShadow = true),
      ),
    [obj],
  )
  return (
    <primitive
      object={obj}
      position={[15, 0, -15]}
      scale={0.02}
      rotation={[-Math.PI / 2, 0, -Math.PI / 4]}
    />
  )
}
