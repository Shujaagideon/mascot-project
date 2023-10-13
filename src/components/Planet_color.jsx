/* eslint-disable react/no-unknown-property */
/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.3 planet_color.glb --transform
*/

import React from 'react'
import { useGLTF } from '@react-three/drei'
import { editable as e } from "@theatre/r3f";
import { types as t } from "@theatre/core";
import * as THREE from 'three';

export function PlanetColor({opacity}) {
  const { nodes, materials } = useGLTF('/planet_color-transformed.glb');
  
  React.useEffect(()=>{
      materials['Mat.001'].transparent = true;
      materials['Mat.001'].opacity = opacity;
      materials['Mat.001'].color = new THREE.Color('#fff');
  },[opacity])
  return (
    <e.group theatreKey='planet_color' dispose={null}>
      <mesh geometry={nodes.Sphere.geometry} material={materials['Mat.001']} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
    </e.group>
  )
}

useGLTF.preload('/planet_color-transformed.glb')
