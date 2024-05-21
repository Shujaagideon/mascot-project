import React, { useState, useEffect } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { Button, Heading, useToast } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';

import InputField from './inputField';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { useColorMode } from '@chakra-ui/react';

const schema = z.object({
  email: z.string().email().min(1, 'Email is required'),
  password: z.string().min(1, 'Password is required'),
});

const Login = () => {
  const { setColorMode } = useColorMode();
  useEffect(() => {
    setColorMode('dark');
  }, []);
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const toast = useToast();
  const navigate = useNavigate();
  const onSubmit = async data => {
    try {
      const result = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      localStorage.setItem('user', JSON.stringify(result.user));
      toast({
        title: 'Login successful',
        description: 'You have successfully logged in.',
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'top-right',
      });

      navigate('/dashboard');
    } catch (err) {
      toast({
        title: 'Login failed',
        description: 'Invalid username or password',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className=' px-[30rem] h-screen flex justify-center items-center flex-col w-full'
    >
      <Heading size={'lg'} as={'h1'} textTransform={'uppercase'} mb={5}>
        Sign in
      </Heading>
      <InputField
        error={errors.username?.message}
        label=''
        placeholder='Input email.'
        {...register('email')}
      />
      <InputField
        error={errors.password?.message}
        label=''
        {...register('password')}
        placeholder='Input password.'
        type='password'
      />
      <Button
        colorScheme='green'
        type='submit'
        cursor={'pointer'}
        w={'90.5%'}
        mt={3}
        textTransform={'uppercase'}
        isLoading={isLoading}
      >
        Login
      </Button>
    </form>
  );
};

export default Login;
