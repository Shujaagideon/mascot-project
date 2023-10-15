/* eslint-disable react/no-unknown-property */
/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.3 moon.glb --transform
*/

import React from 'react'
import { useGLTF } from '@react-three/drei'
import { editable as e } from "@theatre/r3f";
import { types as t } from "@theatre/core";
import { useFrame } from '@react-three/fiber';
// import * as THREE from 'three';

export function Moon({name, opacity}) {
  const { nodes, materials } = useGLTF('/moon-transformed.glb');
  const ref = React.useRef();

  useFrame(()=>{
    ref.current.rotation.z += 0.008
  })

  const hello = ()=>{
    console.log('wooooohhhhooooooo');
  }

  React.useEffect(()=>{
    materials['Mat.002'].transparent = true;
    materials['Mat.002'].opacity = opacity;
  },[opacity])
  return (
    <e.group theatreKey={name} dispose={null} onPointerEnter={()=>hello()}>
      <mesh ref={ref} geometry={nodes.Sphere.geometry} material={materials['Mat.002']} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
    </e.group>
  )
}

useGLTF.preload('/moon-transformed.glb')
