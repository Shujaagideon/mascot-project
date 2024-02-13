/* eslint-disable react/prop-types */
import gsap from 'gsap';
import hq from '../assets/hq.webp';
import placeholder from '../assets/placeholder.webp';
import placeholder2 from '../assets/placeholder2.webp';
import placeholder3 from '../assets/placeholder3.webp';
import placeholder4 from '../assets/placeholder4.webp';


const Project = ({projectRef}) => {

    const projectPage =()=>{
        gsap.to(projectRef.current, {
            opacity: 0,
            duration: 0.2,
            onComplete:()=>{
              projectRef.current.style.visibility = 'hidden'
          }
        })
      }
  return (
    <div className='w-full h-screen absolute overflow-y-auto text-slate-100'>
        {/* <div onClick={projectPage} className='cursor-pointer z-10 absolute right-10 top-10 rounded-full w-10 h-10 border border-slate-50 flex justify-center items-center'><p className='text-lg leading-3'>x</p></div> */}
        <div className="h-screen p-4 md:p-20 pt-32 w-full relative">
            <div className='h-full w-full absolute top-0 left-0'>
                <img className='h-full w-full object-cover' src={hq} alt=''/>
            </div>
            <h1 className='z-10 relative font-elza_bold text-6xl'>TAWAZUN</h1>
            <h3 className='z-10 relative font-elza text-6xl'>IDEX 2023</h3>
        </div>
        <div className="h-fit lg:h-[40vh] px-2 md:px-10 lg:px-24 my-16 md:my-24 w-full flex flex-col md:flex-row justify-between">
            <p className='w-full mb-10 md:mb-0 md:w-3/5 lg:w-1/2'>Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Molestias, blanditiis voluptates, quibusdam deleniti, alias minima et unde adipisci asperiores explicabo libero corrupti.
            Molestias, blanditiis voluptates, quibusdam deleniti, alias minima et unde adipisci asperiores explicabo libero corrupti.
            Molestias, blanditiis voluptates, quibusdam deleniti, alias minima et unde adipisci asperiores explicabo libero corrupti.
            Molestias, blanditiis voluptates, quibusdam deleniti, alias minima et unde adipisci asperiores explicabo libero corrupti.
            Id architecto quis, sit assumenda qui neque ullam?</p>
            <div className='w-3/5 flex items-center flex-col md:block md:w-1/4 lg:w-2/5'>
                <p className='pb-3 mb-3 border-b border-green-300 w-fit'>Lorem, ipsum dolor.</p>
                <p className='pb-3 mb-3 border-b border-green-300 w-fit'>Lorem, ipsum dolor.</p>
                <p className='pb-3 mb-3 border-b border-green-300 w-fit'>Lorem, ipsum dolor.</p>
                <p className='pb-3 mb-3 border-b border-green-300 w-fit'>Lorem, ipsum dolor.</p>
                <p className='pb-3 mb-3 border-b border-green-300 w-fit'>Lorem, ipsum dolor.</p>
            </div>
        </div>
        <div className='flex flex-col h-fit md:h-[40vh] lg:h-[60vh] md:flex-row justify-between'>
            <img className='w-full mb-4 md:mb-0 md:w-[49.5%]' src={placeholder3} alt="" />
            <img className='w-full md:w-[49.5%] h-full' src={placeholder4} alt="" />
        </div>
        <div className='h-fit mt-6'>
            <img className='h-[50vh] md:h-[75vh] lg:h-screen w-full mb-6' src={placeholder} alt="" />
            <img className='h-[50vh] md:h-[75vh] lg:h-screen w-full mb-6' src={placeholder2} alt="" />
            <img className='h-[50vh] md:h-[75vh] lg:h-screen w-full mb-6' src={placeholder} alt="" />
        </div>
    </div>
  )
}

export default Project