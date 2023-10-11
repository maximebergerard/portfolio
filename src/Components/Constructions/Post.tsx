import { Cylinder, RoundedBox, Sphere } from "@react-three/drei"
import * as THREE from "three"

interface PostProps {
  position: [number, number, number]
}

const Post = ({ position }: PostProps) => {
  const postHeight = 2

  const vertexShader = `
    varying vec2 vUv;

    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `

  const fragmentShader = `
    uniform vec3 color1;
    uniform vec3 color2;

    varying vec2 vUv;

    void main() {
      vec2 pos = vUv * 4.0; // Scale the position
      vec3 color = vec3(0.0);

      // Calculate checkerboard pattern
      if (mod(pos.x + pos.y, 2.0) > 1.0) {
        color = color1;
      } else {
        color = color2;
      }

      gl_FragColor = vec4(color, 1.0);

    }
  `

  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      color1: { value: new THREE.Color("#f0c518") },
      color2: { value: new THREE.Color("#30302f") },
    },
  })

  return (
    <group position={position}>
      <Cylinder
        args={[0.3, 0.3, postHeight, 32]}
        position={[0, 0, 0]}
        rotation={[0, 0, 0]}
        material={material}
        castShadow
      />
      <RoundedBox
        args={[1.2, 0.4, 1.2]}
        radius={0.1}
        position={[0, -postHeight / 2, 0]}
        rotation={[0, 0, 0]}
        castShadow
      >
        <meshStandardMaterial color={"#5e5c5c"} />
      </RoundedBox>
      <Sphere
        args={[0.3, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]}
        position={[0, postHeight - postHeight / 2, 0]}
        rotation={[0, 0, 0]}
        castShadow
      >
        <meshStandardMaterial color={"#30302f"} />
      </Sphere>
    </group>
  )
}

export default Post
