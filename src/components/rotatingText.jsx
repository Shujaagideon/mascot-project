/* eslint-disable react/no-unknown-property */
import {editable as e} from "@theatre/r3f";
import { types as t } from "@theatre/core";
import tex from '../assets/whiteLine.png';
import tex2 from '../assets/lineglobe.webp';
import * as THREE from 'three'
import React from "react";



const RotatingText = ({sheet}) => {
    const texture = new THREE.TextureLoader().load(tex);
    texture.colorSpace = THREE.SRGBColorSpace;
    const texture2 = new THREE.TextureLoader().load(tex2);
    texture.colorSpace = THREE.SRGBColorSpace;
    const ref = React.useRef();

    const mascotMat = sheet.object('rotatingTextMat',{
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

  return (
    <>
        <e.mesh theatreKey='rotatingText' position={[0, 0, -40]}>
            <planeGeometry args={[60,180]}/>
            <meshBasicMaterial ref={ref} map={texture} transparent depthWrite={false}/>
        </e.mesh>
    </>
  )
}

export default RotatingText