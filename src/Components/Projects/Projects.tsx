import { useFBX } from "@react-three/drei"

const Podium = () => {
  return (
    <>
      <mesh position={[-3, 0, 0]}>
        <boxBufferGeometry args={[3, 2.5, 3]} />
        <meshStandardMaterial color="#ffcffd" />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <boxBufferGeometry args={[3, 4, 3]} />
        <meshStandardMaterial color="#ffcffd" />
      </mesh>
      <mesh position={[3, 0, 0]}>
        <boxBufferGeometry args={[3, 2, 3]} />
        <meshStandardMaterial color="#ffcffd" />
      </mesh>
    </>
  )
}

const Project = () => {
  const logoWino = useFBX("./3dmodels/Logo/winoLogo.fbx")
  const logoSmartgarant = useFBX("./3dmodels/Logo/smartgarantLogo.fbx")
  return (
    <>
      <primitive
        object={logoWino}
        position={[-5, 4.2, 3]}
        scale={0.02}
        rotation={[0, Math.PI / 6, Math.PI / 5]}
      />
      <primitive
        object={logoSmartgarant}
        position={[-9, 1, 9.5]}
        scale={0.015}
        rotation={[Math.PI / 6, -Math.PI / 8, 0]}
      />
      <group position={[-5, 0.5, 5]} rotation={[0, -Math.PI / 4, 0]}>
        <Podium />
      </group>
    </>
  )
}

export default Project
