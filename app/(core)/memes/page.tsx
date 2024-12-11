'use client';
import CountdownTimer from '@/components/CountdownTimer';
import MemeCard from '@/components/MemeCard';
import MemeDrawer from '@/components/MemeDrawer';
import { useState } from 'react';
import { MemeType } from '@/types';
import ClientLoading from '@/components/ClientLoading';
import ClientError from '@/components/ClientError';
import { fetchMemes } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

export default function Memes() {
  const [selectedMeme, setSelectedMeme] = useState<MemeType | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleOpenDrawer = (meme: MemeType) => {
    setSelectedMeme(meme);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setSelectedMeme(null);
    setIsDrawerOpen(false);
  };

  const {
    data: memesData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['tasks'],
    queryFn: fetchMemes(),
  });

  if (isLoading) {
    return <ClientLoading />;
  }
  if (error) {
    return <ClientError error={error} />;
  }

  return (
    <div className="flex-grow w-full pt-5 gap-6 flex flex-col items-center px-4 pb-36 bg-[url('/bottom-glow.png')] bg-bottom bg-no-repeat bg-cover">
      <CountdownTimer endDate='2025-01-01' />
      <div className='flex flex-wrap items-center justify-center gap-4 mt-3'>
        {memesData?.map((meme) => (
          <MemeCard key={meme._id} meme={meme} onOpenDrawer={handleOpenDrawer} bgColor='/meme-card-bg.png' />
        ))}
      </div>
      <MemeDrawer meme={selectedMeme} isOpen={isDrawerOpen} onClose={handleCloseDrawer} />
    </div>
  );
}
