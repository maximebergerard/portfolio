import { useFBX } from "@react-three/drei"
import Grass from "./Grass"

const MailBoxScene = () => {
  const fbx = useFBX("./3dmodels/MailBox/mailbox.fbx")
  return (
    <>
      <Grass />
      <primitive
        object={fbx}
        scale={0.04}
        position={[14, 1.8, -1.6]}
        rotation={[0, (-7 * Math.PI) / 9, 0]}
      />
    </>
  )
}

export default MailBoxScene
