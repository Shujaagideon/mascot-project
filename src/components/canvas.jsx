/* eslint-disable no-useless-escape */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { Circle, Loader, Scroll, ScrollControls, Sparkles, useScroll } from "@react-three/drei";
import { getProject, val, types as t } from "@theatre/core";
import bgImg from '../assets/Background.jpg'
import * as THREE from 'three'
import sceneState from '../assets/state2.json'
import mobileState from '../assets/mobileState.json'

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
import React, { Suspense, useEffect, useRef, useState } from "react";
import People from "./mascotPeople";
import { Banner } from "./scrollingProjects";
import gsap from "gsap";
import { useStore } from "../App";
import Project from "./project";
import { ModelX } from "./X";


export default function R3fCanvas() {
  const loadingManager = new THREE.LoadingManager();
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const widthRef = useRef();
  const ref = useRef();
  const projectRef = useRef();

  loadingManager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
    setProgress(Math.round((itemsLoaded/itemsTotal) * 100));
  };

  
  useEffect(()=>{
    projectRef.current.style.visibility = 'hidden';
    projectRef.current.style.opacity = 0;
  },[])
  useEffect(()=>{
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) setIsMobile(true);})(navigator.userAgent||navigator.vendor||window.opera);
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
    // window.
  },[progress])
  
  const project1 = getProject("New Scene", {
    state: mobileState
  })
  const project2 = getProject("New Scene2", {
    state: sceneState
  })
  const sheet = isMobile ? project1.sheet("Scene") : project2.sheet("Scene") 

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
      <Suspense fallback={<Loader/>}>
        <div ref={projectRef} className="fixed z-40 top-0 bg-black left-0 h-screen w-screen">
          <div className="relative w-full h-full">
            <Project projectRef={projectRef}/>
          </div>
        </div>
        <Canvas
          gl={{outputColorSpace: THREE.SRGBColorSpace}}
          camera={{position:[0, 0, 8], fov: 65, near: 0.1, far: 500}}
        >
          <ScrollControls eps={0.000001} pages={10} damping={1.8} maxSpeed={40}>
            <SheetProvider sheet={sheet}>
              <Scene project={isMobile ? project1 : project2} loadingManager={loadingManager}/>
            </SheetProvider>
            <Scroll html>
                {/* <div className="h-screen w-screen"></div>
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
                <div className="h-screen w-screen"></div> */}
                {/* <div className="h-screen w-screen flex justify-center items-center">
                  <Banner images={images} projectRef={projectRef} speed={60000} />
                </div> */}
            </Scroll>
          </ScrollControls>
        </Canvas>
      </Suspense>
    </>
  );
}

const shader = new THREE.ShaderMaterial({
  uniforms:{
    opacity:{value: 1.},
  },
  transparent: true,
  vertexShader: /* glsl */`
    varying vec3 vNormal;
    varying vec3 vLightPos;
    varying vec3 vPosition;
    varying vec2 vUv;
  
    void main() {
      vUv = uv;
      vNormal = normal;
      vPosition = position;
      vLightPos = (modelViewMatrix * vec4(vec3( -2., 3, -4), 1.0)).xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: /*glsl */`
    varying vec3 vNormal;
    varying vec3 vLightPos;
    uniform float opacity;

    void main(){
      float light = dot(vNormal, normalize(vLightPos)) * 0.5 + 0.5;
      light = clamp(light, 0.5, 1.);

      gl_FragColor = vec4(vec3(light) + vec3(.25), opacity);
    }
  `
})

function Scene({project, loadingManager}) {
  const { gl } = useThree();
  const MascotRef = React.useRef();
  const BeamRef = React.useRef();
  const matRef = React.useRef();
  const matRef2 = React.useRef();
  
  const data = useScroll();


  const texture = useLoader(THREE.TextureLoader, bgImg);
  texture.colorSpace = THREE.SRGBColorSpace;

  const sheet = useCurrentSheet();
  const material = shader
  const mascotMat = sheet.object('MascotMat',{
    opacity: t.number(0, {
      nudgeMultiplier: 0.1,
      range: [0, 1]
    }),
    bgOpacity: t.number(0, {
      nudgeMultiplier: 0.1,
      range: [0, 1]
    }),
    bgOpacity2: t.number(1, {
      nudgeMultiplier: 0.01,
      range: [0, 1]
    }),
  },{reconfigure: true});

  React.useEffect(()=>{
    mascotMat.onValuesChange(val=>{
      material.uniforms.opacity.value = val.opacity
      matRef.current.opacity = val.bgOpacity
      matRef2.current.opacity = val.bgOpacity2
    })
  },[])


  const scroll = useScroll();
  let time = {value: 0};

  const clicked = useStore((state) => state.clicked);
  const setClicked = useStore((state) => state.setClicked);
  if(clicked){
    gsap.to(scroll.el,{
      scrollTop: scroll.el.scrollHeight,
      duration: 0.3,
      onComplete:()=>{
        setClicked();
      }
    })
  }

  const scrollDown = ()=>{
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
      <Mascot reference={MascotRef} beam={BeamRef} material={material} sheet={sheet}></Mascot>
      <e.ambientLight theatreKey="ambientLight" intensity={1.} />
      <e.directionalLight castShadow theatreKey='directionalLight' position={[-5, 5, -5]} intensity={20.5} />
      <e.mesh theatreKey='Background' position={[0, 0, -100]}>
        <planeGeometry args={[78, 39]} />
        <meshStandardMaterial ref={matRef} map={texture} transparent/>
      </e.mesh>
      <e.mesh theatreKey='Background2' position={[0, 0, 0]}>
        <planeGeometry args={[78, 39]} />
        <meshStandardMaterial ref={matRef2} map={texture} transparent depthTest={false} depthWrite={false}/>
      </e.mesh>
      <IntroText sheet={sheet} loadingManager={loadingManager}/>
      <FallingTexts sheet={sheet}/>
      <RotatingText sheet={sheet}/>
      <ProductionText sheet={sheet}/>
      <Planets sheet={sheet} project={project} beam={BeamRef} mascot={MascotRef}/>
      <People sheet={sheet} loadingManager={loadingManager}/>
      <ModelX/>
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
