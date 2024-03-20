/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';

// import gsap from 'gsap';
import hq from '../assets/hq.webp';
import placeholder from '../assets/placeholder.webp';
import placeholder2 from '../assets/placeholder2.webp';
import placeholder3 from '../assets/placeholder3.webp';
import placeholder4 from '../assets/placeholder4.webp';
import axios from 'axios';


const Project = () => {

    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/project');
                console.log(response.data)
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);      
            }
        };

        fetchData();
    }, []);

    if (!data) {
        return <div className="h-screen w-full bg-black text-slate-200 flex items-center justify-center">Loading...</div>;
    }

    // const projectPage =()=>{
    //     gsap.to(projectRef.current, {
    //         opacity: 0,
    //         duration: 0.2,
    //         onComplete:()=>{
    //           projectRef.current.style.visibility = 'hidden'
    //       }
    //     })
    // }
  return (
    <div className='w-full h-screen absolute overflow-y-auto text-slate-100'>
        {/* <div onClick={projectPage} className='cursor-pointer z-10 absolute right-10 top-10 rounded-full w-10 h-10 border border-slate-50 flex justify-center items-center'><p className='text-lg leading-3'>x</p></div> */}
        <div className="h-screen p-4 md:p-20 pt-32 w-full relative">
            <div className='h-full w-full absolute top-0 left-0'>
                <img className='h-full w-full object-cover' src={data.hero.image} alt=''/>
            </div>
            <h1 className='z-10 relative font-elza_bold text-6xl'>{data.hero.heading1}</h1>
            <h3 className='z-10 relative font-elza text-6xl'>{data.hero.heading2}</h3>
        </div>
        <div className="h-fit lg:h-[40vh] px-2 md:px-10 lg:px-24 my-16 md:my-24 w-full flex flex-col md:flex-row justify-between">
            <p className='w-full mb-10 md:mb-0 md:w-3/5 lg:w-1/2'>{data.paragraph.text}</p>
            <div className='w-3/5 flex items-center flex-col md:block md:w-1/4 lg:w-2/5'>
                <p className='pb-3 mb-3 border-b border-green-300 w-fit'>{data.paragraph.shortTexts[0]}</p>
                <p className='pb-3 mb-3 border-b border-green-300 w-fit'>{data.paragraph.shortTexts[1]}</p>
                <p className='pb-3 mb-3 border-b border-green-300 w-fit'>{data.paragraph.shortTexts[2]}</p>
                <p className='pb-3 mb-3 border-b border-green-300 w-fit'>{data.paragraph.shortTexts[3]}</p>
                <p className='pb-3 mb-3 border-b border-green-300 w-fit'>{data.paragraph.shortTexts[4]}</p>
            </div>
        </div>
        <div className='flex flex-col h-fit md:h-[40vh] lg:h-[60vh] md:flex-row justify-between'>
            <img className='w-full mb-4 md:mb-0 md:w-[49.5%]' src={data.projects.images[0]} alt="" />
            <img className='w-full md:w-[49.5%] h-full' src={data.projects.images[1]} alt="" />
        </div>
        <div className='h-fit mt-6'>
            <img className='h-[50vh] md:h-[75vh] lg:h-screen w-full mb-6' src={data.projects.images[2]} alt="" />
            <img className='h-[50vh] md:h-[75vh] lg:h-screen w-full mb-6' src={data.projects.images[1]} alt="" />
            <img className='h-[50vh] md:h-[75vh] lg:h-screen w-full mb-6' src={data.projects.images[3]} alt="" />
        </div>
    </div>
  )
}

export default Project