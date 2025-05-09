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
    <div className="w-full max-w-[1440px] mx-auto">
      <Image
        src={isMobile ? '/home-banner-mobile-stage-2.png' : '/home-banner-desktop-stage-2.png'}
        alt="home-banner"
        priority
        width={1440}
        height={500}
        className="w-full h-auto object-cover"
      />
    </div>
  );
};

export default Banner; 