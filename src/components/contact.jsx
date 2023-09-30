// import React from 'react'

const Contact = () => {
  return (
    <div className='h-screen fixed flex justify-center items-center w-full px-20 z-30 bg-transparent'>
        <div className="w-full my-auto">
          <h2 className='uppercase text-6xl mb-24 font-bold text-slate-100'>Get In touch with us</h2>

          <form action="" className='w-3/4'>
              <div className="flex w-full h-fit mb-10 justify-between">
                  <input placeholder='name' className='p-3 px-6 h-20 w-[47%] rounded-3xl backdrop:blur-md text-slate-100 bg-transparent border border-slate-100  placeholder:text-slate-100'/>
                  <input placeholder='name' className='p-3 px-6 h-20 w-[47%] rounded-3xl backdrop:blur-md text-slate-100 bg-transparent border border-slate-100  placeholder:text-slate-100'/>
              </div>
              <textarea placeholder="Write a message ..." className="p-6 w-full rounded-3xl backdrop:blur-md text-slate-100 bg-transparent border border-slate-100  placeholder:text-slate-100" name="" id="" cols="30" rows="10"></textarea>
          </form>
        </div>
    </div>
  )
}

export default Contact