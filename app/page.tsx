'use client';
import Image from 'next/image';
import Logo from '@/public/logo.png';
import Image1 from '@/public/onboarding1.png';
import Image2 from '@/public/onboarding2.png';
import Image3 from '@/public/onboarding3.png';
import Image4 from '@/public/onboarding4.png';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTelegramAuth } from '@/hooks/useTelegramAuth';
import WebApp from '@twa-dev/sdk';

const ONBOARDING_SCREENS = [
  {
    id: 1,
    image: Image1,
    title: 'Welcome aboard!',
    description: 'We are thrilled to have you onboard. Meme Cycle is all about building a community that benefits from the exploding Solana Meme Token season. Lets go!',
  },
  {
    id: 2,
    image: Image2,
    title: 'Join Official Telegram Channel',
    description: 'We want you to make the most out of our amazing platfrom, hence we recommend joining the official telegram channel of Meme Cycle for regular updates and insights.',
  },
  {
    id: 3,
    image: Image3,
    title: 'Connect wallet',
    description: 'We want you to make the most out of our amazing platfrom, hence we recommend joining the official telegram channel of Meme Cycle for regular updates and insights.',
  },
  {
    id: 4,
    image: Image4,
    title: 'Deposit Solana',
    description: 'We want you to make the most out of our amazing platfrom, hence we recommend joining the official telegram channel of Meme Cycle for regular updates and insights.',
  },
];

export default function Onboarding() {
  const [currentScreen, setCurrentScreen] = useState(0);
  const { mutate: login, isLoading, error } = useTelegramAuth();

const handleTelegramLogin = () => {
  if (typeof window !== 'undefined' && WebApp) {
    WebApp.ready();
    const telegramUser = WebApp.initDataUnsafe;
    console.log(telegramUser);
    if (telegramUser?.user && WebApp.initData) {
      login({
        telegramId: telegramUser.user.id,
        telegramToken: WebApp.initData,
      });
    }
  } else {
    console.error('Telegram WebApp not available');
  }
};

  const handleNextScreen = () => {
    if (currentScreen < ONBOARDING_SCREENS.length - 1) {
      setCurrentScreen((prev) => prev + 1);
    } else {
      handleTelegramLogin();
    }
  };

  const slideVariants = {
    initial: { opacity: 0, x: 300 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -300 },
  };

  return (
    <div className='flex-grow max-w-2xl mx-auto w-full flex flex-col'>
      <div className="flex-grow w-full gap-6 flex flex-col items-center px-4 py-11 bg-[url('/bottom-glow.png')] bg-bottom bg-no-repeat bg-cover">
        <div className='mt-3 flex justify-center gap-3 mb-12'>
          <Image src={Logo} alt='meme cycle logo' />
          <p className='font-bold text-xl'>Meme Cycle</p>
        </div>

        {/* Animated Screens */}
        <AnimatePresence mode='wait'>
          <motion.div
            key={currentScreen}
            initial='initial'
            animate='animate'
            exit='exit'
            variants={slideVariants}
            transition={{ duration: 0.5 }}
            className='flex flex-col items-center text-center space-y-6'
          >
            <Image src={ONBOARDING_SCREENS[currentScreen].image} alt='Onboarding Illustration' className='mb-4' />

            {/* Progress Indicator */}
            <div className='flex space-x-2 pb-16'>
              {ONBOARDING_SCREENS.map((_, index) =>
                currentScreen === index ? <div key={index} className='w-7 h-[6px] bg-[#3F88EB] rounded-full' /> : <div key={index} className='w-[6px] h-[6px] bg-[#D9D9D9] rounded-full' />
              )}
            </div>

            <h2 className='text-xl font-bold'>{ONBOARDING_SCREENS[currentScreen].title}</h2>
            <p className='font-normal text-sm max-w-md'>{ONBOARDING_SCREENS[currentScreen].description}</p>
          </motion.div>
        </AnimatePresence>

        {error && <p className='text-red-500'>{error.message}</p>}
        <Button
          onClick={handleNextScreen}
          disabled={isLoading}
          className='mt-auto w-full bg-mainBtnGradient shadow-md shadow-[#0030781A] rounded-[10px] h-fit py-4 text-white font-bold text-sm'
          size='lg'
        >
          {currentScreen < ONBOARDING_SCREENS.length - 1 ? 'Next' : 'Get Started'}
        </Button>
      </div>
    </div>
  );
}
