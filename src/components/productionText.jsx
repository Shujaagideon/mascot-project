/* eslint-disable react/no-unknown-property */
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import tex from '../assets/productionText.png';
import tex2 from '../assets/productionTextOutline.png';
import { editable as e } from "@theatre/r3f";
import { types as t } from "@theatre/core";
import React from 'react';

const ProductionText = ({sheet}) => {
    const ref = React.useRef();
    const texture = new THREE.TextureLoader().load(tex);
    const texture2 = new THREE.TextureLoader().load(tex2);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture2.colorSpace = THREE.SRGBColorSpace;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture2.wrapS = THREE.RepeatWrapping;
    texture2.wrapT = THREE.RepeatWrapping;

    const mascotMat = sheet.object('productionTextMat',{
        opacity: t.number(0, {
            nudgeMultiplier: 0.1,
            range: [0, 1]
        }),
    },{reconfigure: true});
    
    React.useEffect(()=>{
        mascotMat.onValuesChange(val=>{
            ref.current.children.forEach((child)=>{
                child.material.opacity = val.opacity;
            });
        })
    },[mascotMat])
    
    useFrame(({clock})=>{
        const a = clock.getElapsedTime();
        ref.current.children.forEach((child,i)=>{
            if((i%2) === 0){
                child.material.map.offset.x = 1 -( a * 0.08);
            }
            else{
                child.material.map.offset.x = a * 0.08;
            }
        });
      })

  return (
    <e.group theatreKey='productionTextGroup' ref={ref}>
        <e.mesh theatreKey='productionText1' position={[0, 20, -25]}>
            <planeGeometry args={[100,12]}/>
            <meshBasicMaterial map={texture2.clone()} transparent depthWrite={false}/>
        </e.mesh>
        <e.mesh theatreKey='productionText2' position={[0, 10, -25]}>
            <planeGeometry args={[100,12]}/>
            <meshBasicMaterial map={texture2.clone()} transparent depthWrite={false}/>
        </e.mesh>
        <e.mesh theatreKey='productionText3' position={[0, 0, -25]}>
            <planeGeometry args={[100,12]}/>
            <meshBasicMaterial map={texture2.clone()} transparent depthWrite={false}/>
        </e.mesh>
        <e.mesh theatreKey='productionText4' position={[0, -10, -25]}>
            <planeGeometry args={[100,12]}/>
            <meshBasicMaterial map={texture} transparent depthWrite={false}/>
        </e.mesh>
        <e.mesh theatreKey='productionText5' position={[0, -20, -25]}>
            <planeGeometry args={[100,12]}/>
            <meshBasicMaterial map={texture2.clone()} transparent depthWrite={false}/>
        </e.mesh>
        <e.mesh theatreKey='productionText6' position={[0, -30, -25]}>
            <planeGeometry args={[100,12]}/>
            <meshBasicMaterial map={texture2} transparent depthWrite={false}/>
        </e.mesh>
    </e.group>
  )
}

export default ProductionText