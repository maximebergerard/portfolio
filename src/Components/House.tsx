import { Box, Cone, RoundedBox } from "@react-three/drei"

const House = () => {
  const floorColor = "#9bc8c9"
  const wallsColor = "#d9eff0"
  const roofColor = "#bbceb8"
  return (
    <group position={[-10, 0, 10]}>
      {/* Floor */}
      <RoundedBox
        args={[5, 0.5, 5]}
        radius={0.1}
        position={[0, 0.1, 0]}
        // castShadow
        receiveShadow
      >
        <meshStandardMaterial color={floorColor} />
      </RoundedBox>
      {/* Walls */}
      <group position={[0, 0.3, 0]}>
        <Box args={[2.5, 2, 0.5]} position={[0, 1, -1]} castShadow>
          <meshStandardMaterial color={wallsColor} />
        </Box>
        <Box
          args={[2.5, 2, 0.5]}
          position={[1, 1, 0]}
          rotation={[0, Math.PI / 2, 0]}
          castShadow
        >
          <meshStandardMaterial color={wallsColor} />
        </Box>
        <Box
          args={[2.5, 2, 0.5]}
          position={[0, 1, 1]}
          rotation={[0, Math.PI, 0]}
          castShadow
        >
          <meshStandardMaterial color={wallsColor} />
        </Box>
        <Box
          args={[2.5, 2, 0.5]}
          position={[-1, 1, 0]}
          rotation={[0, -Math.PI / 2, 0]}
          castShadow
        >
          <meshStandardMaterial color={wallsColor} />
        </Box>
        {/* Roof */}
        <Cone
          args={[2, 1, 4, 4, false, Math.PI / 4]}
          position={[0, 2.51, 0]}
          castShadow
        >
          <meshStandardMaterial color={roofColor} />
        </Cone>
      </group>
    </group>
  )
}

export default House
