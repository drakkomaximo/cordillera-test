'use client'

import React, { useState, useEffect } from 'react';

interface OutlinedTitleProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  blueOutline?: boolean;
}

const OutlinedTitle: React.FC<OutlinedTitleProps> = ({ children, className = '', style = {}, blueOutline = false }) => {

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 767);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []); 

  const outlineColor = blueOutline ? '#2A67D2' : '#2E64CA';

  return (
    <h2
      className={`text-outlined-title-mobile md:text-outlined-title-desktop font-frente ${className} ${isMobile ? 'text-center' : 'text-left'}`}
      style={{
        // WebkitTextStroke: blueOutline
        //   ? `1px ${outlineColor}`
        //   : isMobile
        //     ? '2px transparent'
        //     : `2px ${outlineColor}`,
        color: '#E9DDB5',
        textShadow: blueOutline
          ? `
            2px 2px 0 ${outlineColor},
            -2px 2px 0 ${outlineColor},
            2px -2px 0 ${outlineColor},
            -2px -2px 0 ${outlineColor},
            0px 2px 0 ${outlineColor},
            2px 0px 0 ${outlineColor},
            0px -2px 0 ${outlineColor},
            -2px 0px 0 ${outlineColor}
          `
          : isMobile
            ? 'none'
            : `
            5px 5px 0 ${outlineColor},
            -5px 5px 0 ${outlineColor},
            5px -5px 0 ${outlineColor},
            -5px -5px 0 ${outlineColor},
            0px 5px 0 ${outlineColor},
            5px 0px 0 ${outlineColor},
            0px -5px 0 ${outlineColor},
            -5px 0px 0 ${outlineColor}
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