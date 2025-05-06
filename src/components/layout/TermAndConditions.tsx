'use client'

import React from 'react'
import { useCookieStore } from '@/store/cookies';

const TermAndConditions = () => {
    const openCookieSettings = useCookieStore((state) => state.openSettings);

  return (
    <div className="bg-white py-0 px-4 md:px-0 md:py-4 w-full h-[72px] md:h-[108px]">
        <div className="flex flex-col items-start md:items-center justify-between text-black text-sm gap-2 max-w-[1440px] mx-auto">
          <span className='font-frente text-p-desktop font-normal'>Cordillera Festival 2025 ©</span>
          <div className="flex gap-12 md:gap-10 font-economica md:text-p-mobile text-[12px] font-normal">
            <a href="#" className="hover:underline">Política de privacidad</a>
            <a href="#" className="hover:underline">Términos y condiciones</a>
            <a href="#" className="hover:underline" onClick={e => { e.preventDefault(); openCookieSettings(); }}>Política de Cookies</a>
          </div>
        </div>
      </div>
  )
}

export default TermAndConditions