/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { Circle, Loader, Scroll, ScrollControls, Sparkles, useScroll } from "@react-three/drei";
import { getProject, val, types as t } from "@theatre/core";
import bgImg from '../assets/Background.jpg'
import * as THREE from 'three'
import sceneState from '../assets/state9.json'

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
import React, { Suspense, forwardRef, useEffect, useRef, useState } from "react";
import People from "./mascotPeople";
import { Banner } from "./scrollingProjects";
import gsap from "gsap";


export default function R3fCanvas() {
  const loadingManager = new THREE.LoadingManager();
  const [progress, setProgress] = useState(0);
  const widthRef = useRef();
  const ref = useRef();

  loadingManager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
    setProgress(Math.round((itemsLoaded/itemsTotal) * 100));
  };
  
  useEffect(()=>{
    if(widthRef.current){
      widthRef.current.style.width = `${progress}%`;
    }

    if(progress === 100){
      gsap.to(ref.current,{
        opacity: 0,
        duration: 0.4,
        ease: 'Power.easeIn',
      })
    }
  },[progress])
  
  const project = getProject("New Scene", {
    state: sceneState
  })
  const sheet = project.sheet("Scene");

  const images = [
    "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80",
    "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80",
    "https://media.istockphoto.com/photos/the-main-attraction-of-paris-and-all-of-europe-is-the-eiffel-tower-in-picture-id1185953092?k=6&m=1185953092&s=612x612&w=0&h=SNiShskOfwQ7Sys5TX0eb5eBxHobktWUfZGrox5LMyk=",
    "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Ym9va3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
    "https://images.ctfassets.net/hrltx12pl8hq/3MbF54EhWUhsXunc5Keueb/60774fbbff86e6bf6776f1e17a8016b4/04-nature_721703848.jpg?fit=fill&w=480&h=270",
    "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
    "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"
  ].map((image) => ({
    id: crypto.randomUUID(),
    image
  }));


  return (
    <>
      {/* {progress < 101 && <div ref={ref} className="z-40 h-screen w-screen flex flex-col bg-zinc-900 text-zinc-100 justify-center items-center">
        <p>loading assets</p>
        <div className="flex mt-6 w-48 justify-between items-center">
          <div className="h-1 w-32 bg-zinc-700 rounded-sm">
            <div className={`h-full bg-zinc-200 rounded-sm`} ref={widthRef}></div>
          </div>
          <p>{progress} %</p>
        </div>
      </div>} */}
      <>
        <Canvas
          gl={{outputColorSpace: THREE.SRGBColorSpace}}
          camera={{position:[0, 0, 8], fov: 65, near: 0.1, far: 500}}
        >
          <ScrollControls pages={30} damping={.9} maxSpeed={0.2}>
            <SheetProvider sheet={sheet}>
              <Scene project={project} loadingManager={loadingManager}/>
            </SheetProvider>
            <Scroll html>
              <div>
                <div className="h-screen w-screen"></div>
                <div className="h-screen w-screen"></div>
                <div className="h-screen w-screen"></div>
                <div className="h-screen w-screen"></div>
                <div className="h-screen w-screen"></div>
                <div className="h-screen w-screen"></div>
                <div className="h-screen w-screen"></div>
                <div className="h-screen w-screen"></div>
                <div className="h-screen w-screen"></div>
                <div className="h-screen w-screen"></div>
                <div className="h-screen w-screen"></div>
                <div className="h-screen w-screen"></div>
                <div className="h-screen w-screen"></div>
                <div className="h-screen w-screen"></div>
                <div className="h-screen w-screen"></div>
                <div className="h-screen w-screen"></div>
                <div className="h-screen w-screen"></div>
                <div className="h-screen w-screen"></div>
                <div className="h-screen w-screen"></div>
                <div className="h-screen w-screen"></div>
                <div className="h-screen w-screen"></div>
                <div className="h-screen w-screen"></div>
                <div className="h-screen w-screen"></div>
                <div className="h-screen w-screen"></div>
                <div className="h-screen w-screen"></div>
                <div className="h-screen w-screen"></div>
                <div className="h-screen w-screen"></div>
                <div className="h-screen w-screen"></div>
                <div className="h-screen w-screen"></div>
                <div className="h-screen w-screen flex justify-center items-center">
                  <Banner images={images} speed={35000} />
                </div>
              </div>
            </Scroll>
          </ScrollControls>
        </Canvas>
        <Loader/>
      </>
    </>
  );
}



function Scene({project, loadingManager}) {
  const { gl } = useThree();
  const MascotRef = React.useRef();
  
  const data = useScroll();


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
  console.log("Number of Triangles :", gl.info.render.triangles);

  const scrollDown = ()=>{
    gsap.to(data,{
      offset: 1,
      duration: 0.3,
    })
  }

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


  return (
    <>
      <Mascot reference={MascotRef} material={material} sheet={sheet}></Mascot>
      <e.ambientLight theatreKey="ambientLight" intensity={1.} />
      <e.directionalLight castShadow theatreKey='directionalLight' position={[-5, 5, -5]} intensity={20.5} />
      <e.mesh theatreKey='Background' position={[0, 0, -100]}>
        <planeGeometry args={[78, 39]} />
        <meshStandardMaterial map={texture}/>
      </e.mesh>
      <IntroText sheet={sheet} loadingManager={loadingManager}/>
      <FallingTexts sheet={sheet}/>
      <RotatingText sheet={sheet}/>
      <ProductionText sheet={sheet}/>
      <Planets sheet={sheet} project={project} mascot={MascotRef}/>
      <People sheet={sheet} loadingManager={loadingManager}/>
      
      {/* <Sparkles
            count={200}
            size={2}
            speed={0.3}
            opacity={1}
            scale={15}
            color="#ffb5f3"
          /> */}
    </>
  );
}

