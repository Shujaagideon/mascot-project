import { CloseIcon } from '@chakra-ui/icons';
import React, { useMemo } from 'react';

const Dropzone = ({ files, getRootProps, getInputProps }) => {
  const imgFiles = useMemo(
    () =>
      files.map(file => (
        <li key={file.path} className='flex'>
          {file.path} - {file.size} bytes
        </li>
      )),
    [files]
  );

  return (
    <section className='flex flex-col'>
      <div
        {...getRootProps({
          className:
            'py-20 px-10  rounded-md mb-2 cursor-pointer text-center border-2 border-dashed border-white-900 text-white',
        })}
      >
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <aside className='my-10'>
        {imgFiles.length ? (
          <>
            <h4>Files</h4>
            <ul>{imgFiles}</ul>
          </>
        ) : null}
      </aside>
    </section>
  );
};

export default Dropzone;
