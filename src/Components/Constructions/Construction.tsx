import Post from "./Post"
import Crane from "./Crane/Crane"

const Construction = () => {
  return (
    <>
      <group position={[6, 0, 3]}>
        <group scale={0.6}>
          <Post position={[3, 1.2, 0]} />
          <Post position={[11, 1.2, 0]} />
          <Post position={[8, 1.2, 10]} />
          <Post position={[0, 1.2, 8]} />
        </group>
        <Crane />
      </group>
    </>
  )
}

export default Construction
