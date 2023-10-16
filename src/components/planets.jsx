/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import React from 'react'
import tex from '../assets/beam.png';
import { editable as e } from "@theatre/r3f";
import { types as t } from "@theatre/core";
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { PlanetColor } from './Planet_color';
import { Moon } from './Moon';

const Planets = ({sheet, project, mascot}) => {
    const ref = React.useRef();
    const ref2 = React.useRef();
    const ref3 = React.useRef();
    const refBeam = React.useRef();
    const [opacity, setOpacity] = React.useState(0);
    const texture = useLoader(THREE.TextureLoader, tex);
    texture.colorSpace = THREE.SRGBColorSpace;

    
    // texture.wrapS = THREE.RepeatWrapping;
    // texture.wrapT = THREE.RepeatWrapping;

    const mascotMat = sheet.object('planetsTextMat',{
        opacity: t.number(0, {
            nudgeMultiplier: 0.1,
            range: [0, 1]
        }),
    },{reconfigure: true});
    
    React.useEffect(()=>{
        mascotMat.onValuesChange(val=>{
            setOpacity(val.opacity)
            ref.current.opacity = val.opacity;
            ref2.current.opacity = val.opacity;
            ref3.current.opacity = val.opacity;
        })
    },[mascotMat])
    
    useFrame(()=>{
        // const a = clock.getElapsedTime();
        // texture.offset.y = a * 0.25;
    })

  return (
    <group>
        <e.mesh theatreKey='planetsBg' position={[0, -20, -35]}>
            <sphereGeometry args={[35,50, 50]}/>
            <meshStandardMaterial ref={ref} color='#0D0D0D' transparent depthWrite={false}/>
        </e.mesh>
        <group position={[0, -20, -35]}>
            <e.mesh theatreKey='planetsBeam' ref={refBeam} scale={[0.43, 0.62, 0]} position={[0, 28.47, 10.21]}>
                <planeGeometry args={[15,50]}/>
                <meshBasicMaterial ref={ref3} map={texture} transparent depthWrite={false}/>
            </e.mesh>
        </group>
        <e.spotLight theatreKey='planetsLight' position={[0, 0, -30]}/>
        <e.mesh theatreKey='planetsBg2' position={[0, -25, -25]}>
            <sphereGeometry args={[25,50, 50]}/>
            <meshStandardMaterial ref={ref2} color='#0b0b0b' transparent depthWrite={false} depthTest={false}/>
        </e.mesh>
        <PlanetColor opacity={opacity} sheet={sheet}/>
        <Moon sheet={sheet} pos={0} beam={refBeam} mascot={mascot} project={project} opacity={opacity} name='moon'/>
        <Moon sheet={sheet} pos={1} beam={refBeam} mascot={mascot} project={project} opacity={opacity} name='moon1'/>
        <Moon sheet={sheet} pos={2} beam={refBeam} mascot={mascot} project={project} opacity={opacity} name='moon2'/>
        <Moon sheet={sheet} pos={3} beam={refBeam} mascot={mascot} project={project} opacity={opacity} name='moon3'/>
    </group>
    
  )
}

export default Planets