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
import output1 from '../assets/output_0001.jpg'
import output2 from '../assets/output_0002.jpg'
import output3 from '../assets/output_0003.jpg'
// import output4 from '../assets/output_0004.jpg'
import output5 from '../assets/output_0005.jpg'
import output6 from '../assets/output_0006.jpg'
import output7 from '../assets/output_0007.jpg'
import output8 from '../assets/output_0008.jpg'
import output9 from '../assets/output_0009.jpg'
import output10 from '../assets/output_0010.jpg'
import output11 from '../assets/output_0011.jpg'
import output12 from '../assets/output_0012.jpg'
import output13 from '../assets/output_0013.jpg'
import output14 from '../assets/output_0014.jpg'
import output15 from '../assets/output_0015.jpg'
import output16 from '../assets/output_0016.jpg'
import output17 from '../assets/output_0017.jpg'
import output18 from '../assets/output_0018.jpg'
import output19 from '../assets/output_0019.jpg'
import output20 from '../assets/output_0020.jpg'
import output21 from '../assets/output_0021.jpg'
import output22 from '../assets/output_0022.jpg'
import output23 from '../assets/output_0023.jpg'
import output24 from '../assets/output_0024.jpg'
import output25 from '../assets/output_0025.jpg'
import output26 from '../assets/output_0026.jpg'
import output27 from '../assets/output_0027.jpg'
import output28 from '../assets/output_0028.jpg'
import output29 from '../assets/output_0029.jpg'
import output30 from '../assets/output_0030.jpg'
import output31 from '../assets/output_0031.jpg'
import output32 from '../assets/output_0032.jpg'
import output33 from '../assets/output_0033.jpg'
import output34 from '../assets/output_0034.jpg'
import output35 from '../assets/output_0035.jpg'
import output36 from '../assets/output_0036.jpg'
import output37 from '../assets/output_0037.jpg'
import output38 from '../assets/output_0038.jpg'
import output39 from '../assets/output_0039.jpg'
import output40 from '../assets/output_0040.jpg'
import output41 from '../assets/output_0041.jpg'
import output42 from '../assets/output_0042.jpg'
import output43 from '../assets/output_0043.jpg'

const IntroText = ({sheet}) => {
  const { gl } = useThree();
  const ref = React.useRef(null);
  let factor = {value:0};

  const textureUrls = [
      output1,
      output2,
      output3,
      // output4,
      output5,
      output6,
      output7,
      output8,
      output9,
      output10,
      output11,
      output12,
      output13,
      output14,
      output15,
      output16,
      output17,
      output18,
      output19,
      output20,
      output21,
      output22,
      output23,
      output24,
      output25,
      output26,
      output27,
      output28,
      output29,
      output30,
      output31,
      output32,
      output33,
      output34,
      output35,
      output36,
      output37,
      output38,
      output39,
      output40,
      output41,
      output42,
      output43,
  ];

  const textures = [];
  const textureLoader = new THREE.TextureLoader();

  textureUrls.forEach((url) => {
    const texture = textureLoader.load(url);
    texture.colorSpace = THREE.SRGBColorSpace;
    textures.push(texture);
  });

  const mascotMat = sheet.object('circlesMat',{
    opacity: t.number(1, {
      nudgeMultiplier: 0.1,
      range: [0, 1]
    }),
    factor: t.number(0, {
      nudgeMultiplier: .1,
      range: [0, 1]
    }),
  },{reconfigure: true});

  React.useEffect(()=>{
    mascotMat.onValuesChange(val=>{
      ref.current.opacity = val.opacity;

      const index = Math.floor(val.factor * (textures.length - 1));

      ref.current.map = textures[index];
      ref.current.needsUpdate = true;
    });
  },[factor, mascotMat])

  return (
    <group>
      <e.mesh theatreKey='text2' position={[0,0, -21]}>
          <planeGeometry args={[75, 45]}/>
          <Suspense fallback={null}>
            <meshBasicMaterial ref={ref} transparent map={textures[0]} toneMapped={false} />
          </Suspense>
      </e.mesh>
    </group>
  )
}

export default IntroText


// function FallbackMaterial({ url }) {
//   const texture = useTexture(url)
//   return <meshBasicMaterial map={texture} toneMapped={false} />
// }