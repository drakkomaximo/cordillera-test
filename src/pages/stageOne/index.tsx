'use client'

import Banner from './Banner';
import StageInfo from './StageInfo';
import StageVideo from './StageVideo';

const StageOne = () => {
  return (
    <section className='bg-black px-[100px]'>
      <Banner />
      <div className='grid grid-cols-1 md:grid-cols-2 mt-[77.5px] gap-8'>
        <StageInfo />
        <div className="flex justify-center items-center">
          <StageVideo />
        </div>
      </div>
    </section>
  );
};

export default StageOne;