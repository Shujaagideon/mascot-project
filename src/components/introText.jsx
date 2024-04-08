/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import * as THREE from 'three';
import {editable as e} from "@theatre/r3f";
import { types as t } from "@theatre/core";
import React from "react";
import gsap from "gsap";
import { useProgress } from "@react-three/drei";

const myImgs = [];
for(let i=1; i< 51; i++){
  myImgs.push(`/mascotIntro/outer_${i}.jpg`)
  // if (i === 39 || i === 40 || i === 41 || i === 42 ||i === 43 ||i === 44 || i === 45 || i === 46){ /* empty */ }else{
  // }
}

const textures = [];
const textureLoader = new THREE.TextureLoader();
myImgs.forEach((url) => {
  const texture = textureLoader.load(url);
  texture.colorSpace = THREE.SRGBColorSpace;
  textures.push(texture);
});

const IntroText = ({sheet}) => {
  // const { gl } = useThree();
  const ref = React.useRef(null);
  // let factor = {value:0};
  const { progress:loaded } = useProgress()

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
    // mascotMat.onValuesChange(val=>{
    //   ref.current.opacity = val.opacity;

    //   const index = Math.floor(val.factor * (textures.length - 1));

    //   ref.current.map = textures[index];
    //   ref.current.needsUpdate = true;
    // });
  },[mascotMat]);


  React.useEffect(()=>{
    // console.log(images)
    if(loaded == 100){
      gsap.to(ref.current,{
        opacity: 1,
        duration: 1,
        ease: 'sine.inOut',
        onComplete:()=>{
          mascotMat.onValuesChange(val=>{
              ref.current.opacity = val.opacity;
        
              const index = Math.trunc(val.factor * (textures.length - 1));
        
              ref.current.map = textures[index];
              // ref.current.needsUpdate = true;
            });
        }
      })
    }
  },[loaded, mascotMat])

  return (
    <group>
      <e.mesh theatreKey='text2' position={[0,0, -21]}>
          <planeGeometry args={[75, 45]}/>
          {/* <Suspense fallback={null}> */}
            <meshStandardMaterial ref={ref} depthWrite={false} depthTest={false} opacity={0} transparent map={textures[0]} toneMapped={false} />
          {/* </Suspense> */}
      </e.mesh>
    </group>
  )
}

export default IntroText


// function FallbackMaterial({ url }) {
//   const texture = useTexture(url)
//   return <meshBasicMaterial map={texture} toneMapped={false} />
// }