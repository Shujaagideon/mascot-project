/* eslint-disable no-unused-vars */
import React from 'react';

const Cursor = () => {
  const cursor = React.useRef(null);

  React.useEffect(() => {
    const canvas = cursor.current;
    const ctx = canvas.getContext('2d');

    // for intro motion
    let mouseMoved = false;

    const pointer = {
      x: 0.5 * window.innerWidth,
      y: 0.5 * window.innerHeight,
    };
    const params = {
      pointsNumber: 10,
      widthFactor: 1.5,
      mouseThreshold: 0.6,
      spring: 0.9,
      friction: 0.4,
    };

    const trail = new Array(params.pointsNumber);
    for (let i = 0; i < params.pointsNumber; i++) {
      trail[i] = {
        x: pointer.x,
        y: pointer.y,
        dx: 0,
        dy: 0,
      };
    }

    window.addEventListener('click', e => {
      updateMousePosition(e.pageX, e.pageY);
    });
    window.addEventListener('mousemove', e => {
      mouseMoved = true;
      updateMousePosition(e.pageX, e.pageY);
    });
    window.addEventListener('touchmove', e => {
      mouseMoved = true;
      updateMousePosition(e.targetTouches[0].pageX, e.targetTouches[0].pageY);
    });

    function updateMousePosition(eX, eY) {
      pointer.x = eX;
      pointer.y = eY;
    }

    setupCanvas();
    updateBubbles(0);
    window.addEventListener('resize', () => {
      setupCanvas();
    });

    function updateBubbles(t) {
      // for intro motion
      // if (!mouseMoved) {
      //     pointer.x = (.5 + .3 * Math.cos(.002 * t) * (Math.sin(.005 * t))) * window.innerWidth;
      //     pointer.y = (.5 + .2 * (Math.cos(.005 * t)) + .1 * Math.cos(.01 * t)) * window.innerHeight;
      // }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Set the stroke color to purple
      ctx.strokeStyle = '#4348f0';
      trail.forEach((p, pIdx) => {
        const prev = pIdx === 0 ? pointer : trail[pIdx - 1];
        const spring = pIdx === 0 ? 0.4 * params.spring : params.spring;
        p.dx += (prev.x - p.x) * spring;
        p.dy += (prev.y - p.y) * spring;
        p.dx *= params.friction;
        p.dy *= params.friction;
        p.x += p.dx;
        p.y += p.dy;
      });

      ctx.beginPath();
      ctx.moveTo(trail[0].x, trail[0].y);

      for (let i = 1; i < trail.length - 1; i++) {
        const xc = 0.5 * (trail[i].x + trail[i + 1].x);
        const yc = 0.5 * (trail[i].y + trail[i + 1].y);
        ctx.quadraticCurveTo(trail[i].x, trail[i].y, xc, yc);
        ctx.lineWidth = params.widthFactor * (params.pointsNumber - i);
        ctx.stroke();
      }
      ctx.lineTo(trail[trail.length - 1].x, trail[trail.length - 1].y);
      ctx.stroke();

      window.requestAnimationFrame(updateBubbles);
    }

    function setupCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  }, []);
  return (
    <canvas
      className='z-20 pointer-events-none absolute top-0 left-0 h-full w-full'
      ref={cursor}
    ></canvas>
  );
};

export default Cursor;
