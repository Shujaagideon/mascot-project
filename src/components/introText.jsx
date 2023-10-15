/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import * as THREE from 'three';
import vidTex from '../assets/introVid3.mp4';
import {editable as e} from "@theatre/r3f";
import { types as t } from "@theatre/core";
import React, { useEffect } from "react";
import gsap from "gsap";
import { Suspense } from "react";
import output1 from '../assets/output_0001.jpg'
import output2 from '../assets/output_0002.jpg'
import output3 from '../assets/output_0003.jpg'
// import output4 from '../assets/output_0004.jpg'
import output5 from '../assets/output_0005.jpg'
import output6 from '../assets/output_0006.jpg'
import output7 from '../assets/output_0007.jpg'
import output8 from '../assets/output_0008.jpg'
import output9 from '../assets/output_0009.jpg'
import output10 from '../assets/output_0010.jpg'
import output11 from '../assets/output_0011.jpg'
import output12 from '../assets/output_0012.jpg'
import output13 from '../assets/output_0013.jpg'
import output14 from '../assets/output_0014.jpg'
import output15 from '../assets/output_0015.jpg'
import output16 from '../assets/output_0016.jpg'
import output17 from '../assets/output_0017.jpg'
import output18 from '../assets/output_0018.jpg'
import output19 from '../assets/output_0019.jpg'
import output20 from '../assets/output_0020.jpg'
import output21 from '../assets/output_0021.jpg'
import output22 from '../assets/output_0022.jpg'
import output23 from '../assets/output_0023.jpg'
import output24 from '../assets/output_0024.jpg'
import output25 from '../assets/output_0025.jpg'
import output26 from '../assets/output_0026.jpg'
import output27 from '../assets/output_0027.jpg'
import output28 from '../assets/output_0028.jpg'
import output29 from '../assets/output_0029.jpg'
import output30 from '../assets/output_0030.jpg'
import output31 from '../assets/output_0031.jpg'
import output32 from '../assets/output_0032.jpg'
import output33 from '../assets/output_0033.jpg'
import output34 from '../assets/output_0034.jpg'
import output35 from '../assets/output_0035.jpg'
import output36 from '../assets/output_0036.jpg'
import output37 from '../assets/output_0037.jpg'
import output38 from '../assets/output_0038.jpg'
import output39 from '../assets/output_0039.jpg'
import output40 from '../assets/output_0040.jpg'
import output41 from '../assets/output_0041.jpg'
import output42 from '../assets/output_0042.jpg'
import output43 from '../assets/output_0043.jpg'
import output44 from '../assets/output_0044.jpg'
import output45 from '../assets/output_0045.jpg'
import output46 from '../assets/output_0046.jpg'
import output47 from '../assets/output_0047.jpg'
import output48 from '../assets/output_0048.jpg'
import output49 from '../assets/output_0049.jpg'
import output50 from '../assets/output_0050.jpg'
import output51 from '../assets/output_0051.jpg'
import output52 from '../assets/output_0052.jpg'
import output53 from '../assets/output_0053.jpg'
import output54 from '../assets/output_0054.jpg'
import output55 from '../assets/output_0055.jpg'
import output56 from '../assets/output_0056.jpg'
import output57 from '../assets/output_0057.jpg'
import output58 from '../assets/output_0058.jpg'
import output59 from '../assets/output_0059.jpg'
import output60 from '../assets/output_0060.jpg'
import output61 from '../assets/output_0061.jpg'
import output62 from '../assets/output_0062.jpg'
import output63 from '../assets/output_0063.jpg'
import output64 from '../assets/output_0064.jpg'
import output65 from '../assets/output_0065.jpg'
import output66 from '../assets/output_0066.jpg'
import output67 from '../assets/output_0067.jpg'
import output68 from '../assets/output_0068.jpg'
import output69 from '../assets/output_0069.jpg'
import output70 from '../assets/output_0070.jpg'
import output71 from '../assets/output_0071.jpg'
import output72 from '../assets/output_0072.jpg'
import output73 from '../assets/output_0073.jpg'
import output74 from '../assets/output_0074.jpg'
import output75 from '../assets/output_0075.jpg'
import output76 from '../assets/output_0076.jpg'
import output77 from '../assets/output_0077.jpg'
import output78 from '../assets/output_0078.jpg'
import output79 from '../assets/output_0079.jpg'
import output80 from '../assets/output_0080.jpg'
import output81 from '../assets/output_0081.jpg'
import output82 from '../assets/output_0082.jpg'
import output83 from '../assets/output_0083.jpg'
import output84 from '../assets/output_0084.jpg'
import output85 from '../assets/output_0085.jpg'
import output86 from '../assets/output_0086.jpg'
import output87 from '../assets/output_0087.jpg'
import output88 from '../assets/output_0088.jpg'
import output89 from '../assets/output_0089.jpg'
import output90 from '../assets/output_0090.jpg'
import output91 from '../assets/output_0091.jpg'
import output92 from '../assets/output_0092.jpg'
import output93 from '../assets/output_0093.jpg'
import output94 from '../assets/output_0094.jpg'
import output95 from '../assets/output_0095.jpg'
import output96 from '../assets/output_0096.jpg'
import output97 from '../assets/output_0097.jpg'
import output98 from '../assets/output_0098.jpg'
import output99 from '../assets/output_0099.jpg'
import output100 from '../assets/output_0100.jpg'
import output101 from '../assets/output_0101.jpg'
import output102 from '../assets/output_0102.jpg'
import output103 from '../assets/output_0103.jpg'
import output104 from '../assets/output_0104.jpg'
import output105 from '../assets/output_0105.jpg'
import output106 from '../assets/output_0106.jpg'
import output107 from '../assets/output_0107.jpg'
import output108 from '../assets/output_0108.jpg'
import output109 from '../assets/output_0109.jpg'
import output110 from '../assets/output_0110.jpg'
import output111 from '../assets/output_0111.jpg'
import output112 from '../assets/output_0112.jpg'
import output113 from '../assets/output_0113.jpg'
import output114 from '../assets/output_0114.jpg'
import output115 from '../assets/output_0115.jpg'
import output116 from '../assets/output_0116.jpg'
import output117 from '../assets/output_0117.jpg'
import output118 from '../assets/output_0118.jpg'
import output119 from '../assets/output_0119.jpg'
import output120 from '../assets/output_0120.jpg'
import output121 from '../assets/output_0121.jpg'
import output122 from '../assets/output_0122.jpg'
import output123 from '../assets/output_0123.jpg'
import output124 from '../assets/output_0124.jpg'
import output125 from '../assets/output_0125.jpg'
import output126 from '../assets/output_0126.jpg'
import output127 from '../assets/output_0127.jpg'
import output128 from '../assets/output_0128.jpg'
import output129 from '../assets/output_0129.jpg'
import output130 from '../assets/output_0130.jpg'
import output131 from '../assets/output_0131.jpg'
import output132 from '../assets/output_0132.jpg'
import output133 from '../assets/output_0133.jpg'
import output134 from '../assets/output_0134.jpg'
import output135 from '../assets/output_0135.jpg'
import output136 from '../assets/output_0136.jpg'
import output137 from '../assets/output_0137.jpg'
import output138 from '../assets/output_0138.jpg'
import output139 from '../assets/output_0139.jpg'
import output140 from '../assets/output_0140.jpg'
import output141 from '../assets/output_0141.jpg'
import output142 from '../assets/output_0142.jpg'
import output143 from '../assets/output_0143.jpg'
import output144 from '../assets/output_0144.jpg'
import output145 from '../assets/output_0145.jpg'
import output146 from '../assets/output_0146.jpg'
import output147 from '../assets/output_0147.jpg'
import output148 from '../assets/output_0148.jpg'
import output149 from '../assets/output_0149.jpg'
import output150 from '../assets/output_0150.jpg'
import output151 from '../assets/output_0151.jpg'
import output152 from '../assets/output_0152.jpg'
import output153 from '../assets/output_0153.jpg'
import output154 from '../assets/output_0154.jpg'
import output155 from '../assets/output_0155.jpg'
import output156 from '../assets/output_0156.jpg'
import output157 from '../assets/output_0157.jpg'
import output158 from '../assets/output_0158.jpg'
import output159 from '../assets/output_0159.jpg'
import output160 from '../assets/output_0160.jpg'
import output161 from '../assets/output_0161.jpg'
import output162 from '../assets/output_0162.jpg'
import output163 from '../assets/output_0163.jpg'
import output164 from '../assets/output_0164.jpg'
import output165 from '../assets/output_0165.jpg'
import output166 from '../assets/output_0166.jpg'
import output167 from '../assets/output_0167.jpg'
import output168 from '../assets/output_0168.jpg'
import output169 from '../assets/output_0169.jpg'
import output170 from '../assets/output_0170.jpg'
import output171 from '../assets/output_0171.jpg'

const importAll = (r) => {
  return r.keys().map(r);
};

// const images = importAll(require.context('../assets/', false, /^\.\/output.*\.(jpg|jpeg|png|gif)$/)); // Modify the path as needed


const IntroText = ({sheet}) => {
  const { gl } = useThree();
  const ref = React.useRef(null);
  let factor = {value:0};

  const textureUrls = [
      output1,
      output2,
      output3,
      // output4,
      output5,
      output6,
      output7,
      output8,
      output9,
      output10,
      output11,
      output12,
      output13,
      output14,
      output15,
      output16,
      output17,
      output18,
      output19,
      output20,
      output21,
      output22,
      output23,
      output24,
      output25,
      output26,
      output27,
      output28,
      output29,
      output30,
      output31,
      output32,
      output33,
      output34,
      output35,
      output36,
      output37,
      output38,
      output39,
      output40,
      output41,
      output42,
      output43,
      output44,
      output45,
      output46,
      output47,
      output48,
      output49,
      output50,
      output51,
      output52,
      output53,
      output54,
      output55,
      output56,
      output57,
      output58,
      output59,
      output60,
      output61,
      output62,
      output63,
      output64,
      output65,
      output66,
      output67,
      output68,
      output69,
      output70,
      output71,
      output72,
      output73,
      output74,
      output75,
      output76,
      output77,
      output78,
      output79,
      output80,
      output81,
      output82,
      output83,
      output84,
      output85,
      output86,
      output87,
      output88,
      output89,
      output90,
      output91,
      output92,
      output93,
      output94,
      output95,
      output96,
      output97,
      output98,
      output99,
      output100,
      output101,
      output102,
      output103,
      output104,
      output105,
      output106,
      output107,
      output108,
      output109,
      output110,
      output111,
      output112,
      output113,
      output114,
      output115,
      output116,
      output117,
      output118,
      output119,
      output120,
      output121,
      output122,
      output123,
      output124,
      output125,
      output126,
      output127,
      output128,
      output129,
      output130,
      output131,
      output132,
      output133,
      output134,
      output135,
      output136,
      output137,
      output138,
      output139,
      output140,
      output141,
      output142,
      output143,
      output144,
      output145,
      output146,
      output147,
      output148,
      output149,
      output150,
      output151,
      output152,
      output153,
      output154,
      output155,
      output156,
      output157,
      output158,
      output159,
      output160,
      output161,
      output162,
      output163,
      output164,
      output165,
      output166,
      output167,
      output168,
      output169,
      output170,
      output171
  ];

  const textures = [];
  const textureLoader = new THREE.TextureLoader();

  textureUrls.forEach((url) => {
    const texture = textureLoader.load(url);
    texture.colorSpace = THREE.SRGBColorSpace;
    textures.push(texture);
  });

  const mascotMat = sheet.object('circlesMat',{
    opacity: t.number(1, {
      nudgeMultiplier: 0.1,
      range: [0, 1]
    }),
    factor: t.number(0, {
      nudgeMultiplier: .1,
      range: [0, 1]
    }),
  },{reconfigure: true});

  React.useEffect(()=>{
    // console.log(images)
    mascotMat.onValuesChange(val=>{
      ref.current.opacity = val.opacity;

      const index = Math.floor(val.factor * (textures.length - 1));

      ref.current.map = textures[index];
      ref.current.needsUpdate = true;
    });
  },[factor, mascotMat])

  return (
    <group>
      <e.mesh theatreKey='text2' position={[0,0, -21]}>
          <planeGeometry args={[75, 45, 100, 100]}/>
          <Suspense fallback={null}>
            <meshStandardMaterial ref={ref} transparent map={textures[0]} toneMapped={false} />
          </Suspense>
      </e.mesh>
    </group>
  )
}

export default IntroText


// function FallbackMaterial({ url }) {
//   const texture = useTexture(url)
//   return <meshBasicMaterial map={texture} toneMapped={false} />
// }