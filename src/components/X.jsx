/* eslint-disable react/no-unknown-property */
/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.3 x.glb --transform
*/

// import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import React from 'react'
import tex from '../assets/x1.png';
import { editable as e } from "@theatre/r3f";
import { types as t } from "@theatre/core";
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';

export function ModelX() {
  const { nodes, materials } = useGLTF('/x-transformed.glb');
  const loader = new THREE.TextureLoader()

  const texture = loader.load(tex);
  texture.colorSpace = THREE.SRGBColorSpace;

//   const mascotMat = sheet.object('planetsTextMat',{
//     opacity: t.number(0, {
//         nudgeMultiplier: 0.1,
//         range: [0, 1]
//     }),
//     radius: t.number(1, {
//         nudgeMultiplier: 0.1,
//         range: [0, 10]
//     }),
// },{reconfigure: true});

// React.useEffect(()=>{
//   // mascotMat.onValuesChange(val=>{

//   // })
// },[mascotMat])

  return (
    <e.group theatreKey='X-logo' dispose={null}>
      <mesh>
        <planeGeometry args={[3.5,3]}/>
        <meshBasicMaterial map={texture} transparent/>
      </mesh>
    </e.group>
  )
}

