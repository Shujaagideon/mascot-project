/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import tex from '../assets/productionText.png';
import tex2 from '../assets/productionTextOutline.png';
import { editable as e } from "@theatre/r3f";
import { types as t } from "@theatre/core";
import React from 'react';

const ProductionText = ({sheet}) => {
    const ref = React.useRef();
    const texture = useLoader(THREE.TextureLoader, tex);
    const texture2 = useLoader(THREE.TextureLoader, tex2);
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
                if(child.material.map){
                    child.material.map.offset.x = 1 -( a * 0.02);
                }
            }
            else{
                if(child.material.map){
                    child.material.map.offset.x = a * 0.02;
                }
            }
        });
      })

  return (
    <e.group theatreKey='productionTextGroup' ref={ref}>
        <mesh position={[0, 20, -25]}>
            <planeGeometry args={[100,12]}/>
            <meshBasicMaterial map={texture2.clone()} transparent depthWrite={false}/>
        </mesh>
        <mesh position={[0, 10, -25]}>
            <planeGeometry args={[100,12]}/>
            <meshBasicMaterial map={texture2.clone()} transparent depthWrite={false}/>
        </mesh>
        <mesh position={[0, 0, -25]}>
            <planeGeometry args={[100,12]}/>
            <meshBasicMaterial map={texture2.clone()} transparent depthWrite={false}/>
        </mesh>
        <mesh position={[0, -10, -25]}>
            <planeGeometry args={[100,12]}/>
            <meshBasicMaterial map={texture} transparent depthWrite={false}/>
        </mesh>
        <mesh position={[0, -20, -25]}>
            <planeGeometry args={[100,12]}/>
            <meshBasicMaterial map={texture2.clone()} transparent depthWrite={false}/>
        </mesh>
        <mesh position={[0, -30, -25]}>
            <planeGeometry args={[100,12]}/>
            <meshBasicMaterial map={texture2} transparent depthWrite={false}/>
        </mesh>
        <mesh position={[0, 0, -35]}>
            <planeGeometry args={[140,100]}/>
            <meshBasicMaterial color='#2a2a2a' transparent depthWrite={false}/>
        </mesh>
    </e.group>
  )
}

export default ProductionText