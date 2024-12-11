import React from 'react';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { Button } from './ui/button';
import { MemeType } from '@/types';
import Image from 'next/image';

const MemeDrawer = ({ meme, isOpen, onClose }: { meme: MemeType | null; isOpen: boolean; onClose: () => void }) => {
  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className='px-5 py-4 bg-drawerGradient bg-top bg-no-repeat flex flex-col items-center'>
        <DrawerHeader className='flex flex-col items-center gap-0'>
          <Image src={meme?.image || ''} alt={meme?.title || 'meme pic'} width={100} height={100} className='mb-5' />
          <DrawerTitle className='font-bold text-xl'>{meme?.title}</DrawerTitle>
          <DrawerDescription className='font-normal text-sm text-[#A8A8A8]'>{meme?.description}</DrawerDescription>
        </DrawerHeader>
        <div className='w-full flex flex-col items-center gap-3 mb-14'>
          <div className='w-full flex flex-col items-center py-2 gap-1 border-b border-b-[#23427E]'>
            <span className='font-bold text-sm'>Total Growth</span>
            <span className='font-normal text-sm text-[#A8A8A8]'>+{meme?.growth}%</span>
          </div>
          <div className='w-full flex flex-col items-center py-2 gap-1 border-b border-b-[#23427E]'>
            <span className='font-bold text-sm'>Total Supply</span>
            <span className='font-normal text-sm text-[#A8A8A8]'>+{meme?.supply}%</span>
          </div>
          <div className='w-full flex flex-col items-center py-2 gap-1 border-b border-[#23427E]'>
            <span className='font-bold text-sm'>Market Cap</span>
            <span className='font-normal text-sm text-[#A8A8A8]'>+{meme?.marketCap}%</span>
          </div>
          <div className='w-full flex flex-col items-center py-2 gap-1 border-b border-b-[#23427E]'>
            <span className='font-bold text-sm'>Community Engagement</span>
            <span className='font-normal text-sm text-[#A8A8A8]'>+{meme?.communityEngagement}%</span>
          </div>
        </div>
        <DrawerFooter className='w-full'>
          <DrawerClose>
            <Button className='w-full bg-mainBtnGradient shadow-md shadow-[#0030781A] rounded-[10px] h-fit py-4 text-white font-bold text-sm' onClick={onClose}>
              That’s Cool!
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default MemeDrawer;
