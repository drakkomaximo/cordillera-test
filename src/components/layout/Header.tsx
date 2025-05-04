'use client';

import Image from 'next/image';
import React from 'react';
import Button from '../ui/Button';

const navItems = [
  { label: 'ARTISTAS', href: '#' },
  { label: 'CASHLESS', href: '#' },
  { label: 'SPONSORS', href: '#' },
];

export default function Header() {
  return (
    <header className="w-full max-w-7xl mx-auto">
      <h2 className="text-3xl font-frente text-accentcyan mb-4 mt-8">5.8) HEADER</h2>
      <nav className="flex items-center bg-maindark px-4 py-3 gap-4">
        <div className="flex items-center mr-8">
          <Image src="/header-festival-c-logo.svg" alt="Logo C del Festival Cordillera" width={40} height={40} className="w-10 h-10" />
        </div>
        <ul className="flex items-center gap-8">
          <li>
            <a
              href="#"
              className="text-mainlight font-economica uppercase text-sm tracking-wide px-2 py-2 hover:text-accentcyan transition-colors"
            >
              ENTRADAS
            </a>
          </li>
          {navItems.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="text-mainlight font-economica uppercase text-sm tracking-wide px-2 py-2 hover:text-accentcyan transition-colors"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex-1" />
        <div className="ml-8">
          <Button cta variant="primary">
            ENTRADAS
          </Button>
        </div>
      </nav>
    </header>
  );
}
