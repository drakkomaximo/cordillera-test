import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion, AnimatePresence } from 'framer-motion';

const PLACEHOLDER = (
  <div className="flex items-center justify-center bg-gray-800/40 rounded-2xl w-full h-full min-h-[120px] min-w-[80px]">
    <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray-400">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2zm0 0l7 7 4-4 5 5" />
    </svg>
  </div>
);

function chunkArray<T>(arr: T[], size: number): T[][] {
  const res = [];
  for (let i = 0; i < arr.length; i += size) {
    res.push(arr.slice(i, i + size));
  }
  return res;
}

interface CollageSliderProps {
  images: (string | null)[];
}

export default function CollageSlider({ images }: CollageSliderProps) {
  const SLIDES = chunkArray(images, 5);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  const handlePrev = () => {
    if (selectedIndex > 0) setSelectedIndex(selectedIndex - 1);
  };
  const handleNext = () => {
    if (selectedIndex < SLIDES.length - 1) setSelectedIndex(selectedIndex + 1);
  };

  const currentGroup = SLIDES[selectedIndex] || [];
  const filledGroup: (string | null)[] = [...currentGroup];
  while (filledGroup.length < 5) filledGroup.push(null);

  return (
    <div className="w-full h-[80vh] overflow-hidden group relative">
      <div className="relative w-full h-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 w-full h-full flex gap-4 overflow-x-auto"
            style={{ minWidth: 340 }}
          >
            <div className="flex flex-col gap-4 w-1/2 h-full min-w-[160px]">
              {filledGroup.slice(0, 2).map((img, i) =>
                img ? (
                  <img
                    key={img + i}
                    src={img}
                    alt={`collage-${i + 1}`}
                    className="rounded-2xl object-cover w-full h-1/2 min-h-[80px] max-h-full"
                  />
                ) : (
                  <div key={`ph-v-${i}`} className="w-full h-1/2">{PLACEHOLDER}</div>
                )
              )}
            </div>
            <div className="flex flex-row gap-4 w-1/2 h-full min-w-[240px]">
              {filledGroup.slice(2, 5).map((img, i) =>
                img ? (
                  <img
                    key={img + (i + 2)}
                    src={img}
                    alt={`collage-${i + 3}`}
                    className="rounded-2xl object-cover h-full w-1/3 min-w-[60px] max-w-full"
                  />
                ) : (
                  <div key={`ph-h-${i}`} className="h-full w-1/3">{PLACEHOLDER}</div>
                )
              )}
            </div>
          </motion.div>
        </AnimatePresence>
          {selectedIndex > 0 && (
        <div className="absolute left-0 top-0 h-full w-1/6 z-20 cursor-pointer group/left">
            <button
              onClick={handlePrev}
              className="opacity-0 group-hover/left:opacity-100 transition-opacity duration-300 absolute left-4 top-1/2 -translate-y-1/2 bg-mainlight text-ultra border-2 border-accentcyan rounded-full shadow-lg p-4 text-3xl font-bold hover:bg-accentcyan hover:text-mainlight focus:outline-none"
              aria-label="Anterior"
            >
              &#8592;
            </button>
          </div>
          )}
          {selectedIndex < SLIDES.length - 1 && (
        <div className="absolute right-0 top-0 h-full w-1/6 z-20 cursor-pointer group/right">
            <button
              onClick={handleNext}
              className="opacity-0 group-hover/right:opacity-100 transition-opacity duration-300 absolute right-4 top-1/2 -translate-y-1/2 bg-mainlight text-ultra border-2 border-accentcyan rounded-full shadow-lg p-4 text-3xl font-bold hover:bg-accentcyan hover:text-mainlight focus:outline-none"
              aria-label="Siguiente"
            >
              &#8594;
            </button>
        </div>
          )}
      </div>
    </div>
  );
} 