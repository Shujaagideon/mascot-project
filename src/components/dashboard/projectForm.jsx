import React, { useEffect, useState } from 'react';
import {
  Text,
  Button,
  Heading,
  HStack,
  Spinner,
  useToast,
} from '@chakra-ui/react';
import InputField from '../inputField';
import TextArea from '../textarea';
import Dropzone from '../dropzone';
import { useDropzone } from 'react-dropzone';
import { db } from '../../firebase';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { v4 as uuid } from 'uuid';
import { upload, uploadMultiple } from '../../storage';
import { useParams } from 'react-router-dom';

const schema = z.object({
  heading1: z.string().min(1, 'Heading 1 is required'),
  heading2: z.string().min(1, 'Heading 2 is required'),
  description: z.string().min(1, 'Descrition is required.'),
  text1: z.string().min(1, 'Text 1 is required'),
  text2: z.string().min(1, 'Text 2 is required'),
  text3: z.string().min(1, 'Text 3 is required'),
  text4: z.string().min(1, 'Text 4 is required'),
  text5: z.string().min(1, 'Text 5 is required'),
});

const ProjectForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(schema),
  });
  const [heroImage, setHeroImage] = useState([]);
  const [projectImages, setProjectImages] = useState([]);
  const { id } = useParams();

  const dropzoneConfig = {
    accept: {
      'image/png': ['.png'],
      'image/jpeg': '.jpeg',
    },
  };

  useEffect(() => {
    if (!id) return;

    const docRef = doc(db, 'projects', id);
    getDoc(docRef)
      .then(docSnap => {
        if (docSnap.exists()) {
          const { data } = docSnap.data();
          setValue('heading1', data.heading1);
          setValue('heading2', data.heading2);
          setValue('description', data.description);
          setValue('text1', data.text1);
          setValue('text2', data.text2);
          setValue('text3', data.text3);
          setValue('text4', data.text4);
          setValue('text5', data.text5);
          console.log('Document data:', data);
        } else {
          // docSnap.data() will be undefined in this case
          console.log('No such document!');
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const removeImages = () => {
    setProjectImages([]);
    setHeroImage([]);
  };
  const hero = useDropzone({
    maxFiles: 1,
    ...dropzoneConfig,
    onDrop: acceptedFiles => {
      setHeroImage(acceptedFiles);
    },
  });

  const project = useDropzone({
    maxFiles: 10,
    ...dropzoneConfig,
    onDrop: acceptedFiles => {
      setProjectImages(acceptedFiles);
    },
  });

  const toast = useToast();

  const onSubmit = async data => {
    if (!heroImage.length && !id)
      return toast({
        title: 'Cover Image (Hero section) required.',
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });

    if (!projectImages.length && !id)
      return toast({
        title: 'Project Images required.',
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });

    setIsLoading(true);

    toast({
      position: 'top-right',
      duration: null,
      render: () => (
        <div className='rounded-lg p-4 bg-slate-800 m-5 flex justify-center items-center gap-4'>
          <Spinner size='lg' />
          <Text>Uploading to the remote server...</Text>
        </div>
      ),
    });

    const heroURL = await upload(heroImage[0]);
    const projectURL = await uploadMultiple(projectImages);
    if (!id)
      await setDoc(doc(db, 'projects', uuid()), {
        data,
        cover: heroURL,
        images: projectURL,
      });
    else {
      const docRef = doc(db, 'projects', id);

      const body = {
        data,
      };

      await updateDoc(docRef, body);
    }

    setIsLoading(false);

    toast.closeAll();

    toast({
      title: 'Project Added.',
      status: 'success',
      duration: 2000,
      isClosable: true,
      position: 'top-right',
    });

    reset();
    removeImages();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='my-12 px-12 '>
      <Heading size={'lg'} as={'h2'} textTransform={'uppercase'} mb={5}>
        Hero Section
      </Heading>
      <Dropzone {...hero} files={heroImage} />
      <HStack gap={5}>
        <InputField
          error={errors.heading1?.message}
          label='Heading 1'
          {...register('heading1')}
        />
        <InputField
          error={errors.heading2?.message}
          label='Heading 2'
          {...register('heading2')}
        />
      </HStack>
      <Heading size='lg' as={'h2'} textTransform={'uppercase'} mb={5} mt={10}>
        Paragraph Section
      </Heading>
      <Dropzone {...project} files={projectImages} />
      <TextArea
        label='Paragraph'
        {...register('description')}
        error={errors.description?.message}
      />
      <HStack gap={5}>
        <InputField
          error={errors.text1?.message}
          label='Short text 1'
          {...register('text1')}
        />
        <InputField
          error={errors.text2?.message}
          label='Short text 2'
          {...register('text2')}
        />
      </HStack>
      <HStack gap={5}>
        <InputField
          error={errors.text3?.message}
          label='Short text 3'
          {...register('text3')}
        />
        <InputField
          error={errors.text4?.message}
          label='Short text 4'
          {...register('text4')}
        />
      </HStack>
      <InputField
        error={errors.text5?.message}
        label='Short text 5'
        {...register('text5')}
      />
      <Button
        colorScheme='green'
        type='submit'
        cursor={'pointer'}
        w={'94%'}
        mt={3}
        textTransform={'uppercase'}
        isLoading={isLoading}
      >
        Add Project
      </Button>
    </form>
  );
};

export default ProjectForm;
