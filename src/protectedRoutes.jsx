import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useColorMode } from '@chakra-ui/react';

const ProtectedRoute = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  const { setColorMode } = useColorMode();
  useEffect(() => {
    setColorMode('dark');
  }, []);

  return user ? <Outlet /> : <Navigate to='/login' />;
};
export default ProtectedRoute;
