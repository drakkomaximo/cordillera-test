import Image from 'next/image';

const Banner = () => (
  <div className="relative h-[550px] w-full">
    <Image
      src={'/home-banner-desktop.png'}
      alt='home-banner-desktop'
      fill
      className='object-contain'
      priority
    />
  </div>
);

export default Banner; 