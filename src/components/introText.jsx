/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import * as THREE from 'three';
import textImg from '../assets/textIntro.png'
import titleImg from '../assets/title.png'
import circleImg from '../assets/circle.png'
import {editable as e} from "@theatre/r3f";
import { types as t } from "@theatre/core";
import React, { useEffect } from "react";
import gsap from "gsap";

// Create a shader material with GLSL noise
const vertexShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;

  void main() {
    vUv = uv;
    vNormal = normal;
    vPosition = position;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;
  uniform sampler2D uTexture;
  uniform sampler2D uTexture2;
  uniform float factor;
  uniform float alphaValue;

  
  void main() {
    vec4 val1 = texture2D(uTexture, vUv);
    vec4 val2 = texture2D(uTexture2, vUv);
    vec4 text = mix(val1, val2, factor);
    gl_FragColor = text;
    gl_FragColor.a *= alphaValue;

    if(text.r < 0.2)discard;

  }
`;

const IntroText = ({sheet}) => {
  const { gl } = useThree();
  useEffect(() => {
  });


  const ref = React.useRef();
  const refShader = React.useRef();
  const texture = useLoader(THREE.TextureLoader, circleImg);
  const texture1 = useLoader(THREE.TextureLoader, textImg);
  const texture2 = useLoader(THREE.TextureLoader, titleImg);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture1.colorSpace = THREE.SRGBColorSpace;
  texture2.colorSpace = THREE.SRGBColorSpace;

  const uniforms ={
    factor:{value: 0},
    alphaValue:{value: 1},
    uTexture:{value: null},
    uTexture2:{value: texture2},
  }


  const mascotMat = sheet.object('circlesMat',{
    opacity: t.number(1, {
      nudgeMultiplier: 0.1,
      range: [0, 1]
    }),
    factor: t.number(0, {
      nudgeMultiplier: 0.1,
      range: [0, 1]
    }),
    shaderOpacity: t.number(1, {
      nudgeMultiplier: 0.1,
      range: [0, 1]
    }),
  },{reconfigure: true});

  React.useEffect(()=>{
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const texture = new THREE.CanvasTexture(canvas);
    uniforms.uTexture.value = texture;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const text = "CREATING THE WORLD THAT COULD BE";
    const fontSize = 50;
    ctx.font = `${fontSize}px Arial`;
    
    const trailBlur = 2; // Blur for the trail
    const trailLength = 100; // Length of the trail
    const trailUpdateInterval = 3; // Update the trail more frequently
    const trail = [];
    const rotationValue = {value:0};

    
    gsap.to(rotationValue,{
      value: 1,
      duration: 4,
      delay: 3,
      ease: 'easeInOut'
    })
    
    function draw() {
      // Clear the canvas
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      texture.needsUpdate = true

      // Calculate the position of the text
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const x = centerX;
      const y = centerY;

      // Get the rotation value from the input range
      // const rotationValue = parseFloat(document.getElementById('rotationRange').value);

      // Add the current position to the trail
      if (trail.length % trailUpdateInterval === 0) {
          trail.push({ x, y, rotation: rotationValue.value });
          if (trail.length > trailLength) {
              trail.shift();
          }
      }

      // Draw the trail with blur
      ctx.save();
      ctx.globalAlpha = 0.1;
      ctx.filter = `blur(${trailBlur}px)`;
      ctx.strokeStyle = 'purple';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(trail[0].x, trail[0].y);
      for (let i = 1; i < trail.length; i++) {
          const trailItem = trail[i];
          ctx.lineTo(trailItem.x, trailItem.y);
          trailItem.rotation += (rotationValue.value - trailItem.rotation) / trailUpdateInterval;
          ctx.save();
          ctx.translate(trailItem.x, trailItem.y);
          ctx.rotate(trailItem.rotation * Math.PI); // Rotate from 0 to 180 degrees
          ctx.fillText(text, 0, 0);
          ctx.restore();
      }
      ctx.stroke();
      ctx.restore();
      ctx.filter = `blur(${rotationValue.value}px)`;
      ctx.globalAlpha = 1;

      // Rotate and draw the main text around its own center
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotationValue.value * Math.PI); // Rotate from 0 to 180 degrees
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, 0, 0);
      ctx.restore();

      requestAnimationFrame(draw);
  }
  // useFrame(() => {
    // });
    draw();
    mascotMat.onValuesChange(val=>{
      ref.current.opacity = val.opacity;
      uniforms.factor.value = val.factor
      uniforms.alphaValue.value = val.shaderOpacity;
    })
  },[mascotMat])

  return (
    <group>
      <e.mesh theatreKey='circles' position={[0,0, -30]}>
          <planeGeometry args={[90, 90]}/>
          <meshBasicMaterial ref={ref} map={texture} transparent depthWrite={false}/>
      </e.mesh>
      <e.mesh theatreKey='text1' position={[0, 1, -21]}>
          <planeGeometry args={[70, 50, 30,30]}/>
          <shaderMaterial ref={refShader} uniforms={uniforms} vertexShader={vertexShader} fragmentShader={fragmentShader} transparent depthWrite={false}/>
      </e.mesh>
      {/* <e.mesh theatreKey='text2' position={[0,0, -21]}>
          <planeGeometry args={[42, 40]}/>
          <meshBasicMaterial map={texture2} transparent depthWrite={false}/>
      </e.mesh>
      <e.mesh theatreKey='text3' position={[0,0, -21]}>
          <planeGeometry args={[42, 40]}/>
          <meshBasicMaterial map={texture2} transparent depthWrite={false}/>
      </e.mesh>
      <e.mesh theatreKey='text4' position={[0,0, -21]}>
          <planeGeometry args={[42, 40]}/>
          <meshBasicMaterial map={texture2} transparent depthWrite={false}/>
      </e.mesh>
      <e.mesh theatreKey='text5' position={[0,0, -21]}>
          <planeGeometry args={[42, 40]}/>
          <meshBasicMaterial map={texture2} transparent depthWrite={false}/>
      </e.mesh> */}
    </group>
  )
}

export default IntroText