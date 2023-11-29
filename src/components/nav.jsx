import { Link, useLocation } from "react-router-dom"
import { useStore } from "../App";

const Nav = ()=>{
    let location = useLocation();
    const setClicked = useStore((state) => state.setClicked);

    return(
      <nav className='flex pointer-events-none font-elza fixed z-30 font-bold text-slate-200 justify-between items-center h-20 w-screen p-2 md:px-8'>
        {location.pathname !== '/' ?
          <Link to='/'>
            <h2 className="uppercase pointer-events-auto">Project</h2>
          </Link>
        :
          <h2 onClick={setClicked} className="cursor-pointer pointer-events-auto uppercase">Project</h2>
        }
          <div className="flex justify-between w-3/5 md:w-2/5 lg:w-1/5">
            <Link to='/about'>
              <h2 className={`uppercase pointer-events-auto ${location.pathname === '/about' && 'text-xl font-elza_medium'}`}>About us</h2>
            </Link>
            <Link to='/contact'>
              <h2 className={`uppercase pointer-events-auto ${location.pathname === '/contact' && 'text-xl font-elza_medium'}`}>Contact us</h2>
            </Link>
          </div>
        </nav>
    )
}

export default Nav;