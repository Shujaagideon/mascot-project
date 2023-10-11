/* eslint-disable react/prop-types */
import React from 'react'
import {editable as e} from '@theatre/r3f';
import * as THREE from 'three';
import { types as t } from "@theatre/core";
import vidTex from '../assets/introVid3.mp4'

const Introvid = ({sheet}) => {
    const ref = React.useRef();
    const mascotMat = sheet.object('introvid',{
        opacity: t.number(1, {
            nudgeMultiplier: 0.1,
            range: [0, 1]
        }),
        factor: t.number(0, {
            nudgeMultiplier: 0.1,
            range: [0, 1]
        }),
    },{reconfigure: true});
    
    React.useEffect(()=>{
        mascotMat.onValuesChange(val=>{
            console.log(ref.current.currentTime)
            ref.current.currentTime = ref.current.duration * val.factor;
            ref.current.style.opacity = val.opacity;
        })
    },[ref.current.currentTime])
  return (
    <video className=' pointer-events-none top-0 left-0 h-full w-full' src={vidTex} ref={ref}/>
  )
}

export default Introvid