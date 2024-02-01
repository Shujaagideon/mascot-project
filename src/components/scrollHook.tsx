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


    const scrollHeight = scrollElement.scrollHeight - scrollElement.clientHeight;
    const scrollTo = percentages[currentIndex] * scrollHeight / 100;

    gsap.to(scrollElement,{
      scrollTop: scrollTo,
      duration: currentIndex === 0 ? 6:
                currentIndex === 1 ? 6:
                currentIndex === 2 ? 8:
                currentIndex === 3 ? 6:
                currentIndex === 4 ? 6:
                currentIndex === 5 ? 9:
                currentIndex === 6 ? 6:
                currentIndex === 7 ? 6:
                currentIndex === 8 ? 8:
                3,
      ease: 'Power.in',
      onUpdate:()=>{
        const mo = document.querySelector('.mo');
        scrollElement.scrollTop < 4 ? gsap.set('.mouse-anim',{opacity: 1}) : gsap.set('.mouse-anim',{opacity: 0});
        // console.log(scrollElement.scrollTop)
        // if(scrollElement.scrollTop < 10){
        //   gsap.to('.mouse-anim',{
        //     opacity: 1,
        //     duration: 0.2,
        //     // delay: dir > 0 ? 0 : 4,
        //   })
        // }else{
        //   gsap.to('.mouse-anim',{
        //     opacity: 0,
        //     duration: 1,
        //   })
        // }
      },
      onComplete: ()=>{
        isScrolling = false;
      }
    })

  };

  // Attach the wheel event listener on mount
  useEffect(() => {
    if (scrollElement) {
      window.addEventListener('wheel', handleWheel, {passive:false});

      return () => {
        window.removeEventListener('wheel', handleWheel);
      };
    }
    
  }, [scrollElement]);

  return scrollElement;
};