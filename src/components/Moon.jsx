/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.3 moon.glb --transform
*/

import React from 'react'
import { useGLTF } from '@react-three/drei'
import { editable as e } from "@theatre/r3f";
// import { types as t } from "@theatre/core";
import { useFrame } from '@react-three/fiber';
import gsap from 'gsap';
// import * as THREE from 'three';

export function Moon({name, pos, opacity, project, beam, mascot}) {
  const { nodes, materials } = useGLTF('/moon-transformed.glb');
  const ref = React.useRef();
  const num = -15.946048795792349;

  // const sheet = project.sheet(name);
  const configs = [
    {
      name: 'moon',
      mascot: 0.79,
      mascotPos: {
        x: 0.34,
        y: -5.96
      },
      beamRotation:-0.74,
      beamPos: {
        x:14.03,
        y:27.82
      },
      scale:{
        x: 0.43,
        y: 0.82
      }
    },
    {
      name: 'moon1',
      mascot: 1.135,
      mascotPos: {
        x: 1.816,
        y: -7.526
      },
      beamRotation: -1.25,
      beamPos: {
        x: 22.26,
        y: 20.27
      },
      scale:{
        x: 0.43,
        y: 0.94
      }
    },
    {
      name: 'moon2',
      mascot: -0.74,
      mascotPos: {
        x: -1.199,
        y: -4.82
      },
      beamRotation: 0.77,
      beamPos: {
        x: -13.96,
        y: 26.91
      },
      scale:{
        x: 0.43,
        y: 0.80
      }
    },
    {
      name: 'moon3',
      mascot: -1.17,
      mascotPos: {
        x: -3.869,
        y: -5.42
      },
      beamRotation: 1.26,
      beamPos: {
        x: -22.16,
        y: 19.83
      },
      scale:{
        x: 0.43,
        y: 0.94
      }
    }
  ]


  useFrame(()=>{
    ref.current.rotation.z += 0.008
  })

  const hello = ()=>{
    if (mascot.current.position.z > num || mascot.current.position.z < num){
      // mascot.current.rotation.z = 0;
      // beam.current.rotation.z = 0;
      // beam.current.position.x = 0
      // beam.current.position.y = 28.47;
      // beam.current.scale.x = 0.43;
      // beam.current.scale.y = 0.62;
    }
    else{
      gsap.fromTo(mascot.current.rotation,{
        z: mascot.current.rotation.z,
        duration: 0.3,
        ease: 'Power.easeOut'
      },
      {
        z: configs[pos].mascot,
        duration: 0.3,
        ease: 'Power.easeOut'
      }
      )
      gsap.fromTo(mascot.current.position,{
        x: mascot.current.position.x,
        y: mascot.current.position.y,
        duration: 0.3,
        ease: 'Power.easeOut'
      },
      {
        x: configs[pos].mascotPos.x,
        y: configs[pos].mascotPos.y,
        duration: 0.3,
        ease: 'Power.easeOut'
      }
      )
      // gsap.fromTo(beam.current.rotation,{
      //   z: beam.current.rotation.z,
      //   duration: 0.3,
      //   ease: 'Power.easeOut'
      // },
      // {
      //   z: configs[pos].beamRotation,
      //   duration: 0.3,
      //   ease: 'Power.easeOut'
      // })
      // gsap.fromTo(beam.current.position,{
      //   x: beam.current.position.x,
      //   y: beam.current.position.y,
      //   duration: 0.3,
      //   ease: 'Power.easeOut'
      // },{
      //   x: configs[pos].beamPos.x,
      //   y: configs[pos].beamPos.y,
      //   duration: 0.3,
      //   ease: 'Power.easeOut'
      // })
      // gsap.fromTo(beam.current.scale,{
      //   x: beam.current.scale.x,
      //   y: beam.current.scale.y,
      //   duration: 0.3,
      //   ease: 'Power.easeOut'
      // },{
      //   x: configs[pos].scale.x,
      //   y: configs[pos].scale.y,
      //   duration: 0.3
      // })
    }
    project.sheet("Scene").sequence.pause()

    // sheet.sequence.play()
  }

  React.useEffect(()=>{
    materials['Mat.001'].transparent = true;
    materials['Mat.001'].opacity = opacity;

  },[opacity])
  return (
    <e.group theatreKey={name} dispose={null} onPointerEnter={()=>hello()}>
      <e.pointLight theatreKey='beamPointLight'/>
      <mesh ref={ref} geometry={nodes.Sphere001.geometry} material={materials['Mat.001']} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
    </e.group>
  )
}

useGLTF.preload('/moon-transformed.glb')
