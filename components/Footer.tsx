'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import HomeIcon from '@/public/home-icon.svg';
import MemesIcon from '@/public/emoji-icon.svg';
import TasksIcon from '@/public/tasks-icon.svg';
import ExploreIcon from '@/public/logo-sm.svg';

const Footer = () => {
  const currentPath = usePathname();

  return (
    <footer className='w-full max-w-2xl mx-auto px-2 my-10 fixed bottom-3 left-1/2 -translate-x-1/2'>
      <nav className='rounded-2xl p-1 bg-col-footer-bg flex items-center justify-between border-[0.5px] border-col-border'>
        <Link href='/home' className={`rounded-xl flex flex-col items-center justify-center gap-[6px] py-2.5 px-4 ${currentPath === '/home' ? 'bg-[#34138A]' : 'bg-transparent'}`}>
          <div className='flex justify-center items-center h-5'>
            <Image src={HomeIcon} alt='home icon' />
          </div>
          <p className='font-normal text-xs'>Home</p>
        </Link>
        <Link href='/memes' className={`rounded-xl flex flex-col items-center justify-center gap-[6px] py-2.5 px-4 ${currentPath === '/memes' ? 'bg-[#34138A]' : 'bg-transparent'}`}>
          <div className='flex justify-center items-center h-5'>
            <Image src={MemesIcon} alt='memes icon' />
          </div>
          <p className='font-normal text-xs'>Memes</p>
        </Link>
        <Link href='/tasks' className={`rounded-xl flex flex-col items-center justify-center gap-[6px] py-2.5 px-4 ${currentPath === '/tasks' ? 'bg-[#34138A]' : 'bg-transparent'}`}>
          <div className='flex justify-center items-center h-5'>
            <Image src={TasksIcon} alt='tasks icon' />
          </div>

          <p className='font-normal text-xs'>Tasks</p>
        </Link>
        <Link href='/explore' className={`rounded-xl flex flex-col items-center justify-center gap-[6px] py-2.5 px-4 ${currentPath === '/explore' ? 'bg-[#34138A]' : 'bg-transparent'}`}>
          <div className='flex justify-center items-center h-5'>
            <Image src={ExploreIcon} alt='explore icon' />
          </div>

          <p className='font-normal text-xs'>Explore</p>
        </Link>
      </nav>
    </footer>
  );
};

export default Footer;
