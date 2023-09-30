import { Link, useNavigate } from 'react-router-dom'
import R3fCanvas from './components/canvas'
import Cursor from './components/cursor'
import Nav from './components/nav'
import React from 'react'

function App() {
  const navigate = useNavigate();

  // React.useEffect(()=>{
  //   navigate('/about');
  //   navigate('/')
  // },[]);

  return (
    <>
      <Nav/>
      <R3fCanvas/>
      {/* <Cursor/> */}
    </>
  )
}

export default App