import { RoundedBox } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"

import CraneStructure from "./CraneStructure"
import CraneCabin from "./CraneCabin"

const Crane = () => {
  const craneBaseLength = 3
  const cabinRef = useRef<THREE.Group>(null!)

  useFrame(({ clock }) => {
    cabinRef.current.rotation.y = Math.sin(clock.getElapsedTime() / 4) * 2
  })
  return (
    <>
      <group scale={0.2} position={[3, 0.3, 3]}>
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
        {/** Base leg */}
        <group position={[0, craneBaseLength, 0]}>
          <CraneStructure craneBaseLength={craneBaseLength} />
        </group>
        <group position={[0, craneBaseLength * 2, 0]}>
          <CraneStructure craneBaseLength={craneBaseLength} />
        </group>
        <group position={[0, craneBaseLength * 3, 0]}>
          <CraneStructure craneBaseLength={craneBaseLength} />
        </group>
        <group position={[0, craneBaseLength * 4, 0]}>
          <CraneStructure craneBaseLength={craneBaseLength} />
        </group>
        <CraneStructure craneBaseLength={craneBaseLength} />
        {/** Cabin + Arm */}
        <group ref={cabinRef} position={[0, 0, -1]}>
          {/** Cabin */}
          <CraneCabin craneBaseLength={craneBaseLength} />
          {/** Crane arm */}
          <group position={[0, craneBaseLength * 5 + 5.1, 0]}>
            <CraneStructure craneBaseLength={craneBaseLength} hasEnd />
          </group>
          {/** Back */}
          <group
            position={[0, craneBaseLength * 5 + 5.1, -craneBaseLength - 0.4]}
          >
            <CraneStructure
              craneBaseLength={craneBaseLength}
              rotation={[0, 0, 0]}
              hasEnd
            />
          </group>
          <group
            position={[
              0,
              craneBaseLength * 5 + 5.1,
              (-craneBaseLength - 0.4) * 2,
            ]}
          >
            <CraneStructure
              craneBaseLength={craneBaseLength}
              rotation={[0, 0, 0]}
              hasEnd
            />
          </group>
          <group
            position={[
              0,
              craneBaseLength * 5 + 5.1,
              (-craneBaseLength - 0.4) * 3,
            ]}
          >
            <CraneStructure
              craneBaseLength={craneBaseLength}
              rotation={[0, 0, 0]}
              hasEnd
            />
          </group>
          {/** Front */}
          <group
            position={[0, craneBaseLength * 5 + 5.1, craneBaseLength + 0.4]}
          >
            <CraneStructure
              craneBaseLength={craneBaseLength}
              rotation={[0, 0, 0]}
              hasEnd
            />
          </group>
          <group
            position={[
              0,
              craneBaseLength * 5 + 5.1,
              (craneBaseLength + 0.4) * 2,
            ]}
          >
            <CraneStructure
              craneBaseLength={craneBaseLength}
              rotation={[0, 0, 0]}
              hasEnd
            />
          </group>
          <group
            position={[
              0,
              craneBaseLength * 5 + 5.1,
              (craneBaseLength + 0.4) * 3,
            ]}
          >
            <CraneStructure
              craneBaseLength={craneBaseLength}
              rotation={[0, 0, 0]}
              hasEnd
            />
          </group>
          <group
            position={[
              0,
              craneBaseLength * 5 + 5.1,
              (craneBaseLength + 0.4) * 4,
            ]}
          >
            <CraneStructure
              craneBaseLength={craneBaseLength}
              rotation={[0, 0, 0]}
              hasEnd
            />
          </group>
          <group
            position={[
              0,
              craneBaseLength * 5 + 5.1,
              (craneBaseLength + 0.4) * 5,
            ]}
          >
            <CraneStructure
              craneBaseLength={craneBaseLength}
              rotation={[0, 0, 0]}
              hasEnd
            />
          </group>
          <group
            position={[
              0,
              craneBaseLength * 5 + 5.1,
              (craneBaseLength + 0.4) * 6,
            ]}
          >
            <CraneStructure
              craneBaseLength={craneBaseLength}
              rotation={[0, 0, 0]}
              hasEnd
            />
          </group>
          <group
            position={[
              0,
              craneBaseLength * 5 + 5.1,
              (craneBaseLength + 0.4) * 7,
            ]}
          >
            <CraneStructure
              craneBaseLength={craneBaseLength}
              rotation={[0, 0, 0]}
              hasEnd
            />
          </group>
          <group
            position={[
              0,
              craneBaseLength * 5 + 5.1,
              (craneBaseLength + 0.4) * 8,
            ]}
          >
            <CraneStructure
              craneBaseLength={craneBaseLength}
              rotation={[0, 0, 0]}
              hasEnd
            />
          </group>
          <group
            position={[
              0,
              craneBaseLength * 5 + 5.1,
              (craneBaseLength + 0.4) * 9,
            ]}
          >
            <CraneStructure
              craneBaseLength={craneBaseLength}
              rotation={[0, 0, 0]}
              hasEnd
            />
          </group>
        </group>
      </group>
    </>
  )
}

export default Crane
