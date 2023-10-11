import { RoundedBox } from "@react-three/drei"

const BasePlane = () => {
  return (
    <>
      <RoundedBox
        args={[32, 32, 1]}
        radius={0.4}
        position={[0, -0.5, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <meshStandardMaterial color={"#a88cf5"} />
      </RoundedBox>
    </>
  )
}

export default BasePlane
