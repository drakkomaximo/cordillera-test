'use client';

import React, { useState } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/ui/Button';

export interface PricingStage {
  stage: string;
  combo: string;
  priceCOP: number | null;
  priceUSD: number | null;
  benefits: string[] | null;
  url: string | null;
}

interface PricingTablesProps {
  title?: string;
  small?: boolean;
  stages: PricingStage[];
}

export default function PricingTables({ title = 'COMBO GENERAL', small = false, stages = [] }: PricingTablesProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  if (!stages || stages.length === 0) {
    return null;
  }

  return (
    <section className="w-full mx-auto">
      <h2 className={`${small ? 'text-h4-mobile md:text-h4-desktop' : 'text-h2-mobile md:text-h2-desktop'} font-frente text-mainlight text-3xl md:text-4xl uppercase mb-6`}>{title}</h2>
      <div className="flex flex-col gap-4">
        {stages.map((stage, idx) => (
          <div key={idx} className="bg-maindark text-mainlight">
            <div className="w-full mx-auto md:mx-0 px-6 py-4 md:py-6 md:px-8 border-b-2 border-ultra/80 last:border-b-0">
              <div className="grid grid-cols-2 md:grid-cols-[1.5fr_240px_1fr] gap-4 md:gap-0 items-start">
                <div className="flex flex-col md:justify-center md:items-start">
                  <span className="text-mainlight text-[16px] md:text-[20px] font-bold font-economica mb-1 md:mb-0 uppercase">{stage.combo}</span>
                  <span className="font-frente text-mainlight text-[20px] md:text-4xl uppercase tracking-wide">{stage.stage}</span>
                  {
                    stage.benefits && (
                      <button
                        className="flex items-center gap-1 text-mainlight/80 text-xs md:text-sm font-economica mt-3 focus:outline-none select-none"
                        onClick={() => stage.benefits && setOpenIdx(openIdx === idx ? null : idx)}
                        aria-expanded={openIdx === idx}
                        aria-controls={`benefits-${idx}`}
                      >
                        <span className='text-mainlight text-[16px] md:text-[20px] font-bold font-economica mb-1 md:mb-0'>Beneficios</span>
                        <span
                          className="inline-block transition-transform duration-200"
                          style={{ transform: openIdx === idx ? 'rotate(-90deg)' : 'rotate(90deg)' }}
                        >
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 2L8 6L4 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      </button>
                    )
                  }
                </div>
                <div className="flex flex-col items-end text-right md:items-start md:text-left md:min-w-[220px] justify-self-end">
                  <span className="self-end md:self-start text-left text-mainlight text-[16px] md:text-[20px] font-bold font-economica">PRECIO</span>
                  <div className="flex flex-col md:flex-row items-end text-right md:items-start md:text-left font-frente text-mainlight text-[20px] md:text-4xl font-bold tracking-wider">
                    <span>{stage.priceCOP ? stage.priceCOP.toLocaleString('es-CO') + ' COP' : ''}</span>
                    <span className="text-accentcyan font-bold pl-6 md:pl-0">{stage.priceUSD ? ' / ' + stage.priceUSD.toLocaleString('es-CO') + ' USD' : ''}</span>
                  </div>
                </div>
                <div className="hidden md:flex items-center justify-end">
                  <Button variant="primary" cta frente onClick={() => window.open(stage.url || '', '_blank')}>ENTRADAS</Button>
                </div>
              </div>
              <AnimatePresence initial={false}>
                {openIdx === idx && (
                  <motion.div
                    id={`benefits-${idx}`}
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      type: 'spring',
                      stiffness: 200,
                      damping: 24,
                      opacity: { duration: 0.2 }
                    }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-mainlight/30 my-4" />
                    <div className="text-mainlight font-economica text-sm md:text-base pb-2 pt-1">
                      {stage.benefits?.map((benefit, idx) => (
                        <p key={idx}>- {benefit}</p>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="flex md:hidden py-2">
                <Button variant="primary" cta frente className="w-full" onClick={() => window.open(stage.url || '', '_blank')}>ENTRADAS</Button>
            </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
} 