'use client';
import CountdownTimer from '@/components/CountdownTimer';
import Image from 'next/image';
import Logo from '@/public/logo.png';
import ClickerImage from '@/public/clicker-image.png';
import { Button } from '@/components/ui/button';
import { Lock } from 'lucide-react';
import { useState, useRef, useCallback, useEffect } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchUserData, syncTaps } from '@/lib/api';
import { motion, AnimatePresence } from 'framer-motion';
import ClientLoading from '@/components/ClientLoading';
import ClientError from '@/components/ClientError';

interface ClickEffect {
  id: number;
  x: number;
  y: number;
  value: number;
}

export default function Home() {
  const [clientTaps, setClientTaps] = useState(0);
  const {
    data: initialValue,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['gameValue'],
    queryFn: fetchUserData('', onQuerySuccess),
  });
  function onQuerySuccess(data: number) {
    setClientTaps(data);
  }

  const syncTapsMutation = useMutation<any, Error, number, { previousValue: number }>({
    mutationFn: syncTaps(),
  });

  const [debouncedSyncTimeout, setDebouncedSyncTimeout] = useState<NodeJS.Timeout | null>(null);

  // State for tracking clicks and click effects
  const [clickEffects, setClickEffects] = useState<ClickEffect[]>([]);
  // Image pressure state
  const [pressureScale, setPressureScale] = useState(1);
  const [clickCount, setClickCount] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(Date.now());

  const imageRef = useRef<HTMLDivElement>(null);

  // Debounced sync function
  const debouncedSync = useCallback(
    (newTotalValue: number) => {
      // Clear any existing timeout
      if (debouncedSyncTimeout) {
        clearTimeout(debouncedSyncTimeout);
      }

      // Set a new timeout
      const newTimeout = setTimeout(() => {
        syncTapsMutation.mutate(newTotalValue);
      }, 2000);

      setDebouncedSyncTimeout(newTimeout);
    },
    [syncTapsMutation, debouncedSyncTimeout]
  );

  // Handle click on the image
  const handleImageClick = useCallback(
    (event: React.MouseEvent) => {
      if (!imageRef.current) return;

      // Calculate click position relative to the image
      const rect = imageRef.current.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      // Add click effect
      const newEffect: ClickEffect = {
        id: Date.now(),
        x,
        y,
        value: initialValue?.user.pointsPerTap || 1,
      };
      setClickEffects((prevEffects) => [...prevEffects, newEffect]);

      // Track clicks and pressure
      const currentTime = Date.now();
      setClickCount((prev) => prev + 1);
      setLastClickTime(currentTime);

      // Update total value
      const newTotalValue = clientTaps + (initialValue?.user.pointsPerTap || 1);
      setClientTaps(newTotalValue);
      // Trigger background sync
      // syncTapsMutation.mutate(newTotalValue);
      debouncedSync(newTotalValue);
      // Remove effect after animation
      setTimeout(() => {
        setClickEffects((prevEffects) => prevEffects.filter((effect) => effect.id !== newEffect.id));
      }, 1000);
    },
    [initialValue, debouncedSync, clientTaps]
  );

  // Manage image pressure scale
  useEffect(() => {
    // Increment pressure with clicks
    const pressureIncrement = Math.min(clickCount * 0.001, 0.5);
    setPressureScale(1 + pressureIncrement);

    // Reset pressure after inactivity
    const pressureResetTimer = setTimeout(() => {
      // If no clicks for a second, start reducing pressure gradually
      if (Date.now() - lastClickTime > 1000) {
        let currentScale = pressureScale;

        const scaleDownInterval = setInterval(() => {
          currentScale = Math.max(currentScale - 0.002, 1);
          setPressureScale(currentScale);

          // Stop when scale reaches 1
          if (currentScale <= 1) {
            clearInterval(scaleDownInterval);
            setClickCount(0);
          }
        }, 20); // Adjust interval for slower/faster scaling

        return () => clearInterval(scaleDownInterval);
      }
    }, 1000);

    return () => clearTimeout(pressureResetTimer);
  }, [clickCount, lastClickTime, pressureScale]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (debouncedSyncTimeout) {
        clearTimeout(debouncedSyncTimeout);
      }
    };
  }, [debouncedSyncTimeout]);

  if (isLoading) {
    return <ClientLoading />;
  }
  if (error) {
    return <ClientError error={error} />;
  }

  return (
    <div className="flex-grow w-full gap-6 flex flex-col items-center mt-6 px-4 pb-36 bg-[url('/bottom-glow.png')] bg-bottom bg-no-repeat bg-cover">
      <CountdownTimer endDate='2025-01-01' />
      {/* Logo and Value Section */}
      <motion.div
        key={clientTaps}
        initial={{ scale: 0.9, opacity: 0.7 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: 'spring',
          stiffness: 100,
          damping: 10,
        }}
        className='mt-3 flex justify-center gap-3 items-center mb-2'
      >
        <Image src={Logo} alt='meme cycle logo' />
        <p className='font-bold text-xl'>{clientTaps.toLocaleString()}</p>
      </motion.div>

      {/* Clickable Image Section */}
      <div ref={imageRef} onClick={handleImageClick} className='flex items-center justify-center relative cursor-pointer mb-3'>
        <motion.div
          animate={{
            scale: pressureScale,
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 20,
          }}
        >
          <Image src={ClickerImage} alt='a cartoon character' quality={100} />
        </motion.div>

        {/* Animated Click Effects */}
        <AnimatePresence>
          {clickEffects.map((effect) => (
            <motion.div
              key={effect.id}
              initial={{
                position: 'absolute',
                left: effect.x,
                top: effect.y,
                scale: 0.8,
                opacity: 0.8,
              }}
              animate={{
                y: -300,
                scale: 1.2,
                opacity: 1,
              }}
              exit={{
                y: -301,
                scale: 0.3,
                opacity: 0,
              }}
              transition={{
                duration: 1.4,
                ease: 'backOut',
              }}
              className='absolute text-white text-2xl font-normal z-50'
            >
              +{effect.value}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className='w-full flex justify-center items-center gap-2'>
        <Button className='w-full buyGradient flex items-center gap-2 rounded-full py-3 h-fit shadow-inner'>
          <Lock className='w-[18px] h-[18px] text-white' />
          <p className='font-medium text-base text-white'>Buy</p>
        </Button>
        <Button className='w-full sellGradient flex items-center gap-2 rounded-full py-3 h-fit shadow-inner'>
          <Lock className='w-[18px] h-[18px] text-white' />
          <p className='font-medium text-base text-white'>Sell</p>
        </Button>
      </div>
    </div>
  );
}
