'use client';
import CountdownTimer from '@/components/CountdownTimer';
import Image from 'next/image';
import Dart from '@/public/dart.png';
import TaskCard from '@/components/TaskCard';
import { fetchTasks } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import ClientLoading from '@/components/ClientLoading';
import ClientError from '@/components/ClientError';

export default function Tasks() {
  const {
    data: tasksData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['tasks'],
    queryFn: fetchTasks(localStorage.getItem('user_token') || process.env.NEXT_PUBLIC_AUTH_TOKEN || ''),
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
      <div className='flex flex-col items-center text-center gap-4 mt-5'>
        <Image src={Dart} alt='dart board' />
        <h3 className='font-bold text-[22px] leading-tight'>
          Simple Tasks,
          <br /> Massive Gains!
        </h3>
        <p className='font-light text-sm max-w-xs'>Become a part of the biggest Solana Meme Token platform by completing simple tasks and enjoy super gains with powerful meme tokens!</p>
      </div>
      <div className='flex flex-col items-center gap-3'>
        {tasksData?.map((task, index) => (
          <TaskCard key={index} title={task.title} desc={task.description} pic={task.image} />
        ))}
      </div>
    </div>
  );
}
