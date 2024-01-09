import React, { useEffect, useState } from 'react';
import gsap from 'gsap'


const clamp = (val, min, max) => Math.min(Math.max(val, min), max);


export const useScrollHijack = (scrollElement: HTMLDivElement, percentages=[10,20]) => {
  let currentIndex = 0;
  let speed = 0;
  let position = 0;
  let rounded = 0;
  let isScrolling= false;

  useEffect(()=>{
    console.log(scrollElement.scrollTop)
    // if(scrollElement.scrollTop < 100){
    //   console.log('smaller', scrollElement.scrollTop)
    //   gsap.to('.mouse-anim',{
    //     opacity: 1,
    //     duration: 1,
    //   })
    // }else{
    //   console.log('greater', scrollElement.scrollTop)
    //   gsap.to('.mouse-anim',{
    //     opacity: 0,
    //     duration: 1,
    //   })
    // }
  },[scrollElement.scrollTop])


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
      duration: currentIndex === 0 ? 2:
                currentIndex === 1 ? 2:
                currentIndex === 2 ? 4:
                currentIndex === 3 ? 3:
                currentIndex === 4 ? 3:
                currentIndex === 5 ? 6:
                currentIndex === 6 ? 3:
                currentIndex === 7 ? 3:
                currentIndex === 8 ? 6:
                3,
      ease: 'sine.inOut',
      onUpdate:()=>{
        if(scrollElement.scrollTop < 10){
          console.log('smaller', scrollElement.scrollTop)
          gsap.to('.mouse-anim',{
            opacity: 1,
            duration: 2,
            delay: dir > 0 ? 0 : 4,
          })
        }else{
          console.log('greater', scrollElement.scrollTop)
          gsap.to('.mouse-anim',{
            opacity: 0,
            duration: 1,
          })
        }
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