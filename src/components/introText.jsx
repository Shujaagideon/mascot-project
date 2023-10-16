/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { useThree } from "@react-three/fiber";
import * as THREE from 'three';
import {editable as e} from "@theatre/r3f";
import { types as t } from "@theatre/core";
import React from "react";
import { Suspense } from "react";

const myImgs = [];
for(let i=1; i< 211; i++){
  if (i === 20 || i === 21 || i === 22 || i === 23){}else{
    myImgs.push(`/mascotIntro/out_${i}.jpg`)
  }
}

const IntroText = ({sheet}) => {
  const { gl } = useThree();
  const ref = React.useRef(null);
  let factor = {value:0};

  const textures = [];
  const textureLoader = new THREE.TextureLoader();

  myImgs.forEach((url) => {
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
    // console.log(images)
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
          <planeGeometry args={[75, 45, 100, 100]}/>
          <Suspense fallback={null}>
            <meshStandardMaterial ref={ref} transparent map={textures[0]} toneMapped={false} />
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