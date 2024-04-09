/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import * as THREE from 'three';
import {editable as e} from "@theatre/r3f";
import { types as t } from "@theatre/core";
import React from "react";
import { Suspense } from "react";

const myImgs = [];

for(let i=1; i< 53; i++){
  myImgs.push(`/mascotPeople/out_${i}.jpg`)
}

const textures = [];
const textureLoader = new THREE.TextureLoader();

myImgs.forEach((url) => {
  const texture = textureLoader.load(url);
  texture.colorSpace = THREE.SRGBColorSpace;
  textures.push(texture);
});

const People = ({sheet}) => {
  const ref = React.useRef(null);

  const mascotMat = sheet.object('peopleMascotMaterial',{
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

      const index = Math.trunc(val.factor * (textures.length - 1));

      ref.current.map = textures[index];
      // ref.current.needsUpdate = true;
    });
  },[mascotMat])

  return (
    <group>
      <e.mesh theatreKey='peopleMascot' position={[0,0, -21]}>
          <planeGeometry args={[75, 45]}/>
          <Suspense fallback={null}>
            <meshStandardMaterial ref={ref} depthWrite={false} depthTest={false} transparent map={textures[0]} toneMapped={false} />
          </Suspense>
      </e.mesh>
    </group>
  )
}

export default People
