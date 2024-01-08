import React, { useEffect, useState } from 'react';
import gsap from 'gsap'


const clamp = (val, min, max) => Math.min(Math.max(val, min), max);


export const useScrollHijack = (scrollElement: HTMLDivElement, percentages=[10,20]) => {
  let currentIndex = 0;
  let speed = 0;
  let position = 0;
  let rounded = 0;
  let isScrolling= false;


  // Event listener for wheel scrolling
  const handleWheel = (event) => {
    
    event.preventDefault();
    if(isScrolling){
      return;
    };
    let dir = Math.sign(event.deltaY);
    isScrolling = true;

    if(dir > 0){
      if(currentIndex >= 0 && currentIndex < percentages.length-1){
        currentIndex +=1;
      }
      else {
        currentIndex = currentIndex;
      }
    }else if(dir < 0){
      if(currentIndex > 0 ){
        currentIndex -=1;
      }
      else {
        currentIndex = 0;
      }
    }

    // console.log(currentIndex);

    const scrollHeight = scrollElement.scrollHeight - scrollElement.clientHeight;
    const scrollTo = percentages[currentIndex] * scrollHeight / 100;
    // console.log(scrollTo)

    gsap.to(scrollElement,{
      scrollTop: scrollTo,
      duration: currentIndex === 0 ? 2.5:
                currentIndex === 1 ? 2:
                currentIndex === 2 ? 5:
                currentIndex === 3 ? 5:
                currentIndex === 4 ? 5:
                currentIndex === 5 ? 10:
                currentIndex === 6 ? 4:
                currentIndex === 7 ? 4:
                currentIndex === 8 ? 7:
                4,
      ease: 'sine.inOut',
      onComplete: ()=>{
        isScrolling = false;
      }
    })

    // speed += event.deltaY*0.03;
  };

  // Attach the wheel event listener on mount
  useEffect(() => {
    if (scrollElement) {
        // const raf = ()=>{
        //     position +=speed;
        //     speed*=0.9;
    
        //     rounded = Math.round(position);
    
        //     let diff = (rounded - position);
    
        //     position += Math.sign(diff) * Math.pow(Math.abs(diff), 0.7) * 0.15;
            
        //     // position = clamp(position, 0, 100);
        //     console.log(position)
        //     // scrollElement.scrollTop = position;
    
        //     requestAnimationFrame(raf)
        // }
    
        // raf();
      window.addEventListener('wheel', handleWheel, {passive:false});

      return () => {
        window.removeEventListener('wheel', handleWheel);
      };
    }
    
  }, [scrollElement]);

  return scrollElement;
};