'use client';

import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary';
  cta?: boolean;
  frente?: boolean;
  children: React.ReactNode;
};

export default function Button({
  variant = 'primary',
  cta = false,
  frente = false,
  disabled = false,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const base =
    'font-economica font-bold uppercase px-8 py-3 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accentcyan';

  const ctaClass = cta ? 'text-cta-mobile' : 'text-cta-mobile md:text-cta-desktop';
  const frenteClass = frente ? 'font-frente font-normal !py-4 !pb-5 !px-6' : 'font-economica';

  const variants = {
    primary: [
      `bg-mainlight text-ultra`,
      !disabled && 'hover:bg-accentcyan hover:text-ultra',
      disabled && 'bg-maindark text-mainlight opacity-50 cursor-not-allowed',
    ]
      .filter(Boolean)
      .join(' '),
    secondary: [
      'border border-mainlight text-mainlight bg-transparent',
      !disabled && 'hover:border-accentcyan hover:text-accentcyan',
      disabled && 'border-maindark text-maindark opacity-50 cursor-not-allowed',
    ]
      .filter(Boolean)
      .join(' '),
  };

  return (
    <button
      type="button"
      disabled={disabled}
      className={`${base} ${variants[variant]} ${ctaClass} ${frenteClass} ${className}`}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      {...props}
    >
      {children}
    </button>
  );
} 