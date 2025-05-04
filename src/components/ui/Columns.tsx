'use client';

import Image from 'next/image';
import React from 'react';

type ColumnStep = {
  image: string; // ruta relativa en public/
  title: string;
  description: string;
};

type ColumnsProps = {
  steps: ColumnStep[];
};

export default function Columns({ steps }: ColumnsProps) {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <h2 className="text-3xl font-frente text-accentcyan mb-8">5.7) COLUMNS</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step, idx) => (
          <div key={idx} className="flex flex-col items-center text-center">
            <div className="flex items-end justify-center h-[180px] w-full mb-4">
              <img
                src={step.image}
                alt={step.title}
                className="h-full w-auto object-contain object-bottom block"
                style={{ maxHeight: '180px' }}
                loading="lazy"
              />
            </div>
            <div className="font-frente text-mainlight text-3xl md:text-4xl font-bold mb-2 uppercase tracking-wider">
              {step.title}
            </div>
            <p className="font-economica text-mainlight/90 text-p-mobile md:text-p-desktop max-w-xs">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
} 