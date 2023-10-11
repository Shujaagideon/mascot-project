/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import * as THREE from 'three';
import vidTex from '../assets/introVid3.mp4';
import {editable as e} from "@theatre/r3f";
import { types as t } from "@theatre/core";
import React, { useEffect } from "react";
import gsap from "gsap";
import { Suspense } from "react";

const IntroText = ({sheet}) => {
  const { gl } = useThree();
  const ref = React.useRef(null);
  let factor = {value:0};

  const [video] = React.useState(() => {
    const vid = document.createElement("video");
    vid.src = vidTex;
    vid.crossOrigin = "Anonymous";
    // vid.loop = true;
    vid.muted = true;
    // vid.currentTime = factor.value;
    // vid.play();
    
    return {tex: new THREE.VideoTexture(vid), vid};
  });



  const mascotMat = sheet.object('circlesMat',{
    opacity: t.number(1, {
      nudgeMultiplier: 0.1,
      range: [0, 1]
    }),
    factor: t.number(0, {
      nudgeMultiplier: 1.,
      range: [0, 4.245313]
    }),
  },{reconfigure: true});

  React.useEffect(()=>{
    let fa = 0;
    mascotMat.onValuesChange(val=>{
      ref.current.opacity = val.opacity;
      video.tex.needsUpdate = true
      factor.value = val.factor
      // if(factor.value !== fa && factor.value >= fa){
      //   video.vid.play();
      //   setTimeout(()=>{
      //     fa = factor.value
      //     video.vid.pause();
      //   }, factor.value * 10)
      // }
      // else if(factor.value !== fa && factor.value < fa){
      //   video.vid.play();
      //   setTimeout(()=>{
      //     fa = factor.value
      //     video.vid.pause();
      //   }, factor.value * 10)
      // }
    })
  },[factor, mascotMat, video.tex])

  return (
    <group>
      <e.mesh theatreKey='text2' position={[0,0, -21]}>
          <planeGeometry args={[75, 45]}/>
          <Suspense fallback={null}>
            <VideoMaterial url={video.tex} re={ref}/>
          </Suspense>
      </e.mesh>
    </group>
  )
}

export default IntroText

function VideoMaterial({ url, re }) {
  return <meshBasicMaterial ref={re} transparent map={url} toneMapped={false} />
}

// function FallbackMaterial({ url }) {
//   const texture = useTexture(url)
//   return <meshBasicMaterial map={texture} toneMapped={false} />
// }