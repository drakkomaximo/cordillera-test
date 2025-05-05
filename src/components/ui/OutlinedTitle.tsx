'use client'

import React, { useState, useEffect } from 'react';

interface OutlinedTitleProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const OutlinedTitle: React.FC<OutlinedTitleProps> = ({ children, className = '', style = {} }) => {

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 767);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []); 

  return (
    <h2
      className={`text-outlined-title-mobile md:text-outlined-title-desktop font-frente ${className} ${isMobile ? 'text-center' : 'text-left'}`}
      style={{
        WebkitTextStroke: isMobile ? '2px transparent' : '2px #2E64CA',
        color: '#E9DDB5',
        textShadow: isMobile ? 'none' : `
          5px 5px 0 #2E64CA,
          -5px 5px 0 #2E64CA,
          5px -5px 0 #2E64CA,
          -5px -5px 0 #2E64CA,
          0px 5px 0 #2E64CA,
          5px 0px 0 #2E64CA,
          0px -5px 0 #2E64CA,
          -5px 0px 0 #2E64CA
        `,
        letterSpacing: '0px',
        ...style,
      }}
    >
      {children}
    </h2>
  );
};

export default OutlinedTitle; 