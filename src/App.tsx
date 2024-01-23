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
  useFBX,
  useProgress,
} from "@react-three/drei"

// import Mannequin from "./Components/Mannequin"
import Name from "./Components/Name"
import Light from "./Components/Light"
import Airplane from "./Components/Airplane/Airplane"
// import Construction from "./Components/Constructions/Construction"
import AdsPanel from "./Components/AdsPanel/AdsPanel"
import BasePlane from "./Components/BasePlane"
import Projects from "./Components/Projects/Projects"
import Loader from "./Components/Loader"
import Hetic from "./Components/Hetic"
import MousePointerPanel from "./Components/MousePointerPanel"
// import BucketHat from "./Components/BucketHat"
import MailBoxScene from "./Components/MailBox/MailBoxScene"

// const HtmlVersion = () => {
//   return (
//     <div>
//       <h1>Maxime Bergerard</h1>
//       <p>Développeur Front-End</p>
//     </div>
//   )
// }

const OCamera = () => {
  const camera = useRef<THREE.OrthographicCamera | null>(null)

  const three = useThree()

  console.log(three.size.width)

  const zoom = three.size.width * 0.02
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
      position={[0, 4, 40]}
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
    <Canvas shadows>
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
            tension: 60,
            friction: 20,
          }}
        >
          <Name position={new THREE.Vector3(0.5, 0, -12)} name={firstName} />
          <Name position={new THREE.Vector3(0.5, 0, -12)} name={lastName} />
          <BasePlane />
          {/* <Mannequin /> */}
          <Airplane />
          <PlanePanel />
          <Projects />
          <MousePointerPanel />
          {/* <BucketHat /> */}
          {/* <Construction /> */}
          <MailBoxScene />
          <AdsPanel />
          <Hetic />
          <Light />
        </PresentationControls>
        {/* <PCamera /> */}
      </Suspense>
    </Canvas>
  )
}

export default function App() {
  // const isMobile = window.innerWidth <= 768
  // const [isMobile] = useState(false)

  // useFrame(() => {
  //   setIsMobile(window.innerWidth <= 768)
  // })

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
