/* eslint-disable react/no-unknown-property */
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import tex from '../assets/texts2.png';
import { editable as e } from "@theatre/r3f";
import { types as t } from "@theatre/core";
import React from 'react';

const FallingTexts = ({sheet}) => {
    const ref = React.useRef();
    const texture = new THREE.TextureLoader().load(tex);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;

    const mascotMat = sheet.object('fallingTextMat',{
        opacity: t.number(0, {
            nudgeMultiplier: 0.1,
            range: [0, 1]
        }),
    },{reconfigure: true});
    
    React.useEffect(()=>{
    mascotMat.onValuesChange(val=>{
        ref.current.opacity = val.opacity;
    })
    },[mascotMat])
    
    useFrame(({clock})=>{
        const a = clock.getElapsedTime();
        texture.offset.y = a * 0.25;
      })

  return (
    <e.mesh theatreKey='fallingText' position={[0, 0, -35]}>
        <planeGeometry args={[100,100]}/>
        <meshBasicMaterial ref={ref} map={texture} transparent depthWrite={false}/>
    </e.mesh>
  )
}

export default FallingTexts