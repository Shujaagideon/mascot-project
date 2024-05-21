/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDocs, query, where, collection } from 'firebase/firestore';
import { db } from '../firebase';
import { Link } from 'react-router-dom';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { serializeUrl } from '../utils';

const Project = ({ projectRef }) => {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    if (!id) return;

    const projectsRef = collection(db, 'projects');
    const q = query(
      projectsRef,
      where('data.heading1', '==', serializeUrl(id))
    );

    getDocs(q)
      .then(result => {
        if (!result.docs.length) return;
        setProject(result.docs[0].data());
      })
      .catch(err => {
        console.log(err);
      });

    // const docRef = doc(
    //   db,
    //   'projects',
    //   where('data.heading1', '==', serializeUrl(id))
    // );
    // getDoc(docRef)
    //   .then(docSnap => {
    //     if (docSnap.exists()) {
    //       const data = docSnap.data();
    //       setProject(data);
    //     } else {
    //       console.log('No such document!');
    //     }
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  }, []);

  if (!project) return <></>;

  return (
    <div className='w-full h-screen absolute overflow-y-auto text-slate-100'>
      {/* <div onClick={projectPage} className='cursor-pointer z-10 absolute right-10 top-10 rounded-full w-10 h-10 border border-slate-50 flex justify-center items-center'><p className='text-lg leading-3'>x</p></div> */}
      <div className='h-screen p-4 md:p-20 pt-32 w-full relative'>
        <div className='h-full w-full absolute top-0 left-0'>
          <img
            className='h-full w-full object-cover'
            src={project.cover}
            alt=''
          />
        </div>
        <h1 className='z-10 relative font-elza_bold text-6xl'>
          <span className='block mt-0'>
            <Link to={'/projects'}>
              <ArrowBackIcon boxSize={8} cursor={'pointer'} my={5} />
            </Link>
          </span>
          {project.data.heading1}
        </h1>
        <h3 className='z-10 relative font-elza text-6xl'>
          {project.data.heading2}
        </h3>
      </div>
      <div className='h-fit lg:h-[40vh] px-2 md:px-10 lg:px-24 my-16 md:my-24 w-full flex flex-col md:flex-row justify-between '>
        <p className='w-full mb-10 md:mb-0 md:w-3/5 lg:w-1/2 block'>
          {project.data.description}
        </p>
        <div className='w-3/5 flex items-center flex-col md:block md:w-1/4 lg:w-2/5 '>
          <p className='pb-3 mb-3 border-b border-green-300 w-fit block'>
            {project.data.text1}
          </p>
          <p className='pb-3 mb-3 border-b border-green-300 w-fit block'>
            {project.data.text2}
          </p>
          <p className='pb-3 mb-3 border-b border-green-300 w-fit block'>
            {project.data.text3}
          </p>
          <p className='pb-3 mb-3 border-b border-green-300 w-fit block'>
            {project.data.text4}
          </p>
          <p className='pb-3 mb-3 border-b border-green-300 w-fit block'>
            {project.data.text5}
          </p>
        </div>
      </div>
      {/* <div className='flex flex-col h-fit md:h-[40vh] lg:h-[60vh] md:flex-row justify-between'>
        <img
          className='w-full mb-4 md:mb-0 md:w-[49.5%]'
          src={placeholder3}
          alt=''
        />
        <img className='w-full md:w-[49.5%] h-full' src={placeholder4} alt='' />
      </div> */}
      <div className='h-fit mt-6'>
        {project.images.map((image, index) => (
          <img
            className='h-[50vh] md:h-[75vh] lg:h-screen w-full mb-6'
            src={image}
            alt=''
            key={index}
          />
        ))}
        {/* <img
          className='h-[50vh] md:h-[75vh] lg:h-screen w-full mb-6'
          src={placeholder2}
          alt=''
        />
        <img
          className='h-[50vh] md:h-[75vh] lg:h-screen w-full mb-6'
          src={placeholder}
          alt=''
        /> */}
      </div>
    </div>
  );
};

export default Project;
