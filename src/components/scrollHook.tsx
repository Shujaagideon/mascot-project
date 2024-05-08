import React, { useEffect, useState } from 'react';
import gsap from 'gsap'


const clamp = (val, min, max) => Math.min(Math.max(val, min), max);


export const useScrollHijack = (scrollElement: HTMLDivElement, percentages=[10,20]) => {
  let currentIndex = 0;
  let speed = 0;
  let position = 0;
  let rounded = 0;
  let isScrolling= false;

  const handleScroll = () => {
    const scrollTop = scrollElement.scrollTop;
    const mouseAnim = document.querySelector('.mouse-anim');
  
    if (mouseAnim) {
      gsap.to(mouseAnim, { opacity: scrollTop < 4 ? 1 : 0 });
    }
  };
  
  let lastKnownScrollPosition = scrollElement.scrollTop;
  let ticking = false;
  
  const requestAnimationFrame = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function(callback) {
      window.setTimeout(callback, 1000 / 60);
    };
  
  const updateScroll = () => {
    lastKnownScrollPosition = scrollElement.scrollTop;
    handleScroll();
    ticking = false;
  };
  
  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(updateScroll);
      ticking = true;
    }
  };



  // Event listener for wheel scrolling
  const handleWheel = (event) => {
    
    event.preventDefault();
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
        // const scrollElement = window.pageYOffset !== undefined ? window : document.documentElement || document.body.parentNode || document.body;

        window.addEventListener('scroll', onScroll, { passive: true });
        handleScroll();
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
      window.addEventListener('scroll', handleWheel, {passive:false});

      return () => {
        window.removeEventListener('wheel', handleWheel);
        window.removeEventListener('scroll', handleWheel);
      };
    }
    
  }, [scrollElement]);

  return scrollElement;
};