import { Link, useLocation } from 'react-router-dom';

const Nav = () => {
  let location = useLocation();

  return (
    <nav className='flex pointer-events-none font-elza fixed z-30 font-bold text-slate-200 justify-between items-center h-20 w-screen p-2 md:px-8 '>
      <div className='flex justify-between'>
        <Link to='/projects'>
          <h2 className='uppercase text-xs md:text-base mr-6 pointer-events-auto'>
            Project
          </h2>
        </Link>
        <a href='/'>
          <h2 className='uppercase text-xs md:text-base pointer-events-auto'>
            Home
          </h2>
        </a>
      </div>
      <div className='flex justify-between gap-5'>
        <Link to='/about'>
          <h2
            className={`uppercase text-xs md:text-base pointer-events-auto ${
              location.pathname === '/about' && 'text-xl font-elza_medium'
            }`}
          >
            About us
          </h2>
        </Link>
        <Link to='/contact'>
          <h2
            className={`uppercase text-xs md:text-base pointer-events-auto ${
              location.pathname === '/contact' && 'text-xl font-elza_medium'
            }`}
          >
            Contact us
          </h2>
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
