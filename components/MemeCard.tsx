'use client';
import { Info } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import FlamePic from '@/public/flame.png';
import Chevron from '@/public/chev-green.svg';
import { MemeType } from '@/types';

const MemeCard = ({ meme, onOpenDrawer, bgColor }: { meme: MemeType; onOpenDrawer: (meme: MemeType) => void; bgColor: string }) => {
  return (
    <div
      className={`rounded-xl bg-no-repeat bg-bottom bg-[#280C6F8C] bg-blend-soft-light p-2 flex flex-col cursor-pointer`}
      style={{ backgroundImage: `url(${bgColor})` }}
      onClick={() => onOpenDrawer(meme)}
    >
      <div className='flex justify-between'>
        <div className='rounded-full bg-[#250C68] flex justify-center items-center gap-1 px-2 py-1 h-fit'>
          <Info className='text-[#B5B5B5] h-2 w-2' />
          <p className='font-semibold text-[8px] text-[#B5B5B5] leading-none'>{meme.title}</p>
        </div>
        <Image src={FlamePic} alt='a flame' />
      </div>
      <div className='flex justify-center mb-3'>
        <Image src={meme.image} alt={`${meme.title} meme`} width={88} height={88} />
      </div>
      <div className='rounded-sm bg-[#0000003B] flex items-center justify-center gap-2 py-2 px-8'>
        <Image src={Chevron} alt='chevron' />
        <p className='font-semibold text-xs text-[#2BDA27]'>{meme.growth}%</p>
      </div>
    </div>
  );
};

export default MemeCard;
