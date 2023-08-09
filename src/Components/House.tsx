import { Box, Cone } from "@react-three/drei"

const House = () => {
  return (
    <group>
      {/* Walls */}
      <Box args={[2.5, 2, 0.5]} position={[0, 1, -1]}>
        <meshStandardMaterial color={"brown"} />
      </Box>
      <Box
        args={[2.5, 2, 0.5]}
        position={[1, 1, 0]}
        rotation={[0, Math.PI / 2, 0]}
      >
        <meshStandardMaterial color={"brown"} />
      </Box>
      <Box args={[2.5, 2, 0.5]} position={[0, 1, 1]} rotation={[0, Math.PI, 0]}>
        <meshStandardMaterial color={"brown"} />
      </Box>
      <Box
        args={[2.5, 2, 0.5]}
        position={[-1, 1, 0]}
        rotation={[0, -Math.PI / 2, 0]}
      >
        <meshStandardMaterial color={"brown"} />
      </Box>

      {/* Roof */}
      <Cone
        args={[2, 1, 4]}
        position={[0, 2.51, 0]}
        rotation={[0, Math.PI / 4, 0]}
      >
        <meshStandardMaterial color={"#ff00ff"} />
      </Cone>
    </group>
  )
}

export default House
