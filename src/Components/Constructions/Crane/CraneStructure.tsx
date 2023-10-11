import { RoundedBox } from "@react-three/drei"

interface CraneStructureProps {
  craneBaseLength: number
  hasEnd?: boolean
  rotation?: [number, number, number]
}

const CraneStructure = ({
  craneBaseLength,
  hasEnd = false,
  rotation,
}: CraneStructureProps) => {
  const craneBaseThickness = 0.4
  return (
    <group position={[0, 1, 0]} rotation={rotation}>
      {/** Rectangle base */}
      <RoundedBox
        args={[craneBaseLength, craneBaseThickness, craneBaseThickness]}
        radius={0.05}
        position={[0, 0, 0]}
        castShadow
      >
        <meshStandardMaterial color="grey" />
      </RoundedBox>
      <RoundedBox
        args={[
          craneBaseLength - craneBaseThickness,
          craneBaseThickness,
          craneBaseThickness,
        ]}
        radius={0.05}
        position={[
          -craneBaseLength / 2 + craneBaseThickness / 2,
          0,
          -craneBaseLength / 2,
        ]}
        rotation={[0, Math.PI / 2, 0]}
        castShadow
      >
        <meshStandardMaterial color="grey" />
      </RoundedBox>
      <RoundedBox
        args={[
          craneBaseLength - craneBaseThickness,
          craneBaseThickness,
          craneBaseThickness,
        ]}
        radius={0.05}
        position={[
          craneBaseLength / 2 - craneBaseThickness / 2,
          0,
          -craneBaseLength / 2,
        ]}
        rotation={[0, Math.PI / 2, 0]}
        castShadow
      >
        <meshStandardMaterial color="grey" />
      </RoundedBox>
      <RoundedBox
        args={[craneBaseLength, craneBaseThickness, craneBaseThickness]}
        radius={0.05}
        position={[0, 0, -craneBaseLength]}
        castShadow
      >
        <meshStandardMaterial color="grey" />
      </RoundedBox>
      {/** Diagonale base */}
      <RoundedBox
        args={[
          craneBaseLength + 0.4,
          craneBaseThickness - 0.05,
          craneBaseThickness - 0.05,
        ]}
        radius={0.05}
        position={[0, craneBaseLength / 2, 0]}
        rotation={[0, 0, -Math.PI / 4]}
        castShadow
      >
        <meshStandardMaterial color="grey" />
      </RoundedBox>
      <RoundedBox
        args={[
          craneBaseLength + 0.4,
          craneBaseThickness - 0.05,
          craneBaseThickness - 0.05,
        ]}
        radius={0.05}
        position={[0, craneBaseLength / 2, -craneBaseLength]}
        rotation={[0, 0, Math.PI / 4]}
        castShadow
      >
        <meshStandardMaterial color="grey" />
      </RoundedBox>
      <RoundedBox
        args={[
          craneBaseLength + 0.7,
          craneBaseThickness - 0.05,
          craneBaseThickness - 0.05,
        ]}
        radius={0.05}
        position={[
          craneBaseLength / 2 - craneBaseThickness / 2,
          craneBaseLength / 2 - 0.1,
          -craneBaseLength / 2 + 0.1,
        ]}
        rotation={[0, -Math.PI / 2, Math.PI / 4.1]}
        castShadow
      >
        <meshStandardMaterial color="grey" />
      </RoundedBox>
      <RoundedBox
        args={[
          craneBaseLength + 0.7,
          craneBaseThickness - 0.05,
          craneBaseThickness - 0.05,
        ]}
        radius={0.05}
        position={[
          -craneBaseLength / 2 + craneBaseThickness / 2,
          craneBaseLength / 2 - 0.1,
          -craneBaseLength / 2 - 0.1,
        ]}
        rotation={[0, Math.PI / 2, Math.PI / 4.1]}
        castShadow
      >
        <meshStandardMaterial color="grey" />
      </RoundedBox>
      {/** Verticale base */}
      <RoundedBox
        args={[
          craneBaseLength - craneBaseThickness,
          craneBaseThickness,
          craneBaseThickness,
        ]}
        radius={0.05}
        position={[
          -craneBaseLength / 2 + craneBaseThickness / 2,
          craneBaseLength / 2,
          0,
        ]}
        rotation={[0, 0, Math.PI / 2]}
        castShadow
      >
        <meshStandardMaterial color="grey" />
      </RoundedBox>
      <RoundedBox
        args={[
          craneBaseLength - craneBaseThickness,
          craneBaseThickness,
          craneBaseThickness,
        ]}
        radius={0.05}
        position={[
          craneBaseLength / 2 - craneBaseThickness / 2,
          craneBaseLength / 2,
          0,
        ]}
        rotation={[0, 0, Math.PI / 2]}
        castShadow
      >
        <meshStandardMaterial color="grey" />
      </RoundedBox>
      <RoundedBox
        args={[
          craneBaseLength - craneBaseThickness,
          craneBaseThickness,
          craneBaseThickness,
        ]}
        radius={0.05}
        position={[
          craneBaseLength / 2 - craneBaseThickness / 2,
          craneBaseLength / 2,
          -craneBaseLength,
        ]}
        rotation={[0, 0, Math.PI / 2]}
        castShadow
      >
        <meshStandardMaterial color="grey" />
      </RoundedBox>
      <RoundedBox
        args={[
          craneBaseLength - craneBaseThickness,
          craneBaseThickness,
          craneBaseThickness,
        ]}
        radius={0.05}
        position={[
          -craneBaseLength / 2 + craneBaseThickness / 2,
          craneBaseLength / 2,
          -craneBaseLength,
        ]}
        rotation={[0, 0, Math.PI / 2]}
        castShadow
      >
        <meshStandardMaterial color="grey" />
      </RoundedBox>
      {/** Rectangle end */}
      {hasEnd && (
        <group position={[0, craneBaseLength, 0]}>
          <RoundedBox
            args={[craneBaseLength, craneBaseThickness, craneBaseThickness]}
            radius={0.05}
            position={[0, 0, 0]}
            castShadow
          >
            <meshStandardMaterial color="grey" />
          </RoundedBox>
          <RoundedBox
            args={[
              craneBaseLength - craneBaseThickness,
              craneBaseThickness,
              craneBaseThickness,
            ]}
            radius={0.05}
            position={[
              -craneBaseLength / 2 + craneBaseThickness / 2,
              0,
              -craneBaseLength / 2,
            ]}
            rotation={[0, Math.PI / 2, 0]}
            castShadow
          >
            <meshStandardMaterial color="grey" />
          </RoundedBox>
          <RoundedBox
            args={[
              craneBaseLength - craneBaseThickness,
              craneBaseThickness,
              craneBaseThickness,
            ]}
            radius={0.05}
            position={[
              craneBaseLength / 2 - craneBaseThickness / 2,
              0,
              -craneBaseLength / 2,
            ]}
            rotation={[0, Math.PI / 2, 0]}
            castShadow
          >
            <meshStandardMaterial color="grey" />
          </RoundedBox>
          <RoundedBox
            args={[craneBaseLength, craneBaseThickness, craneBaseThickness]}
            radius={0.05}
            castShadow
            position={[0, 0, -craneBaseLength]}
          >
            <meshStandardMaterial color="grey" />
          </RoundedBox>
        </group>
      )}
    </group>
  )
}

export default CraneStructure
