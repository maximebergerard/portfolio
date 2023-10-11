import { Html, useFBX } from "@react-three/drei"
import Wino from "./Wino"

const Podium = () => {
  return (
    <>
      <mesh position={[-3, 0, 0]} castShadow receiveShadow>
        <boxBufferGeometry args={[3, 2.5, 3]} />
        <meshStandardMaterial color="#ffcffd" />
      </mesh>
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <boxBufferGeometry args={[3, 3, 3]} />
        <meshStandardMaterial color="#ffcffd" />
      </mesh>
      <mesh position={[3, 0, 0]} castShadow receiveShadow>
        <boxBufferGeometry args={[3, 2, 3]} />
        <meshStandardMaterial color="#ffcffd" />
      </mesh>
    </>
  )
}

const ProjectText = () => {
  return <div>Wino est un projet gngngn</div>
}

const Project = () => {
  const logoSmartgarant = useFBX("./3dmodels/Logo/smartgarantLogo.fbx")
  return (
    <group position={[-5, 0, -4]}>
      <Wino text="Oui alors wino stylé" position={[-4.3, 4.2, 5.2]} />
      {/* <ProjectText /> */}
      {/* <primitive
        object={logoSmartgarant}
        position={[-9.4, -0.36, 9.6]}
        scale={0.015}
        rotation={[Math.PI / 5.2, Math.PI / -8, Math.PI / 10]}
      /> */}
      <group position={[-5, 0.5, 5]} rotation={[0, -Math.PI / 4, 0]}>
        <Podium />
      </group>
      {/* <Html>
        <p>zerfghytrezdsfghytt</p>
      </Html> */}
    </group>
  )
}

export default Project
