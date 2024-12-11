'use client';
import { Button } from '@/components/ui/button';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  console.error(error);
  return (
    <div className='flex flex-col items-center justify-center w-screen h-screen gap-7 px-3 overflow-hidden'>
      <h2 className='text-center text-3xl font-bold bg-neutral-600 bg-clip-text text-transparent'>Something went wrong!</h2>
      <Button variant='outline' className='rounded-full' onClick={() => reset()}>
        <p className='text-base font-semibold text-txtSecondary'>Try again</p>
      </Button>
    </div>
  );
}
