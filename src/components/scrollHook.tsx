import React, { useEffect, useState } from 'react';
import gsap from 'gsap'

const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

export const useScrollHijack = (scrollElement: HTMLDivElement, percentages=[10, 20]) => {
  let currentIndex = 0;
  let isScrolling = false;

  const handleScroll = () => {
    const scrollTop = scrollElement.scrollTop;
    const mouseAnim = document.querySelector('.mouse-anim');
    if (mouseAnim) {
      gsap.set(mouseAnim, { opacity: scrollTop < 4 ? 1 : 0 });
    }
  };

  let lastKnownScrollPosition = scrollElement.scrollTop;
  let ticking = false;

  const requestAnimationFrame =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function (callback) {
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

  let prevScrollY = scrollElement.scrollTop;

  // Event listener for wheel scrolling
  const handleWheel = (event) => {
    event.preventDefault();
    if (isScrolling) {
      return;
    }
    isScrolling = true;
    let dir;

    // Check for wheel event
    if (event.deltaY) {
      dir = Math.sign(event.deltaY);
    } else {
      // For scroll event, calculate the direction based on scroll position difference
      const currentScrollY = scrollElement.scrollTop;
      dir = Math.sign(currentScrollY - prevScrollY);
      prevScrollY = currentScrollY; // Update the previous scroll position
    }

    if (dir > 0) {
      // Scrolling down or wheel scroll down
      if (currentIndex >= 0 && currentIndex < percentages.length - 1) {
        currentIndex += 1;
      } else {
        currentIndex = currentIndex;
      }
    } else if (dir < 0) {
      // Scrolling up or wheel scroll up
      if (currentIndex > 0) {
        currentIndex -= 1;
      } else {
        currentIndex = 0; // Reset currentIndex to 0 when scrolling up from the first section
      }
    }

    const scrollHeight = scrollElement.scrollHeight - scrollElement.clientHeight;
    const scrollTo = (percentages[currentIndex] * scrollHeight) / 100;

    gsap.to(scrollElement, {
      scrollTop: scrollTo,
      duration: currentIndex === 0 ? 6 : currentIndex === 1 ? 6 : currentIndex === 2 ? 8 : currentIndex === 3 ? 6 : currentIndex === 4 ? 6 : currentIndex === 5 ? 9 : currentIndex === 6 ? 6 : currentIndex === 7 ? 6 : currentIndex === 8 ? 8 : 3,
      ease: 'Power.in',
      onUpdate: () => {
        scrollElement.addEventListener('scroll', onScroll, { passive: true });
        handleScroll();
      },
      onComplete: () => {
        isScrolling = false;
      }
    });
  };

  // Attach the wheel event listener on mount
  useEffect(() => {
    if (scrollElement) {
      window.addEventListener('wheel', handleWheel, { passive: false });
      scrollElement.addEventListener('scroll', handleWheel, { passive: false });
      return () => {
        window.removeEventListener('wheel', handleWheel);
        scrollElement.removeEventListener('scroll', handleWheel);
      };
    }
  }, [scrollElement]);

  return scrollElement;
};