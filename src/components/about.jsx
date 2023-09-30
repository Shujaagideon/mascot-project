/* eslint-disable react/no-unknown-property */
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from 'three';
import bgImg from '../assets/Background.jpg'
import { Sparkles } from "@react-three/drei";
import React from "react";


const About = () => {
  return (
    <>
        <div className="absolute w-full h-full">
            <React.Suspense fallback={
                <div className="bg-[url('./assets/Background.jpg')] h-screen w-full"></div>
            }>
                <Canvas gl={{ preserveDrawingBuffer: true }}>
                    <Scene/>
                </Canvas>
            </React.Suspense>
        </div>
        <div className="h-screen fixed z-20 w-full p-2 md:p-5 lg:p-20 bg-transparent flex overflow-hidden">
            <div className="w-full overscroll-y-scroll md:w-4/5  xl:w-2/5 h-fit md:h-4/5 text-slate-100 backdrop-blur-md ml-auto mt-24 text-sm md:text-base md:mt-auto border border-slate-100 rounded-xl p-4 md:p-10">
                <p className="mb-4 text-center">TACTECH New Media Solutions is a burgeoning assembly of
                    acclaimed artists, forward-thinking visionaries, inventive coders,
                    skillful animators, resourceful designers, and adept engineers.
                </p>
                <p className="mb-4 text-center">
                    We are dedicated to creating and delivering immersive, interactive,
                    and captivating experiences through the utilization of
                    groundbreaking and transformative technologies.
                </p>
                <p className="mb-4 text-center">
                    Our expertise spans across TTL Campaigns (both Online & Oine),
                    XR, MR, AR, VR, Interactive installations, Immersive launches &
                    Shows, along with temporary and permanent installations
                    adaptable to a multitude of industries.
                </p>
                <p className="mb-4 text-center">
                    As a collective, we are driven by our passion to transcend the
                    conventional limits of new media solutions, crafting unforgettable
                    experiences that make a lasting imprint
                </p>
            </div>
        </div>
    </>
  )
}

export default About;


export function Scene() {
    // const { scene } = useThree();
  
    const texture = useLoader(THREE.TextureLoader, bgImg);
    texture.colorSpace = THREE.SRGBColorSpace;
  
    // our callback will run on every animation frame
    useFrame((state) => {
    });
  
    // const bgColor = "#84a4f4";
  
    return (
      <>
        <mesh position={[0, 0, -20]}>
          <planeGeometry args={[78, 39]} />
          <meshBasicMaterial map={texture}/>
        </mesh>
        <Sparkles
            count={200}
            size={2}
            speed={0.3}
            opacity={1}
            scale={15}
            color="#ffb0f3"
          />
      </>
    );
}