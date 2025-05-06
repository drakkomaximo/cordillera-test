'use client'

import Banner from './Banner';
import StageInfo from './StageInfo';
import StageVideo from './StageVideo';

const StageOne = () => {
  return (
    <section className='bg-black px-0 py-0 md:py-20 md:px-[40px] xl:px-[100px]'>
      <Banner />
      <div className='grid grid-cols-1 sm:grid-cols-2 sm:m-8 lg:mt-14 lg:mb-0 gap-8 max-w-[1440px] mx-auto'>
        <StageInfo />
        <div className="flex justify-center md:justify-end items-center">
          <StageVideo />
        </div>
      </div>
    </section>
  );
};

export default StageOne;