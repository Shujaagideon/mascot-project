import { useColorMode } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useEffect } from 'react';
import SidebarItem from './sidebarItem';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ProjectsCarousel from './projectsCarousel';

function Dashboard() {
  const { setColorMode } = useColorMode();
  useEffect(() => {
    setColorMode('dark');
  }, []);

  return (
    <div className='min-h-full grid grid-cols-4'>
      {/* <div className='min-h-full flex justify-stretch items-stretch border-2 border-red-700 border-solid'> */}
      <div className='border-1 border-solid col-span-1 border-green-200 bg-black'>
        <SidebarItem text='Back to Home' link='/' />
        <SidebarItem text='Project' link='/dashboard' />
        <SidebarItem text='Add Project' link='save' />
        <SidebarItem text='Logout' link='/logout' />
      </div>
      {/* <div className='mx-auto mt-10 mb-20 border-solid border-red-500 border-2'> */}
      <div className='col-span-3 min-h-screen '>
        <Link to='/'>
          <ArrowBackIcon boxSize={8} cursor={'pointer'} my={5} />
        </Link>
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
