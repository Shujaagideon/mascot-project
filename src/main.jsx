// import studio from '@theatre/studio';
// import extension from '@theatre/r3f/dist/extension';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './index.css';

import Contact from './components/contact.jsx';
import About from './components/about.jsx';
import Nav from './components/nav.jsx';
import Project from './components/project.jsx';
import Dashboard from './components/dashboard/index.jsx';
import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react';
import { theme } from './theme.js';
import ProjectForm from './components/dashboard/projectForm.jsx';
import ProjectsCarousel from './components/dashboard/projectsCarousel.jsx';
import Login from './components/login.jsx';
import ProtectedRoute from './protectedRoutes.jsx';
import Logout from './components/logout.jsx';
import ProjectTable from './components/dashboard/projects.jsx';

// if (import.meta.env.DEV) {
//   studio.initialize()
//   studio.extend(extension)
// }

// studio.ui.hide()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeProvider>
        <div className="absolute bg-[url('./assets/Background.jpg')] bg-cover bg-no-repeat brightness-[20%] h-screen w-full -z-10"></div>
        <React.Suspense fallback={null}>
          <BrowserRouter>
            <Nav />
            <Routes>
              <Route>
                <Route path='/' element={<App />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/about' element={<About />} />
                <Route path='/projects' element={<ProjectsCarousel />} />
                <Route path='/projects/:id' element={<Project />} />
                <Route exact path='/' element={<ProtectedRoute />}>
                  <Route exact path='/dashboard' element={<Dashboard />}>
                    <Route path='/dashboard' element={<ProjectTable />} />
                    <Route path='save' element={<ProjectForm />} />
                    <Route path='save/:id' element={<ProjectForm />} />
                  </Route>
                </Route>
                <Route path='/logout' element={<Logout />} />
              </Route>
              <Route path='/login' element={<Login />} />
            </Routes>
            {/* <Nav /> */}
          </BrowserRouter>
        </React.Suspense>
      </ColorModeProvider>
    </ChakraProvider>
  </React.StrictMode>
);
