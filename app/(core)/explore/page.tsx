import CountdownTimer from '@/components/CountdownTimer';
import Image from 'next/image';
import Logo from '@/public/logo-lg.png';
import Facebook from '@/public/facebook.png';
import X from '@/public/x.png';
import Insta from '@/public/insta.png';
import TickTock from '@/public/ticktock.png';
import Telegram from '@/public/telegram.png';
import Link from 'next/link';
import TaskPic1 from '@/public/task1.png';
import TaskPic2 from '@/public/task2.png';
import TaskPic3 from '@/public/task3.png';
import TaskCard from '@/components/TaskCard';

const TasksData = [
  { pic: TaskPic1, title: 'Complete Tasks. Earn Your Edge.', desc: 'Your meme journey begins with simple, exciting objectives designed to reward your effort.' },
  { pic: TaskPic2, title: 'Rank Up. Unlock Bonuses.', desc: 'Climb through tiers based on your performance. Higher tiers mean more bonus tokens with every purchase.' },
  { pic: TaskPic3, title: 'Cycle Through Exclusive Meme Tokens.', desc: 'Each cycle brings a fresh, trending meme token for you to claim — with up to 1.5x the rewards.' },
];

const socials = [
  {
    icon: Facebook,
    link: '#',
  },
  {
    icon: X,
    link: '#',
  },
  {
    icon: Insta,
    link: '#',
  },
  {
    icon: TickTock,
    link: '#',
  },
  {
    icon: Telegram,
    link: '#',
  },
];

export default function Explore() {
  return (
    <div className='flex-grow w-full pt-5 gap-6 flex flex-col items-center justify-center bg-pageGradient bg-no-repeat bg-bottom px-4 pb-36'>
      <CountdownTimer endDate='2025-01-01' />
      <div className='flex flex-col items-center text-center gap-5 mt-5'>
        <Image src={Logo} alt='meme cycle logo' />
        <h3 className='font-bold text-[22px] leading-snug'>Join Meme Cycle. Enjoy Exclusive Gains & Be a Meme Hero!</h3>
        <p className='font-normal text-sm max-w-xs'>
          Stop following trends. Start creating them.Join the most powerful community, be the first to get exclusive access to highly rewarding meme tokens and earn unmatched bonuses!
        </p>
      </div>
      <div className='w-full flex justify-center items-center gap-4 my-10'>
        {socials.map((social, index) => (
          <Link key={index} href={social.link} target='_blank'>
            <Image src={social.icon} alt={social.link} />
          </Link>
        ))}
      </div>
      <div className='flex flex-col items-center gap-3'>
        {TasksData.map((task, index) => (
          <TaskCard key={index} title={task.title} desc={task.desc} pic={task.pic} />
        ))}
      </div>
      <div className='w-full flex flex-col items-center rounded-2xl border-[0.5px] border-white border-opacity-[0.03] bg-bottomGradient bg-no-repeat bg-bottom px-4 text-center'>
        <div className="flex flex-col items-center gap-5 py-9 border-b border-b-[#23427E] bg-[url('/infinity-bg.png')] bg-no-repeat bg-[-10%_25%]">
          <h3 className='font-extrabold text-[22px] italic'>
            Multiple Cycles,
            <br />
            Endless Opportunities
          </h3>
          <p className='font-normal text-sm'>Every cycle introduces a new trending meme token, keeping the excitement alive. Don&apos;t just join the meme coin revolution — dominate it.</p>
        </div>
        <div className='flex flex-col items-center gap-5 py-9 border-b border-b-[#23427E]'>
          <h3 className='font-extrabold text-[22px] italic'>
            Always Fresh,
            <br />
            Always Exciting!
          </h3>
          <p className='font-normal text-sm'>
            Stay ahead of the curve with exclusive, trending tokens every cycle. Each one’s a chance to prove your skill, elevate your tier, and claim the rewards you deserve.
          </p>
        </div>
        <div className='flex flex-col items-center gap-5 py-9'>
          <h3 className='font-extrabold text-[22px] italic'>
            A Movement where
            <br />
            Memes meet Rewards!
          </h3>
          <p className='font-normal text-sm'>
            Memes are more than laughs — they’re power, culture, and now, an opportunity. Meme Cycle puts you in control, letting you earn your place in the meme economy.
          </p>
        </div>
      </div>
      <div className='flex flex-col items-center text-center'>
        <Image src={Logo} alt='meme cycle logo' className='mb-3' />
        <h1 className='font-extrabold text-2xl'>MEME CYCLE</h1>
        <p className='font-normal text-sm max-w-xs'>Your success cycle starts with trending meme tokens!</p>
      </div>
    </div>
  );
}
