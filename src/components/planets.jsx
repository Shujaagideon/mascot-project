/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import React from 'react'
import tex from '../assets/beam.png';
import tex3 from '../assets/planets1.png';
import tex2 from '../assets/circle.png';
import { editable as e } from "@theatre/r3f";
import { types as t } from "@theatre/core";
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { PlanetColor } from './Planet_color';
import { Moon } from './Moon';

const Planets = ({sheet, project, mascot, beam}) => {
    const ref = React.useRef();
    const ref2 = React.useRef();
    const ref3 = React.useRef();
    const ref4 = React.useRef();
    const ref5 = React.useRef();
    const refBeam = React.useRef();
    const geomRef = React.useRef();

    const [opacity, setOpacity] = React.useState(0);
    const texture = useLoader(THREE.TextureLoader, tex);
    texture.colorSpace = THREE.SRGBColorSpace;

    const texture2 = useLoader(THREE.TextureLoader, tex2);
    texture2.colorSpace = THREE.SRGBColorSpace;

    const texture3 = useLoader(THREE.TextureLoader, tex3);
    // texture3.colorSpace = THREE.SRGBColorSpace;

    

    const mascotMat = sheet.object('planetsTextMat',{
        opacity: t.number(0, {
            nudgeMultiplier: 0.1,
            range: [0, 1]
        }),
        radius: t.number(1, {
            nudgeMultiplier: 0.1,
            range: [0, 10]
        }),
    },{reconfigure: true});
    
    React.useEffect(()=>{
        mascotMat.onValuesChange(val=>{
            setOpacity(val.opacity)
            // ref.current.opacity = val.opacity;
            // ref2.current.opacity = val.opacity;
            // ref3.current.opacity = val.opacity;
            ref4.current.opacity = val.opacity;
            ref5.current.opacity = val.opacity;

            // geomRef.current.radius = val.radius
            // geomRef.current.needsupdate = true
            // console.log(geomRef.current.radius)

        })
    },[mascotMat])

  return (
    <group>
        {/* <e.mesh theatreKey='planetsBg' position={[0, -20, -35]}>
            <sphereGeometry args={[35,30, 30]}/>
            <meshStandardMaterial ref={ref} color='#0D0D0D' transparent depthWrite={false}/>
        </e.mesh> */}
        
        {/* <e.spotLight theatreKey='planetsLight' position={[0, 0, -30]}/> */}
        {/* <e.mesh theatreKey='planetsBg2' position={[0, -25, -25]}>
            <sphereGeometry ref={geomRef} args={[25,20, 30]}/>
            <meshStandardMaterial ref={ref2} color='#0b0b0b' transparent depthWrite={false} depthTest={false}/>
        </e.mesh> */}

        <e.mesh theatreKey='cirlce' position={[0, -25, -25]}>
            <torusGeometry args={[3.786, 2.4552, 2, 30, 6.283185307179586]}/>
            <meshBasicMaterial color='#9988A8' ref={ref4} transparent depthWrite={false} depthTest={false}/>
        </e.mesh>
        <e.mesh theatreKey='cirlceBg' position={[0, -25, -25]}>
            <planeGeometry args={[1,1]}/>
            <meshBasicMaterial map={texture3} ref={ref5} transparent depthWrite={false} depthTest={false}/>
        </e.mesh>
        <PlanetColor opacity={opacity} sheet={sheet} beam={beam} mascot={mascot}/>
        <Moon sheet={sheet} pos={0} beam={beam} mascot={mascot} project={project} opacity={opacity} name='moon'/>
        <Moon sheet={sheet} pos={1} beam={beam} mascot={mascot} project={project} opacity={opacity} name='moon1'/>
        <Moon sheet={sheet} pos={2} beam={beam} mascot={mascot} project={project} opacity={opacity} name='moon2'/>
        <Moon sheet={sheet} pos={3} beam={beam} mascot={mascot} project={project} opacity={opacity} name='moon3'/>
    </group>
    
  )
}

export default Planets