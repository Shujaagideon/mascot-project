/* eslint-disable react/no-unknown-property */
import { useFrame, useLoader } from '@react-three/fiber';
import React from 'react';
import * as THREE from 'three';
import tex from '../assets/approach.webp';

const vertexShader = /*glsl*/`
    uniform float time;
    varying vec2 vUv;

    float PI = 3.14159;

    void main() {
      vec3 pos = position;
      if (pos.x < -3.) {
        float dif1 = sin(pos.x * .2 + time) * 0.1;
        float dif2 = sin(pos.x * 1.0 + time) * 0.2;
        float dif3 = sin(pos.y * 0.8 + time) * 0.2;

        pos.z = dif1 + dif2 + dif3;
        pos.z = sin(pos.y * 1.2 + time * 0.2) * 0.2;
        // pos.y += sin(pos.x * 1.2 + time * 0.2) * 0.2;
      }

      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
`

const fragmentShader = /*glsl*/`
    uniform sampler2D uTexture;
    varying vec2 vUv;

    void main() {
      gl_FragColor = texture2D(uTexture, vUv);
      if(gl_FragColor.a < 0.9)discard;
    }
`

const Aboutmascot = () => {
    const texture = useLoader(THREE.TextureLoader, tex);
    texture.colorSpace = THREE.SRGBColorSpace;
    const uniforms = {
        uTexture: {value: texture},
        time:{value: 0}
    };

    useFrame(({clock})=>{
        uniforms.time.value = clock.getElapsedTime()
    })

  return (
    <mesh position={[-1,0,-1]}>
        <planeGeometry args={[20, 10, 200, 200]}/>
        <shaderMaterial uniforms={uniforms} vertexShader={vertexShader} fragmentShader={fragmentShader}/>
    </mesh>
  )
}

export default Aboutmascot