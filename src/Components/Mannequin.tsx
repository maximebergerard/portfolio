/* eslint-disable @typescript-eslint/ban-ts-comment */
/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.7 man.glb
*/

import { useEffect, useRef, useState } from "react"
import { useGLTF, useAnimations, Box } from "@react-three/drei"
import { animated, useSpring } from "@react-spring/three"
import * as THREE from "three"
import { useFrame } from "@react-three/fiber"

export default function Model() {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const mathRandom = Math.floor(Math.random() * 2)

  const group = useRef<THREE.Group>(null!)
  const [action, setAction] = useState("IdlePose")
  const [clicked, setClicked] = useState(false)
  const previousAction = usePrevious(action)
  // @ts-ignore
  const { nodes, materials, animations } = useGLTF("./3dmodels/mannequin.glb")
  const { actions } = useAnimations(animations, group)

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

  const { rotation } = useSpring({
    rotation:
      action === "FallingPose"
        ? [Math.PI / 2, -Math.PI, Math.PI / 2]
        : [Math.PI / 2, 0, Math.PI / 2],
    config: {
      duration: 1000,
    },
  })

  const handleClick = () => {
    if (action === "IdlePose") {
      setAction("FallingPose")
      setClicked(true)
    }
  }

  useFrame((_, delta) => {
    if (clicked) {
      group.current.position.y -= 25 * delta

      if (group.current.position.x <= 20 && group.current.position.y < 0) {
        group.current.position.x += 1 * delta
      }

      if (group.current.position.y < -20) {
        group.current.position.y = 60
        group.current.position.x = 10
        if (mathRandom === 0) {
          setAction("FallingPose2")
        } else if (mathRandom === 1) {
          setAction("FallingIdle")
        }
      }

      if (group.current.position.y > 0 && group.current.position.y < 0.5) {
        group.current.position.y = 0
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
      group.current.position.x += 3 * delta
    }
  })

  return (
    <group ref={group} dispose={null} position={[15.5, -0.05, -4]}>
      <group name="Scene">
        <animated.group
          name="Armature"
          // @ts-ignore
          rotation={rotation}
          scale={0.03}
        >
          <primitive object={nodes.mixamorig1Hips} />
          <skinnedMesh
            name="Ch36"
            geometry={nodes.Ch36.geometry}
            material={materials.Ch36_Body}
            skeleton={nodes.Ch36.skeleton}
            castShadow
          />
        </animated.group>
      </group>
      <Box
        args={[2, 5.3, 2]}
        position={[0, 2.7, 0]}
        onClick={handleClick}
        visible={false}
      />
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
