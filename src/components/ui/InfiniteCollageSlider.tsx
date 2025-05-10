import React, { useEffect, useRef } from 'react';
import Image from 'next/image';

type CollageImage = { src: string; objectPosition?: string } | string | null;
interface InfiniteCollageSliderProps {
  images: CollageImage[];
}

function chunkArray<T>(arr: T[], size: number): T[][] {
  const res = [];
  for (let i = 0; i < arr.length; i += size) {
    res.push(arr.slice(i, i + size));
  }
  return res;
}

const PLACEHOLDER = (
  <div className="flex items-center justify-center bg-gray-800/40 rounded-2xl w-full h-full min-h-[120px] min-w-[80px]">
    <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray-400">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2zm0 0l7 7 4-4 5 5" />
    </svg>
  </div>
);

export default function InfiniteCollageSlider({ images }: InfiniteCollageSliderProps) {
  const collages = chunkArray(images, 5);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const firstSlide = container.firstElementChild;
    if (!firstSlide) return;

    const clone1 = firstSlide.cloneNode(true);
    const clone2 = firstSlide.cloneNode(true);
    container.appendChild(clone1);
    container.appendChild(clone2);

    const animation = container.animate([
      { transform: 'translateX(0)' },
      { transform: `translateX(-${firstSlide.clientWidth * 2}px)` }
    ], {
      duration: 30000, 
      iterations: Infinity,
      easing: 'linear'
    });

    return () => {
      animation.cancel();
    };
  }, [collages]);

  return (
    <div className="w-full py-[100px] md:py-[120px] overflow-hidden max-w-[1440px] mx-auto">
      <div className="h-[70vh] md:h-screen w-full">
        <div 
          ref={containerRef}
          className="flex gap-4 h-full h w-[250%] sm:w-[200%] lg:w-full xl:w-screen"
          style={{ willChange: 'transform' }}
        >
          {collages.map((group, idx) => {
            const filledGroup = [...group];
            while (filledGroup.length < 5) filledGroup.push(null);
            return (
              <div
                key={idx}
                className="flex flex-row gap-4 bg-transparent h-full w-full flex-shrink-0"
              >
                <div className="flex flex-col gap-4 w-1/2 h-full md:min-w-[160px]">
                  {filledGroup.slice(0, 2).map((img, i) => {
                    if (!img) return <div key={`ph-v-${i}`} className="w-full h-1/2">{PLACEHOLDER}</div>;
                    let src = '';
                    let objectPosition = '50% 50%';
                    if (typeof img === 'string') {
                      src = img;
                    } else if (img && typeof img === 'object' && 'src' in img) {
                      src = img.src;
                      if (img.objectPosition) objectPosition = img.objectPosition;
                    }
                    return (
                      <div key={src + i} className="relative w-full h-1/2 min-h-[80px] max-h-full flex flex-col items-center">
                        <Image
                          src={src}
                          alt={`collage-${i + 1}`}
                          fill
                          className="rounded-2xl object-cover"
                          sizes="(max-width: 768px) 100vw, 600px"
                          style={{ objectPosition }}
                        />
                      </div>
                    );
                  })}
                </div>
                <div className="flex flex-row gap-4 w-1/2 h-full min-w-[240px]">
                  {filledGroup.slice(2, 5).map((img, i) => {
                    if (!img) return <div key={`ph-h-${i}`} className="h-full w-1/3">{PLACEHOLDER}</div>;
                    let src = '';
                    let objectPosition = '50% 50%';
                    if (typeof img === 'string') {
                      src = img;
                    } else if (img && typeof img === 'object' && 'src' in img) {
                      src = img.src;
                      if (img.objectPosition) objectPosition = img.objectPosition;
                    }
                    return (
                      <div key={src + (i + 2)} className="relative h-full w-1/3 min-w-[60px] max-w-full flex flex-col items-center">
                        <Image
                          src={src}
                          alt={`collage-${i + 3}`}
                          fill
                          className="rounded-2xl object-cover"
                          sizes="(max-width: 768px) 100vw, 600px"
                          style={{ objectPosition }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
} 