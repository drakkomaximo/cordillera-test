'use client'

import Banner from './Banner';
import Entries from './Entries';
import StageInfo from './StageInfo';
import StagePet from './StagePet';
import PropheciesBanner from './PropheciesBanner';

const StageTwo = () => {
  return (
    <section className='flex flex-col justify-center w-full bg-black px-0 py-0'>
      <Banner />
      <div className='flex justify-center w-full'>
        <div className='grid grid-cols-1 sm:grid-cols-2 sm:m-8 md:m-0 lg:mt-14 lg:mb-0 gap-8 max-w-[1440px] mx-auto md:px-24 md:py-16'>
          <StageInfo />
          <StagePet />
        </div>
      </div>
      <Entries />
      <PropheciesBanner active={true} />
    </section>
  );
};

export default StageTwo;