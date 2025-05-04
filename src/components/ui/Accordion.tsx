'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

type AccordionItem = {
  title: string;
  content: string;
};

type AccordionProps = {
  items: AccordionItem[];
};

export default function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="flex flex-col gap-2">
      {items.map((item, idx) => (
        <div
          key={idx}
          className="bg-maindark text-mainlight font-economica text-p-mobile md:text-p-desktop px-6 py-4 flex items-center justify-between cursor-pointer select-none transition-colors"
          onClick={() => toggle(idx)}
          tabIndex={0}
          role="button"
          aria-expanded={openIndex === idx}
          aria-controls={`accordion-content-${idx}`}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') toggle(idx);
          }}
        >
          <div className="flex-1">
            <div className="font-bold">{item.title}</div>
            <AnimatePresence initial={false}>
              {openIndex === idx && (
                <motion.div
                  id={`accordion-content-${idx}`}
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
                  className="overflow-hidden mt-2 text-mainlight/80 font-normal"
                >
                  {item.content}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <span className="ml-4">
            {openIndex === idx ? (
              <Image src="/accordion-minus-icon.svg" alt="Icono menos, cerrar sección" width={30} height={30} />
            ) : (
              <Image src="/accordion-plus-icon.svg" alt="Icono más, abrir sección" width={30} height={30} />
            )}
          </span>
        </div>
      ))}
    </div>
  );
} 