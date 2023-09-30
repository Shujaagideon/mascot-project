import { Link, useLocation } from "react-router-dom"

const Nav = ()=>{
    let location = useLocation();
    
    return(
      <nav className='flex font-elza fixed z-30 font-bold text-slate-200 justify-between items-center h-20 w-screen p-2 px-8'>
          <Link to='/'>
            <h2 className="uppercase">Project</h2>
          </Link>
          <div className="flex justify-between w-3/5 md:w-2/5 lg:w-1/5">
            <Link to='/about'>
              <h2 className={`uppercase ${location.pathname === '/about' && 'text-xl font-elza_medium'}`}>About us</h2>
            </Link>
            <Link to='/contact'>
              <h2 className={`uppercase ${location.pathname === '/contact' && 'text-xl font-elza_medium'}`}>Contact us</h2>
            </Link>
          </div>
        </nav>
    )
}

export default Nav;