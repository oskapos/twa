import React from 'react';

const loading = () => {
  return (
    <div className='flex justify-center items-center w-screen h-screen'>
      <div className='flex justify-center items-center py-9 m-auto'>
        <div className='animate-spin rounded-full h-20 w-20 border-b-2 border-pink-500' />
      </div>
    </div>
  );
};

export default loading;
