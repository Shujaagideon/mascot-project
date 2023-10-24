/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
// import tex from '../assets/approach.webp';


const vertexShader = /*glsl*/`
    uniform float time;
    varying vec2 vUv;
    uniform sampler2D uTexture;

    float PI = 3.14159;

    vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

    float snoise(vec2 v){
      const vec4 C = vec4(0.211324865405187, 0.366025403784439,
              -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v -   i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod(i, 289.0);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
      + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
        dot(x12.zw,x12.zw)), 0.0);
      m = m*m ;
      m = m*m ;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    void main() {
      vec3 pos = position;
      vec4 color = texture2D(uTexture, uv);
      if(color.b < 0.93){
        float dif1 = sin(pos.x * .2 + time) * 0.1;
        float dif2 = sin(pos.x * 4.0 + time) * 0.2;
        float dif3 = sin(pos.y * 0.8 + time) * 0.2;

        pos.z = snoise(vec2(pos.x + time, pos.y - time)) * 0.03;
        // pos.z = sin(pos.y * 1.2 + time * 0.2) * 0.3;
      }
      if (pos.x < -3.) {
        // pos.y += sin(pos.x * 1.2 + time * 0.2) * 0.2;
      }

      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
`

const fragmentShader = /*glsl*/`
    uniform sampler2D uTexture;
    uniform vec3 color1;
    uniform vec3 color2;
    uniform float time;
    varying vec2 vUv;

    // Simplex 2D noise
//
    vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

    float snoise(vec2 v){
      const vec4 C = vec4(0.211324865405187, 0.366025403784439,
              -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v -   i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod(i, 289.0);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
      + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
        dot(x12.zw,x12.zw)), 0.0);
      m = m*m ;
      m = m*m ;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    void main() {
      vec4 color = texture2D(uTexture, vUv);
      if(color.a < 0.95)discard;
      if(color.b < 0.87){
        color = vec4(mix(color1, color2, snoise(vec2(vUv.x * 6. + time, vUv.y * 6. - time))), 1.);
      }
      gl_FragColor = color;
    }
`

const Aboutmascot = ({tex}) => {
    const texture = useLoader(THREE.TextureLoader, tex);
    texture.colorSpace = THREE.SRGBColorSpace;
    const uniforms = {
        uTexture: {value: texture},
        time:{value: 0},
        color1:{value: new THREE.Color('#9965F6')},
        color2:{value: new THREE.Color('#DA74FA')},
        
    };

    useFrame(({clock})=>{
        uniforms.time.value = clock.getElapsedTime()
    })

  return (
    <mesh position={[-1,0,-1]}>
        <planeGeometry args={[20, 10, 200, 200]}/>
        <shaderMaterial uniforms={uniforms} vertexShader={vertexShader} fragmentShader={fragmentShader}/>
    </mesh>
  )
}

export default Aboutmascot