import React from 'react';
import { Link } from 'react-router-dom';

const SidebarItem = ({ text, link }) => {
  return (
    <div className='flex flex-col font-medium'>
      <div>
        <span className='flex items-center px-10 py-[.775rem] cursor-pointer my-[.4rem] rounded-[.95rem] '>
          <Link
            to={link}
            className='flex items-center flex-grow text-[1.15rem] dark:text-neutral-400/75 text-stone-500 hover:text-neutral-300 '
          >
            {text}
          </Link>
        </span>
      </div>
    </div>
  );
};

export default SidebarItem;
