// import studio from '@theatre/studio';
// import extension from '@theatre/r3f/dist/extension';
import { BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Contact from './components/contact.jsx';
import About from './components/about.jsx';
import Nav from './components/nav.jsx';
// import Project from './components/project.jsx';

// if (import.meta.env.DEV) {
//   studio.initialize()
//   studio.extend(extension)
// }

// studio.ui.hide()



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className="absolute bg-[url('./assets/Background.jpg')] bg-cover bg-no-repeat brightness-[20%] h-screen w-full -z-10"></div>
    <React.Suspense fallback={
      null
      }>
      <BrowserRouter>
        <Routes>
          <Route>
            <Route  path="/" element={<App />} />
            {/* <Route  path="/" element={<Project />} /> */}
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
          </Route>
        </Routes>
        <Nav/>
      </BrowserRouter>
    </React.Suspense>
  </React.StrictMode>,
);
