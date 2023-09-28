import * as THREE from "three"

import { RoundedBox } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import {
  PropsWithChildren,
  createContext,
  createRef,
  useContext,
  useRef,
  useState,
} from "react"

import CraneStructure from "./CraneStructure"
import CraneCabin from "./CraneCabin"
import {
  Physics,
  useCylinder,
  useBox,
  CylinderArgs,
  Triplet,
  useConeTwistConstraint,
  useSphere,
} from "@react-three/cannon"

const parent = createContext({
  position: [0, 0, 0] as Triplet,
  ref: createRef<THREE.Object3D>(),
})

type ChainLinkProps = {
  args?: CylinderArgs
  color?: THREE.Color | string
}

function ChainLink({
  args = [0.5, 0.5, 2, 16],
  children,
  color = "white",
}: PropsWithChildren<ChainLinkProps>) {
  const {
    position: [x, y, z],
    ref: parentRef,
  } = useContext(parent)

  const [, , height = 2] = args
  const position: Triplet = [x, y - height, z]

  const [chainLinkRef] = useCylinder(
    () => ({
      args,
      linearDamping: 0.8,
      mass: 1,
      position,
    }),
    useRef<THREE.Mesh>(null),
  )

  useConeTwistConstraint(parentRef, chainLinkRef, {
    angle: Math.PI / 10,
    axisA: [0, 1, 0],
    axisB: [0, 1, 0],
    pivotA: [0, -height / 2, 0],
    pivotB: [0, height / 2, 0],
    twistAngle: 0,
  })

  return (
    <>
      <mesh ref={chainLinkRef as React.Ref<THREE.Mesh>}>
        <cylinderGeometry args={args} />
        <meshStandardMaterial color={color} />
      </mesh>
      <parent.Provider value={{ position, ref: chainLinkRef }}>
        {children}
      </parent.Provider>
    </>
  )
}

function Rock() {
  const { ref: parentRef } = useContext(parent)

  const [rockRef] = useSphere(
    () => ({
      args: [0.5],
      mass: 1,
    }),
    useRef<THREE.Mesh>(null),
  )

  useConeTwistConstraint(parentRef, rockRef, {
    angle: Math.PI / 2,
    axisA: [0, 1, 0],
    axisB: [0, 1, 0],
    pivotA: [0, -1.5, 0], // Pivot on the bottom of the rock
    pivotB: [0, 1.5, 0], // Pivot on the top of the chain link
    twistAngle: 0,
  })

  return (
    <mesh ref={rockRef} scale={4}>
      {/* Define the geometry and material for the rock */}
      <sphereGeometry args={[0.5, 16, 16]} />
      <meshStandardMaterial color="#211f1f" />
    </mesh>
  )
}

type ChainProps = {
  length: number
  maxMultiplier?: number
}

function Chain({ children, length }: PropsWithChildren<ChainProps>) {
  return (
    <>
      {Array.from({ length }).reduce((acc: React.ReactNode, _, index) => {
        return (
          <ChainLink color={"grey"}>
            {acc}
            {index === 0 ? <Rock /> : null}
          </ChainLink>
        )
      }, children)}
    </>
  )
}

type PointerHandleProps = {
  size: number
  craneRotation?: number
  clockWiseRotation?: boolean
}

function PointerHandle({
  children,
  size,
  clockWiseRotation = false,
}: PropsWithChildren<PointerHandleProps>) {
  const position: Triplet = [0, 0, 22]
  const args: Triplet = [size, size, size]

  const [ref, api] = useBox(
    () => ({ args, position, type: "Dynamic" }),
    useRef<THREE.Mesh>(null),
  )

  const [t, setT] = useState(0)

  const radius = 21.8

  useFrame((_, delta) => {
    if (clockWiseRotation) {
      setT((prevT) => prevT - delta)
    } else {
      setT((prevT) => prevT + delta)
    }

    const x = Math.sin(t) * radius
    const z = Math.cos(t) * radius

    api.position.set(x, 0, z)
  })

  return (
    <group>
      <mesh ref={ref} />
      <parent.Provider value={{ position, ref }}>{children}</parent.Provider>
    </group>
  )
}

const CraneArm = ({
  craneBaseLength,
  clockWiseRotation,
}: {
  craneBaseLength: number
  size?: number
  clockWiseRotation?: boolean
}) => {
  const ref = useRef<THREE.Group>(null)

  useFrame((_, delta) => {
    if (ref.current) {
      if (clockWiseRotation) {
        ref.current.rotation.y -= delta
      } else {
        ref.current.rotation.y += delta
      }
    }
  })

  return (
    <>
      <group ref={ref} position={[0, 0, 0]}>
        {/** Cabin */}
        <CraneCabin craneBaseLength={craneBaseLength} />
        {/** Crane arm */}
        {Array.from({ length: 12 }).map((_, i) => (
          <group
            key={i}
            position={[
              0,
              craneBaseLength * 5 + 5.1,
              (craneBaseLength + 0.4) * i - 12,
            ]}
          >
            <CraneStructure craneBaseLength={craneBaseLength} hasEnd />
          </group>
        ))}
      </group>
      <group position={[0, 22, 0]} scale={1}>
        <PointerHandle size={0.01} clockWiseRotation={clockWiseRotation}>
          <Chain length={7} />
        </PointerHandle>
      </group>
    </>
  )
}

const Crane = () => {
  const craneBaseLength = 3

  const [clockWiseRotation, setClockWiseRotation] = useState(false)

  return (
    <Physics>
      <group
        scale={0.3}
        position={[3, 0.3, 3]}
        onClick={() => {
          setClockWiseRotation(!clockWiseRotation)
        }}
      >
        {/** Base */}
        <RoundedBox
          args={[6, 1, 6]}
          radius={0.2}
          position={[0, 0.3, -craneBaseLength / 2]}
        >
          <meshStandardMaterial color="#bababa" />
        </RoundedBox>
        <RoundedBox
          args={[6, 1, 6]}
          radius={0.2}
          position={[0, -0.71, -craneBaseLength / 2]}
        >
          <meshStandardMaterial color="#bababa" />
        </RoundedBox>
        {Array.from({ length: 5 }).map((_, i) => (
          <group key={i} position={[0, craneBaseLength * (i + 0.15) - 0.5, 0]}>
            <CraneStructure craneBaseLength={craneBaseLength} />
          </group>
        ))}
        {/** Cabin + Arm */}
        <group position={[0, 0, -1]}>
          <CraneArm
            craneBaseLength={craneBaseLength}
            clockWiseRotation={clockWiseRotation}
          />
        </group>
      </group>
    </Physics>
  )
}

export default Crane
