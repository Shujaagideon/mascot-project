/* eslint-disable react/no-unknown-property */
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from 'three';
import textImg from '../assets/texts1.webp';


const ScrollingText = () => {

    const texture = useLoader(THREE.TextureLoader, textImg);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set( 1, 1 );

    useFrame(({ clock }) => {
        const a = clock.getElapsedTime()
        texture.offset.y =  a * 0.05;
        texture.offset.x =  a * 0.005;
    })

    return (
        <mesh position={[0,0 ,-30]}>
            <planeGeometry args={[78, 39]}/>
            <meshBasicMaterial map={texture} transparent opacity={0.5}/>
        </mesh>
    )
}

export default ScrollingText