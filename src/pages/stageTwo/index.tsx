'use client'

import Banner from './Banner';
import Entries from './Entries';
import StageInfo from './StageInfo';
import StagePet from './StagePet';
import PropheciesBanner from './PropheciesBanner';
import InfiniteCollageSlider from '@/components/ui/InfiniteCollageSlider';
const images = [
  { src: '/slider/1.jpg', objectPosition: 'center top' },
  { src: '/slider/2.jpg', objectPosition: '80% 20%' },
  { src: '/slider/3.png', objectPosition: 'center center' },
  { src: '/slider/4.jpg', objectPosition: 'center bottom' },
  { src: '/slider/5.jpg', objectPosition: '70% bottom' },
];

const StageTwo = () => {
  return (
    <section className='flex flex-col justify-center w-full bg-black px-0 py-0'>
      <Banner />
      <div className='flex justify-center w-full'>
        <div className='grid grid-cols-1 sm:grid-cols-2 sm:m-6 md:m-0 lg:mt-14 lg:mb-0 gap-8 max-w-[1440px] mx-auto md:px-6 lg:px-24 md:py-16'>
          <StageInfo />
          <div className="relative w-full h-full flex items-center justify-center pb-14 md:pb-0">
            <StagePet />
          </div>
        </div>
      </div>
      <Entries />
      <InfiniteCollageSlider images={images} />
      <PropheciesBanner active={false} />
    </section>
  );
};

export default StageTwo;