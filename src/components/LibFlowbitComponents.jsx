'use client';
import React from 'react';
import { Avatar } from 'flowbite-react';
const FlowbitComponents = () => {
  return (
    <div className='flex flex-wrap gap-2'>
      <Avatar
        img='https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        alt='avatar of Jese'
        rounded
      />
      {/** <Avatar img='/images/people/profile-picture-5.jpg' /> (local) */}
    </div>
  );
};

export default FlowbitComponents;
