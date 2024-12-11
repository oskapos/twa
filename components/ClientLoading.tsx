import React from 'react';

const ClientLoading = () => {
  return (
    <div className='flex justify-center items-center grow w-full h-full'>
      <div className='flex justify-center items-center py-9 m-auto'>
        <div className='animate-spin rounded-full h-20 w-20 border-b-2 border-stop-color-red-500' />
      </div>
    </div>
  );
};

export default ClientLoading;
