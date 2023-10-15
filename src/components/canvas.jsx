/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Circle, Environment, Loader, Scroll, ScrollControls, SoftShadows, Sparkles, useScroll } from "@react-three/drei";
import { getProject, val, types as t } from "@theatre/core";
import bgImg from '../assets/Background.jpg'
import * as THREE from 'three'
import sceneState from '../assets/state4.json'

import {
  SheetProvider,
  useCurrentSheet,
  editable as e,
} from "@theatre/r3f";
import { Mascot } from "./Mascot";
import IntroText from "./introText";
import FallingTexts from "./fallingTexts";
import RotatingText from "./rotatingText";
import ProductionText from "./productionText";
import Planets from "./planets";
import { EffectComposer, GodRays, N8AO, Noise } from "@react-three/postprocessing";
import { BlendFunction, KernelSize } from "postprocessing";
import React, { forwardRef } from "react";
import People from "./mascotPeople";

const Sun = forwardRef(function Sun(props, forwardRef) {
  // const { value: sunColor } = useControls('sun color', { value: '#FF0000' })

  return (
    <Circle args={[10, 10]} ref={forwardRef} position={[0, 0, -16]} {...props}>
      <meshBasicMaterial />
    </Circle>
  )
})

export default function R3fCanvas() {
  const sheet = getProject("New Scene", {
    // state: sceneState
  }).sheet("Scene");
  const [material, set] = React.useState(new THREE.Mesh());
  const [enablePost, setPost] = React.useState(true);
  

  return (
    <>
      <Canvas
        gl={{outputColorSpace: THREE.SRGBColorSpace}}
        shadows
        camera={{position:[0, 0, 8], fov: 65, near: 0.1, far: 500}}
      >
        <SoftShadows size={25} samples={10} />
        <ScrollControls pages={30} damping={.9} >
          <SheetProvider sheet={sheet}>
            <Scene sunRef={material} setPost={setPost}/>
          </SheetProvider>
        </ScrollControls>
        {/* <Environment preset="city" resolution={512} blur={1} /> */}
        {/* {enablePost ? 
          <EffectComposer disableNormalPass multisampling={4}>
           
            <GodRays
              sun={material}
              blendFunction={BlendFunction.Screen} // The blend function of this effect.
              samples={100} // The number of samples per pixel.
              density={0.6} // The density of the light rays.
              decay={0.9} // An illumination decay factor.
              weight={0.4} // A light ray weight factor.
              exposure={0.6} // A constant attenuation coefficient.
              clampMax={1} // An upper bound for the saturation of the overall effect.
              // width={Resizer.AUTO_SIZE} // Render width.
              // height={Resizer.AUTO_SIZE} // Render height.
              kernelSize={KernelSize.SMALL} // The blur kernel size. Has no effect if blur is disabled.
              blur={true} // Whether the god rays should be blurred to reduce artifacts.
            />
          </EffectComposer>: null
        } */}
      </Canvas>
      <Loader/>
    </>
  );
}



function Scene({sunRef, setPost}) {
  // const { scene } = useThree();

  const texture = useLoader(THREE.TextureLoader, bgImg);
  texture.colorSpace = THREE.SRGBColorSpace;

  const sheet = useCurrentSheet();
  const material = new THREE.MeshStandardMaterial({
    transparent:true,
  })
  const mascotMat = sheet.object('MascotMat',{
    opacity: t.number(0, {
      nudgeMultiplier: 0.1,
      range: [0, 1]
    })
  },{reconfigure: true});

  mascotMat.onValuesChange(val=>{
    material.opacity = val.opacity
  })

  const scroll = useScroll();
  let time = {value: 0};

  // our callback will run on every animation frame
  useFrame((state) => {
    // console.log(mascotMat)
    // the length of our sequence
    time.value = state.clock.elapsedTime;
    // console.log(state.clock.elapsedTime)
    const sequenceLength = val(sheet.sequence.pointer.length);
    // update the "position" of the playhead in the sequence, as a fraction of its whole length
    sheet.sequence.position = scroll.offset * sequenceLength;
  });

  // const bgColor = "#84a4f4";

  return (
    <>
      <Scroll html>
      </Scroll>
      <Mascot material={material} sheet={sheet} setPost={setPost}></Mascot>
      {/* <e.mesh theatreKey="sun" ref={sunRef} position={[0, 0, 0]}>
          <planeGeometry args={[6,3]}/>
          <meshBasicMaterial />
      </e.mesh> */}
      <e.ambientLight theatreKey="ambientLight" intensity={1.} />
      <e.directionalLight castShadow theatreKey='directionalLight' position={[-5, 5, -5]} intensity={20.5} />
      <e.mesh theatreKey='Background' position={[0, 0, -100]}>
        <planeGeometry args={[78, 39]} />
        <meshStandardMaterial map={texture}/>
      </e.mesh>
      <IntroText sheet={sheet}/>
      <FallingTexts sheet={sheet}/>
      <RotatingText sheet={sheet}/>
      <ProductionText sheet={sheet}/>
      <Planets sheet={sheet}/>
      <People sheet={sheet}/>
      
      {/* <Mouse/> */}
      <Sparkles
            count={200}
            size={2}
            speed={0.3}
            opacity={1}
            scale={15}
            color="#ffb5f3"
          />
    </>
  );
}

