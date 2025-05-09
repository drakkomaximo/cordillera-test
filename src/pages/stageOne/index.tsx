'use client'

import Banner from './Banner';
import StageInfo from './StageInfo';
/* import StageYouTubeVideo from './StageYouTubeVideo'; */

const StageOne = () => {
  return (
    <section className='flex flex-col justify-center w-full bg-black px-0 py-0 md:py-20 md:px-[40px] xl:px-[100px]'>
      <Banner />
      <div className='flex justify-center w-full'>
      <div className='grid grid-cols-1 sm:grid-cols-2 sm:m-8 lg:mt-14 lg:mb-0 gap-8 max-w-[1440px] mx-auto'>
        <StageInfo />
        {/* <div className="flex justify-center md:justify-end items-center">
          <StageYouTubeVideo layoutOnly />
        </div> */}
      </div>
      </div>
    </section>
  );
};

export default StageOne;