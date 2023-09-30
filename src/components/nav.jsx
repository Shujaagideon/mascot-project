import { Link, useNavigate } from "react-router-dom"

const Nav = ()=>{
    

    
    return(
      <nav className='flex fixed z-30 font-bold text-slate-200 justify-between items-center h-20 w-screen p-2 px-8'>
          <Link to='/'>
            <h2>Project</h2>
          </Link>
          <div className="flex justify-between w-1/5">
            <Link to='/about'>
              <h2>About us</h2>
            </Link>
            <Link to='/contact'>
              <h2>Contact us</h2>
            </Link>
          </div>
        </nav>
    )
}

export default Nav;