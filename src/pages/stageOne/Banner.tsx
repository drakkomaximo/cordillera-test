import Image from 'next/image';
import { useEffect, useState } from 'react';

const Banner = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 767);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className={`relative w-full ${isMobile ? 'h-[328px]' : 'h-[550px]'} max-w-[1440px] mx-auto`}>
      <Image
        src={isMobile ? '/home-banner-mobile.png' : '/home-banner-desktop.png'}
        alt="home-banner"
        fill
        className="object-contain"
        priority
      />
    </div>
  );
};

export default Banner; 