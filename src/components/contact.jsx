/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
// import React from 'react'

import { Canvas, useFrame, useLoader } from '@react-three/fiber';
// import { Scene } from './about';
import React from 'react';
import tex from '../assets/wave1.png';
import Aboutmascot from './aboutmascot';
import { Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import bgImg from '../assets/Background.jpg';

const Contact = () => {
  return (
    <>
      <div className='absolute w-full h-full'>
        <React.Suspense
          fallback={
            <div className="bg-[url('./assets/Background.jpg')] h-screen w-full"></div>
          }
        >
          <Canvas gl={{}}>
            <Scene tex={tex} />
          </Canvas>
        </React.Suspense>
      </div>
      <div className='h-screen overscroll-y-auto fixed flex justify-center items-center w-full px-5 lg:px-20 z-30 bg-transparent'>
        <div className='w-full my-auto'>
          <h2 className=' text-center uppercase text-4xl md:text-6xl mb-14 lg:mb-24 font-bold text-slate-100'>
            Get In touch with us
          </h2>

          <form action='' className='w-full md:w-4/5 lg:w-3/4 h-fit'>
            <div className='flex flex-col md:flex-row w-full h-fit mb-10 justify-between'>
              <input
                placeholder='Name'
                className='p-3 px-6 h-14 md:h-20 w-full mb-4 md:w-[47%] rounded-3xl backdrop-blur-[2px] text-slate-100 bg-transparent border border-slate-100  placeholder:text-slate-100'
              />
              <input
                placeholder='Email address'
                className='p-3 px-6 h-14 md:h-20 w-full mb-4 md:w-[47%] rounded-3xl backdrop-blur-[2px] text-slate-100 bg-transparent border border-slate-100  placeholder:text-slate-100'
              />
            </div>
            <textarea
              placeholder='Write a message ...'
              className=' h-24 md:h-36 mb-10 p-6 w-full rounded-3xl backdrop-blur-[2px] text-slate-100 bg-transparent border border-slate-100  placeholder:text-slate-100'
              name=''
              id=''
              cols='30'
              rows='10'
            ></textarea>
            <button
              type='submit'
              className='border py-3 md:py-5 px-8 md:px-14 backdrop-blur-[2px] text-slate-100 rounded-3xl border-slate-100 font-elza_medium text-2xl'
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;

function Scene({ tex }) {
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
      <Aboutmascot tex={tex}/>
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
