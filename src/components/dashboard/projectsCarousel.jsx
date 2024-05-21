import React, { useEffect, useState, useRef } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../firebase';
import { horizontalLoop, parseUrl } from '../../utils';
import { useNavigate } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Flip from 'gsap/dist/Flip';

const ProjectsCarousel = () => {
  const [projects, setProjects] = useState([]);
  const [loop, setLoop] = useState();
  const imagesRef = useRef([]);
  const containerRef = useRef();
  const [paused, setPaused] = useState(false);
  const [selectedImg, setSelectedImg] = useState(-1);
  const [animation, setAnimation] = useState(null);

  useEffect(() => {
    gsap.registerPlugin(Flip);
  }, []);

  useEffect(() => {
    if (loop && loop.paused() && !paused) loop.resume();
  }, [projects, loop]);

  useEffect(() => {
    async function fetch() {
      const projects = await getDocs(collection(db, 'projects'));
      setProjects(
        projects.docs.map(project => ({ id: project.id, ...project.data() }))
      );
    }

    fetch();
  }, []);

  const { contextSafe } = useGSAP(
    () => {
      if (!imagesRef.current.length) return;
      const loop = horizontalLoop(imagesRef.current, {
        repeat: -1,
        paused: true,
      });
      setLoop(loop);
    },
    { dependencies: [imagesRef.current, projects], container: containerRef }
  );

  const handleMouseEnter = contextSafe(project => {
    const animation = gsap.to(imagesRef.current[project.i], {
      scale: 1.3,
      duration: 0.3,
      onStart: () => {
        loop.pause();
        setSelectedImg(project.i);
        imagesRef.current[project.i].style.zIndex = 1;
      },
    });

    setAnimation(animation);
  });

  const handleMouseLeave = () => {
    animation.reverse();
    setAnimation(null);
    imagesRef.current[selectedImg].style.zIndex = 0;
    setSelectedImg(-1);
    loop.resume();
  };

  const navigate = useNavigate();

  if (!projects.length) return <></>;

  return (
    <>
      <div className=' bg-[url(./assets/wave.png)] h-screen w-full bg-cover uppercase flex justify-center items-center'>
        <h2 className=' text-center uppercase text-4xl md:text-6xl font-bold text-slate-100'>
          Prevous Projects
        </h2>
      </div>
      <div className='h-screen w-full md:w-[150%]  text-slate-100 flex justify-center'>
        <div
          className='h-screen w-full flex justify-center items-center overflow-hidden'
          ref={containerRef}
        >
          {projects.map((project, i) => (
            <img
              loading='lazy'
              src={project.cover}
              alt={project.data.heading1}
              className={`h-2/4 aspect-square md:aspect-video object-cover cursor-pointer z-0`}
              ref={el => (imagesRef.current[i] = el)}
              onClick={() => {
                navigate(`/projects/${parseUrl(project.data.heading1)}`);
              }}
              onMouseEnter={() => handleMouseEnter({ ...project, i })}
              onMouseLeave={handleMouseLeave}
              key={project.id}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProjectsCarousel;
