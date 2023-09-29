/* eslint-disable react/no-unknown-property */
import { useLoader } from "@react-three/fiber";
import * as THREE from 'three';
import textImg from '../assets/linesIntro.webp'
import {editable as e} from "@theatre/r3f";

const IntroText = () => {
const texture = useLoader(THREE.TextureLoader, textImg);
  texture.colorSpace = THREE.SRGBColorSpace;
  return (
    <e.mesh theatreKey='intro' position={[0,0, -21]}>
        <planeGeometry args={[71, 40]}/>
        <meshBasicMaterial map={texture} transparent/>
    </e.mesh>
  )
}

export default IntroText