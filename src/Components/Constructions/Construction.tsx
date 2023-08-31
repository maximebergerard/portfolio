import Post from "./Post"
import Crane from "./Crane/Crane"

const Construction = () => {
  return (
    <>
      <group position={[6, 0, 3]}>
        <group scale={0.6}>
          <Post position={[0, 2.2, 0]} />
          <Post position={[10, 2.2, 0]} />
          <Post position={[10, 2.2, 10]} />
          <Post position={[0, 2.2, 10]} />
        </group>
        <Crane />
      </group>
    </>
  )
}

export default Construction
