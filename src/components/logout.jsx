import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';

const Logout = () => {
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    localStorage.removeItem('user');
    toast({
      title: 'Logout successful',
      description: 'You have successfully logged out.',
      status: 'success',
      duration: 9000,
      isClosable: true,
      position: 'top-right',
    });
    navigate('/login');
  }, []);

  return <></>;
};

export default Logout;
