'use client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function ClientError({ error }: { error: Error }) {
  const { refresh } = useRouter();
  return (
    <div className='flex flex-col items-center justify-center grow w-full h-full gap-7 px-3 overflow-hidden'>
      <h2 className='text-center text-3xl font-bold bg-mainBtnGradient bg-clip-text text-transparent'>{error.message.startsWith('Un') ? 'Unauthorized' : 'Something went wrong!'}</h2>
      <Button variant='default' className='rounded-full' onClick={() => refresh()}>
        <p className='text-base font-semibold text-txtSecondary'>Try again</p>
      </Button>
    </div>
  );
}
