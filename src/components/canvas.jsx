/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { ScrollControls, Sparkles, useScroll } from "@react-three/drei";
import { getProject, val, types as t } from "@theatre/core";
import bgImg from '../assets/Background.jpg'
import * as THREE from 'three'
import sceneState from '../assets/state.json'

import {
  SheetProvider,
  useCurrentSheet,
  editable as e,
} from "@theatre/r3f";
import { Mascot } from "./Mascot";
import IntroText from "./introText";
import ScrollingText from "./scrollingText";

export default function R3fCanvas() {
  const sheet = getProject("Fly Through", {state: sceneState}).sheet("Scene");

  return (
    <Canvas gl={{ preserveDrawingBuffer: true }}>
      <ScrollControls pages={30} damping={0.9}>
        <SheetProvider sheet={sheet}>
          <Scene />
        </SheetProvider>
      </ScrollControls>
    </Canvas>
  );
}

// Create a shader material with GLSL noise
const vertexShader = `
  varying vec2 vUv;
  uniform float time;

  // Simplex noise function
  float noise(vec2 p) {
    return fract(sin(dot(p.xy, vec2(12.9898, 78.233))) * 43758.5453);
  }

  void main() {
    vUv = uv;
    vec3 displacedPosition = position;

    // Apply noise to the Y position of vertices
    displacedPosition.y += (noise(position.xy * 5.0 + vec2(time * 0.5, 0.0)) - 0.5) * 1.0;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(displacedPosition, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  uniform sampler2D uTexture;
  
  void main() {
    gl_FragColor = texture2D(uTexture, vUv);
  }
`;

function Scene() {
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
      <ambientLight intensity={1.} />
      <e.directionalLight theatreKey='directionalLight' position={[-5, 5, -5]} intensity={2.5} />
      <e.mesh theatreKey='Background' position={[0, 0, -20]}>
        <planeGeometry args={[78, 39]} />
        <meshBasicMaterial map={texture}/>
      </e.mesh>
      {/* <IntroText/> */}
      {/* <ScrollingText/> */}
      <Sparkles
            count={200}
            size={2}
            speed={0.3}
            opacity={1}
            scale={15}
            color="#ffb0f3"
          />
      <Mascot material={material}></Mascot>
    </>
  );
}