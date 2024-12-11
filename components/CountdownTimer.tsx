'use client';
import React, { useEffect, useState } from 'react';

interface CountdownTimerProps {
  endDate: string;
}
const CountdownTimer = ({ endDate }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
  });

  // Function to calculate time difference
  const calculateTimeLeft = () => {
    const targetDate = new Date(endDate).getTime();
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

      setTimeLeft({ days, hours, minutes });
    } else {
      setTimeLeft({ days: 0, hours: 0, minutes: 0 });
    }
  };

  // UseEffect to update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      calculateTimeLeft();
    }, 1000);

    return () => clearInterval(timer); // Cleanup interval on unmount
  }, [endDate]);

  return (
    <div className='w-full flex items-center bg-transparent relative'>
      {/* Gradient Glow Effect */}
      <div className='absolute -inset-0.5 bg-gradient-to-r from-[#6A38F5] via-[#EA245A] to-[#EB8145] rounded-lg blur-md backdrop-blur-xl' />
      {/* Main Container */}
      <div className='w-full py-2.5 px-4 rounded-2xl flex items-center justify-between bg-darkGradient border-[0.5px] border-col-border boxShadow relative z-10'>
        <p className='font-normal text-sm'>Next Meme Token Unlocks in</p>
        <div className='flex justify-between gap-3'>
          <div className='flex flex-col items-center'>
            <p className='font-semibold text-xl'>{timeLeft.days}</p>
            <p className='font-normal text-[8px] text-[#2B4366]'>days</p>
          </div>
          <p className='font-semibold text-xl'> : </p>
          <div className='flex flex-col items-center'>
            <p className='font-semibold text-xl'>{timeLeft.hours}</p>
            <p className='font-normal text-[8px] text-[#2B4366]'>hours</p>
          </div>
          <p className='font-semibold text-xl'> : </p>
          <div className='flex flex-col items-center'>
            <p className='font-semibold text-xl'>{timeLeft.minutes}</p>
            <p className='font-normal text-[8px] text-[#2B4366]'>mins</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
