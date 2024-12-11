import Image, { StaticImageData } from 'next/image';
import React from 'react';

const TaskCard = ({ title, desc, pic }: { title: string; desc: string; pic: string | StaticImageData }) => {
  return (
    <div className='p-3 rounded-2xl bg-[#250C68] bg-opacity-20 flex items-center justify-center gap-3 text-start max-w-sm'>
      <Image src={pic} alt={title} width={42} height={24} />
      <div className='flex flex-col gap-1'>
        <p className='font-bold text-sm'>{title}</p>
        <p className='font-light text-[10px]'>{desc}</p>
      </div>
    </div>
  );
};

export default TaskCard;
