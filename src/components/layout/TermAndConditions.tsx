'use client'

import React from 'react'
import { useCookieStore } from '@/store/cookies';

const TermAndConditions = () => {
    const openCookieSettings = useCookieStore((state) => state.openSettings);

    const tycDataa = {  
      title: 'Cordillera Festival 2025 ©',
      links: [
        {
          id: 1,
          label: 'Política de privacidad',
          href: 'https://www.cordillerafestival.com/docs/Aviso%20de%20privacidad.docx.pdf',
          target: '_blank',
          rel: 'noopener noreferrer',
          action: undefined
        },
        {
          id: 2,
          label: 'Términos y condiciones',
          href: undefined,
          target: '_blank',
          rel: 'noopener noreferrer',
          action: undefined
        },
        {
          id: 3,
          label: 'Política de Cookies',
          href: undefined,
          target: '_blank',
          rel: 'noopener noreferrer',
          action: () => openCookieSettings()
        }
      ]
    } 

  return (
    <div className="bg-white py-0 px-4 md:px-0 md:py-4 w-full h-[72px] md:h-[108px]">
        <div className="flex flex-col items-start md:items-center justify-between text-black text-sm gap-2 max-w-[1440px] mx-auto">
          <span className='font-frente text-p-desktop font-normal'>{tycDataa.title}</span>
          <div className="flex gap-12 md:gap-10 font-economica md:text-p-mobile text-[12px] font-normal">
            {tycDataa.links.map((link) => (
              link.action ? (
                <span key={link.id} className="hover:underline cursor-pointer" onClick={link.action}>{link.label}</span>
              ) : link.href ? (
                <a key={link.id} href={link.href} className="hover:underline" target="_blank" rel="noopener noreferrer">{link.label}</a>
              ) : (
                <span key={link.id} className="cursor-not-allowed" onClick={() => {}}>{link.label}</span>
              )
            ))}
          </div>
        </div>
      </div>
  )
}

export default TermAndConditions