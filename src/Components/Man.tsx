/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.7 man.glb
*/
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck

import React, { useEffect, useRef, useState } from "react"
import { useGLTF, useAnimations } from "@react-three/drei"

export default function Model() {
  const group = useRef()
  const [action, setAction] = useState("IdlePose")
  const previousAction = usePrevious(action)
  const { nodes, materials, animations } = useGLTF("./3dmodels/mannequin.glb")
  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    if (previousAction) {
      actions[previousAction].fadeOut(0.5)
      actions[action]?.stop()
    }
    actions[action].play()
    actions[action].fadeIn(0.5)
  }, [action, actions, previousAction])

  return (
    <group ref={group} dispose={null}>
      <group name="Scene">
        <group
          name="Armature"
          rotation={[Math.PI / 2, 0, Math.PI / 2]}
          scale={0.03}
          position={[15, -0.05, 0]}
          onPointerOver={() => setAction("WavePose")}
          onPointerOut={() => setTimeout(() => setAction("IdlePose"), 1100)}
        >
          <primitive object={nodes.mixamorigHips} />
          <skinnedMesh
            name="Beta_Joints"
            geometry={nodes.Beta_Joints.geometry}
            material={materials.Beta_Joints_MAT1}
            skeleton={nodes.Beta_Joints.skeleton}
          />
          <skinnedMesh
            name="Beta_Surface"
            geometry={nodes.Beta_Surface.geometry}
            material={materials.Beta_HighLimbsGeoSG3}
            skeleton={nodes.Beta_Surface.skeleton}
          />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload("./3dmodels/mannequin.glb")

function usePrevious(value) {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = useRef()
  // Store current value in ref
  useEffect(() => {
    ref.current = value
  }, [value]) // Only re-run if value changes
  // Return previous value (happens before update in useEffect above)
  return ref.current
}
