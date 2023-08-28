import { RoundedBox } from "@react-three/drei"

const Crane = () => {
  return (
    <>
      <group position={[0, 3, 0]}>
        <CraneBase />
      </group>
      <CraneBase />
    </>
  )
}

export default Crane

const CraneBase = () => {
  const craneBaseLength = 3
  const craneBaseThickness = 0.4
  return (
    <group position={[0, 1, 0]}>
      {/** Rectangle base */}
      <RoundedBox
        args={[craneBaseLength, craneBaseThickness, craneBaseThickness]}
        radius={0.05}
        position={[0, 0, 0]}
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
      >
        <meshStandardMaterial color="grey" />
      </RoundedBox>
      <RoundedBox
        args={[craneBaseLength, craneBaseThickness, craneBaseThickness]}
        radius={0.05}
        position={[0, 0, -craneBaseLength]}
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
      >
        <meshStandardMaterial color="grey" />
      </RoundedBox>
    </group>
  )
}
