/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import bgImg from '../assets/Background.jpg';
import text from '../assets/approach.webp';
import { Sparkles } from '@react-three/drei';
import React from 'react';
import Aboutmascot from './aboutmascot';
import ximage from '../assets/x1.png';
// import bgImage from '../assets/approach.webp';

const About = () => {
  return (
    <>
      <div className='absolute w-full h-full overflow-hidden'>
        <React.Suspense
          fallback={
            <div className="bg-[url('./assets/Background.jpg')] h-screen w-full"></div>
          }
        >
          <Canvas gl={{}}>
            <Scene tex={text} />
          </Canvas>
        </React.Suspense>
      </div>
      <div className='h-screen md:top-0 fixed z-20 w-full p-2 md:p-5 lg:p-20 bg-transparent flex overflow-hidden '>
        <img
          src={ximage}
          alt=''
          // className='absolute top-5 right-[2%] h-[30%] scale-50'
          // right-[10%]
          // height[50%]
          className='absolute top-0 right-[10%] h-[35%] scale-50'
        />
        <div className='w-full mt-20 overscroll-y-scroll md:w-4/5  xl:w-[45%] 2xl:min-h-[50%] 2xl:mt-64 h-fit text-slate-100 backdrop-blur-md ml-auto lg:mt-24 xl:mt-28 text-sm md:text-base md:mt-auto border border-slate-100 rounded-xl p-4 md:p-6'>
          <div className='mb-4 text-center lg:text-left'>
            TACTECH New Media Solutions is a burgeoning assembly of acclaimed
            artists, forward-thinking visionaries, inventive coders, skillful
            animators, resourceful designers, and adept engineers.
          </div>
          <div className='mb-4 text-center lg:text-left'>
            We are dedicated to creating and delivering immersive, interactive,
            and captivating experiences through the utilization of
            groundbreaking and transformative technologies.
          </div>
          <div className='mb-4 text-center lg:text-left'>
            Our expertise spans across TTL Campaigns (both Online & Offine), XR,
            MR, AR, VR, Interactive installations, Immersive launches & Shows,
            along with temporary and permanent installations adaptable to a
            multitude of industries.
          </div>
          <div className='mb-4 text-center lg:text-left'>
            As a collective, we are driven by our passion to transcend the
            conventional limits of new media solutions, crafting unforgettable
            experiences that make a lasting imprint
          </div>
        </div>
      </div>
    </>
  );
};

export default About;

export function Scene({ tex }) {
  // const { scene } = useThree();

  const texture = useLoader(THREE.TextureLoader, bgImg);
  texture.colorSpace = THREE.SRGBColorSpace;

  // our callback will run on every animation frame
  // eslint-disable-next-line no-unused-vars
  useFrame(_state => {});

  // const bgColor = "#84a4f4";

  return (
    <>
      <mesh position={[0, 0, -20]}>
        <planeGeometry args={[78, 39]} />
        <meshBasicMaterial map={texture} />
      </mesh>
      <Aboutmascot tex={tex} />
      <Sparkles
        count={200}
        size={2}
        speed={0.3}
        opacity={1}
        scale={15}
        color='#ffb0f3'
      />
    </>
  );
}
