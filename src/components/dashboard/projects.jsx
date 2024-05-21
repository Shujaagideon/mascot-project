import React, { useEffect, useState } from 'react';
import {
  TableContainer,
  Tr,
  Th,
  Thead,
  Tbody,
  Td,
  Button,
  Text,
  Table,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { getDocs, collection, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { DeleteIcon, EditIcon, ViewIcon } from '@chakra-ui/icons';
import Dialog from './dialog';

const projects = () => {
  const [projects, setProjects] = useState([]);
  const [result, setResult] = useState(false);
  const [deleteId, setDeleteId] = useState('');

  const disclosure = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    async function fetch() {
      const projects = await getDocs(collection(db, 'projects'));
      setProjects(
        projects.docs.map(project => ({ id: project.id, ...project.data() }))
      );
    }

    fetch();
  }, []);

  useEffect(() => {
    if (!result) return;
    else {
      setProjects(projects.filter(project => project.id !== deleteId));
      toast({
        title: 'Project deleted',
        description: 'Project has been successfully deleted.',
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'top-right',
      });
      deleteDoc(doc(db, 'projects', deleteId))
        .catch(err => {
          console.log(err.message);
          toast({
            title: 'Error',
            description: err.message,
            status: 'error',
            duration: 9000,
            isClosable: true,
            position: 'top-right',
          });
        })
        .finally(() => {
          setResult(false);
          setDeleteId('');
        });
    }
  }, [result]);

  const handleDelete = id => {
    disclosure.onOpen();
    setDeleteId(id);
  };

  const renderProjects = () => {
    return projects.map(project => (
      <Tr key={project.id}>
        <Td>
          <Link to={`/projects/${project.id}`}>{project.data.heading1}</Link>
        </Td>
        <Td>{project.data.heading2}</Td>
        <Td>{project.data.text1}</Td>
        <Td>{project.data.text2}</Td>
        <Td>
          <Link to={`/dashboard/save/${project.id}`}>
            <EditIcon cursor={'pointer'} mr={2} />
          </Link>
          <DeleteIcon
            cursor={'pointer'}
            onClick={() => handleDelete(project.id)}
          />
        </Td>
      </Tr>
    ));
  };

  if (!projects.length)
    <div className='flex justify-center items-center h-screen w-full'>
      <Text>No projects found</Text>
    </div>;

  return (
    <>
      <Dialog disclosure={disclosure} setResult={setResult} />
      <TableContainer>
        <div className='p-4'>
          <Link to='/dashboard/add'>
            <Button colorScheme='blue'>Add New</Button>
          </Link>
        </div>
        <Table variant='simple' colorScheme='whiteAlpha'>
          <Thead>
            <Tr>
              <Th>Heading 1</Th>
              <Th>Heading 2</Th>
              <Th>Text 1</Th>
              <Th>Text 2</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>{renderProjects()}</Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default projects;
