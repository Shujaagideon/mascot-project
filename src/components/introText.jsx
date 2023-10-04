/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { useLoader } from "@react-three/fiber";
import * as THREE from 'three';
import textImg from '../assets/textIntro.png'
import titleImg from '../assets/title.png'
import circleImg from '../assets/circle.png'
import {editable as e} from "@theatre/r3f";
import { types as t } from "@theatre/core";
import React from "react";

// Create a shader material with GLSL noise
const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  uniform sampler2D uTexture;
  uniform sampler2D uTexture2;
  uniform float factor;
  uniform float alphaValue;
  
  void main() {
    vec4 val1 = texture2D(uTexture, vUv);
    vec4 val2 = texture2D(uTexture2, vUv);
    gl_FragColor = mix(val1, val2, factor);
    gl_FragColor.a = alphaValue;

    if(gl_FragColor.r < 0.05)discard;
  }
`;

const IntroText = ({sheet}) => {
  const ref = React.useRef();
  const refShader = React.useRef();
  const texture = useLoader(THREE.TextureLoader, circleImg);
  const texture1 = useLoader(THREE.TextureLoader, textImg);
  const texture2 = useLoader(THREE.TextureLoader, titleImg);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture1.colorSpace = THREE.SRGBColorSpace;
  texture2.colorSpace = THREE.SRGBColorSpace;

  const uniforms ={
    factor:{value: 0},
    alphaValue:{value: 1},
    uTexture:{value: texture1},
    uTexture2:{value: texture2},
  }


  const mascotMat = sheet.object('circlesMat',{
    opacity: t.number(1, {
      nudgeMultiplier: 0.1,
      range: [0, 1]
    }),
    factor: t.number(0, {
      nudgeMultiplier: 0.1,
      range: [0, 1]
    }),
    shaderOpacity: t.number(1, {
      nudgeMultiplier: 0.1,
      range: [0, 1]
    }),
  },{reconfigure: true});

  React.useEffect(()=>{
    mascotMat.onValuesChange(val=>{
      ref.current.opacity = val.opacity;
      uniforms.factor.value = val.factor
      uniforms.alphaValue.value = val.shaderOpacity;
    })
  },[mascotMat])

  return (
    <group>
      <e.mesh theatreKey='circles' position={[0,0, -30]}>
          <planeGeometry args={[90, 90]}/>
          <meshBasicMaterial ref={ref} map={texture} transparent depthWrite={false}/>
      </e.mesh>
      <e.mesh theatreKey='text1' position={[0, 1, -21]}>
          <planeGeometry args={[70, 50]}/>
          <shaderMaterial ref={refShader} uniforms={uniforms} vertexShader={vertexShader} fragmentShader={fragmentShader} transparent depthWrite={false}/>
      </e.mesh>
      {/* <e.mesh theatreKey='text2' position={[0,0, -21]}>
          <planeGeometry args={[42, 40]}/>
          <meshBasicMaterial map={texture2} transparent depthWrite={false}/>
      </e.mesh>
      <e.mesh theatreKey='text3' position={[0,0, -21]}>
          <planeGeometry args={[42, 40]}/>
          <meshBasicMaterial map={texture2} transparent depthWrite={false}/>
      </e.mesh>
      <e.mesh theatreKey='text4' position={[0,0, -21]}>
          <planeGeometry args={[42, 40]}/>
          <meshBasicMaterial map={texture2} transparent depthWrite={false}/>
      </e.mesh>
      <e.mesh theatreKey='text5' position={[0,0, -21]}>
          <planeGeometry args={[42, 40]}/>
          <meshBasicMaterial map={texture2} transparent depthWrite={false}/>
      </e.mesh> */}
    </group>
  )
}

export default IntroText