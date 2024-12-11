import React from 'react';
import { Button } from './ui/button';

const Header = () => {
  return (
    <header
      className='w-full max-w-2xl mx-auto flex items-center justify-center rounded-b-[20px] bg-borderGradient
        pb-0.5'
    >
      <div className='w-full flex justify-between gap-3 items-center p-4 rounded-b-[20px] bg-bg-dark'>
        <p className='font-bold text-sm leading-[1.3]'>Get the Next Big Solana Meme Token!</p>
        <Button variant='secondary' className='font-bold text-xs bg-[#5F1EFF] rounded-xl h-fit p-3'>
          Connect Wallet
        </Button>
      </div>
    </header>
  );
};

export default Header;
