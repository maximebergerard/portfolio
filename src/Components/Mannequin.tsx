/* eslint-disable @typescript-eslint/ban-ts-comment */
/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.7 man.glb
*/

import { useEffect, useRef, useState } from "react"
import { useGLTF, useAnimations } from "@react-three/drei"
import {
  animated,
  useChain,
  useSpring,
  useSpringRef,
} from "@react-spring/three"
import * as THREE from "three"
import { useFrame } from "@react-three/fiber"

export default function Model() {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const group = useRef<THREE.Group>(null!)
  const [action, setAction] = useState("IdlePose")
  const previousAction = usePrevious(action)
  const mathRandom = Math.floor(Math.random() * 2)

  // @ts-ignore
  const { nodes, materials, animations } = useGLTF("./3dmodels/mannequin.glb")

  const { actions } = useAnimations(animations, group)
  const [clicked, setClicked] = useState(false)

  useEffect(() => {
    if (previousAction) {
      // @ts-ignore
      actions[previousAction].fadeOut(0.5)
      actions[action]?.stop()
    }
    // @ts-ignore
    actions[action].play()
    // @ts-ignore
    actions[action].fadeIn(0.5)

    const interval = setInterval(() => {
      if (action === "IdlePose") {
        setAction("WavePose")
        setTimeout(() => setAction("IdlePose"), 2000)
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [action, actions, previousAction])

  // const fallRotationRef = useSpringRef()
  const { rotation } = useSpring({
    // ref: fallRotationRef,
    rotation:
      action === "FallingPose"
        ? [Math.PI / 2, -Math.PI, Math.PI / 2]
        : [Math.PI / 2, 0, Math.PI / 2],
    config: {
      duration: 1000,
    },
  })

  useFrame(() => {
    if (clicked) {
      group.current.position.y -= 0.25

      if (group.current.position.x <= 20 && group.current.position.y < 0) {
        group.current.position.x += 0.1
      }

      if (group.current.position.y < -20) {
        group.current.position.y = 30
        group.current.position.x = 10
        if (mathRandom === 0) {
          setAction("FallingPose2")
        } else if (mathRandom === 1) {
          setAction("FallingIdle")
        }
      }

      if (group.current.position.y === 0) {
        if (action === "FallingPose2") {
          setAction("FallingFlatImpact")
          setTimeout(() => setAction("StandingUp"), 800)
          setTimeout(() => {
            setAction("BackwardWalk")
          }, 3000)
          setTimeout(() => {
            setAction("IdlePose")
          }, 4800)
          setClicked(false)
        } else if (action === "FallingIdle") {
          setAction("FallingToLanding")
          setTimeout(() => {
            setAction("BackwardWalk")
          }, 600)
          setTimeout(() => {
            setAction("IdlePose")
          }, 2450)
          setClicked(false)
        }
      }
    } else if (action === "BackwardWalk") {
      group.current.position.x += 0.05
    }
  })

  return (
    <group ref={group} dispose={null} position={[15.5, -0.05, 0]}>
      <group name="Scene">
        <animated.group
          name="Armature"
          // @ts-ignore
          rotation={rotation}
          scale={0.03}
          //cursor="pointer"
          onClick={() => {
            if (action === "IdlePose") {
              setAction("FallingPose")
              setClicked(true)
            }
          }}
        >
          <primitive object={nodes.mixamorig1Hips} />
          <skinnedMesh
            name="Ch36"
            geometry={nodes.Ch36.geometry}
            material={materials.Ch36_Body}
            skeleton={nodes.Ch36.skeleton}
          />
        </animated.group>
      </group>
    </group>
  )
}

useGLTF.preload("./3dmodels/mannequin.glb")

function usePrevious(value: string) {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = useRef<string>("IdlePose")
  // Store current value in ref
  useEffect(() => {
    ref.current = value
  }, [value]) // Only re-run if value changes
  // Return previous value (happens before update in useEffect above)
  return ref.current
}
