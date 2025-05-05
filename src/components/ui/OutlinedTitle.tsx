import React from 'react';

interface OutlinedTitleProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const OutlinedTitle: React.FC<OutlinedTitleProps> = ({ children, className = '', style = {} }) => {
  return (
    <h2
      className={`text-outlined-title-desktop font-frente ${className}`}
      style={{
        WebkitTextStroke: '2px #2E64CA',
        color: '#E9DDB5',
        textShadow: `
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