'use client';

import React, { useState, useEffect } from 'react';
import { useCookieStore, CookieConsent } from '../../store/cookies';
import Image from 'next/image';

const ANIMATION_DURATION = 300; // ms

const CookieSettings = () => {
  const {
    showSettings,
    consent,
    saveConsent,
    acceptAll,
    rejectAll,
    closeBanner,
    closeSettings,
  } = useCookieStore();
  const [localConsent, setLocalConsent] = useState<CookieConsent>(consent);
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>('essential');

  useEffect(() => {
    if (showSettings) {
      setShouldRender(true);
      setTimeout(() => setIsVisible(true), 50);
      document.body.classList.add('overflow-hidden');
      document.body.style.overflow = 'hidden';
    } else if (shouldRender) {
      setIsVisible(false);
      document.body.classList.remove('overflow-hidden');
      document.body.style.overflow = '';
      const timeout = setTimeout(() => setShouldRender(false), ANIMATION_DURATION);
      return () => clearTimeout(timeout);
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
      document.body.style.overflow = '';
    };
  }, [showSettings, shouldRender]);

  const toggleAccordion = (key: string) => {
    setOpenAccordion(openAccordion === key ? null : key);
  };

  if (!shouldRender) return null;

  const handleSwitch = (key: keyof CookieConsent) => {
    if (key === 'essential') return; // Essential siempre activo
    setLocalConsent((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const cookiesSettingsData = {
    title: 'ADMINISTRAR COOKIES',
    description: 'En nuestro sitio web Festival Cordillera utilizamos cookies para mejorar tu experiencia en este espacio compartido, realizar análisis y llevar a cabo acciones de marketing. Respetamos tu privacidad, por lo que puedes rechazar ciertos tipos de cookies. Haz clic en cada categoría para obtener más información y ajustar tus preferencias. Ten en cuenta que bloquear ciertos tipos de cookies puede afectar tu experiencia y limitar algunos servicios que ofrecemos.',
    cookies: [
      {
        name: 'essential',
        title: 'Cookies esenciales',
        enabled: true,
        enabledDescription: 'Siempre activas',
        description: 'Estas cookies son fundamentales para el funcionamiento de este sitio web. No se pueden desactivar desde nuestro sistema y generalmente se configuran en respuesta a tus acciones, como ajustar preferencias de privacidad, iniciar sesión o completar formularios.',
      },
      {
        name: 'analytics',
        title: 'Cookies analíticas',
        enabled: true,
        enabledDescription: null,
        description: 'Estas cookies nos ayudan a entender cómo interactúas con nuestro sitio, recopilando información para crear informes de uso. Además, los datos recopilados pueden combinarse con cookies de publicidad para mostrar anuncios relevantes y medir su efectividad.',
      },
      {
        name: 'marketing',
        title: 'Cookies de marketing',
        enabled: true,
        enabledDescription: null,
        description: 'Utilizamos cookies para que los anuncios que ves sean relevantes, a tu gusto y útiles. Estas cookies mejoran el rendimiento de nuestras campañas publicitarias y evitan que veas repetidamente los mismos anuncios. Seleccionan anuncios basados en tus intereses y visitas anteriores.',
      },
    ],
  };

  return (
    <div className={`fixed inset-0 bg-black/80 z-50 flex items-center justify-center transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className={`bg-[#F7EFE5] border border-black w-full max-w-[353px] md:max-w-[838px] p-6 shadow-lg relative z-10 transition-all duration-300 transform ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        <button
          className="absolute top-7 right-7 md:top-10 md:right-10 border border-black px-1 py-1 font-bold leading-none bg-transparent hover:bg-black transition group"
          onClick={() => { closeSettings(); closeBanner(); }}
          aria-label="Cerrar configuración de cookies"
        >
          <svg
            width="8"
            height="13"
            viewBox="0 0 8 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-[7px] h-[12px] md:w-[14px] md:h-[24px] text-black group-hover:text-white transition-colors"
          >
            <path d="M7.49805 0.571426L5.24805 6.40476L7.49805 12.2381H4.99805L3.99805 9.65476L2.99805 12.2381H0.498047L2.74805 6.40476L0.498047 0.571426H2.99805L3.99805 3.17143L4.99805 0.571426H7.49805Z" fill="currentColor"/>
          </svg>
        </button>
        <h2 className="font-frente text-p-desktop md:text-h1-mobile font-normal text-black mb-2">{cookiesSettingsData.title}</h2>
        <p className="text-black font-economica text-[10px] md:text-[16px] mb-4">
          {cookiesSettingsData.description}
        </p>
        <div className='flex flex-col gap-2 mt-8'>
          {cookiesSettingsData.cookies.map((cookie) =>
            <div key={cookie.name} className="bg-[#FDE6D5]">
              <button
                className="flex items-center w-full p-2 focus:outline-none"
                onClick={() => toggleAccordion(cookie.name)}
                aria-expanded={openAccordion === cookie.name}
              >
                <span className="mr-2">
                  <Image
                    src="/cookie-arrow.svg"
                    alt="Toggle"
                    width={22}
                    height={14}
                    className={`transition-transform duration-300 ease-in-out ${openAccordion === cookie.name ? 'rotate-90' : ''}`}
                  />
                </span>
                <span className="font-economica text-sm md:text-lg font-bold">{cookie.title}</span>
                {cookie.enabledDescription ? (
                  <span className="ml-auto text-xs text-green-700 font-economica font-bold">Siempre activas</span>
                ) : (
                  <span className="ml-auto">
                    <span
                      role="switch"
                      tabIndex={0}
                      aria-checked={localConsent[cookie.name as keyof CookieConsent]}
                      className={`w-[72px] h-[24px] rounded-full border-2 border-black flex items-center transition-all duration-300 ease-in-out relative cursor-pointer select-none bg-[#191916] ${localConsent[cookie.name as keyof CookieConsent] ? '' : 'bg-[#686868]'}`}
                      onClick={e => { e.stopPropagation(); handleSwitch(cookie.name as keyof CookieConsent); }}
                    >
                      <span
                        className={`absolute top-0 left-0 w-5 h-5 rounded-full bg-[#FDEFE2] border border-black shadow-[0_2px_6px_rgba(0,0,0,0.12)] flex items-center justify-center transition-all duration-300 ease-in-out ${localConsent[cookie.name as keyof CookieConsent] ? 'translate-x-[48px]' : ''}`}
                        style={{ boxSizing: 'border-box' }}
                      >
                        {localConsent[cookie.name as keyof CookieConsent] && (
                          <svg width="14" height="14" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 9.5L8 12.5L13 7.5" stroke="#191916" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </span>
                    </span>
                  </span>
                )}
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${openAccordion === cookie.name ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <p className="text-xs font-economica text-black px-6 pb-2 pt-1">
                  {cookie.description}
                </p>
              </div>
            </div>
          )}
        </div>


        <div className="border-b border-black my-4" />
        <div className="grid grid-cols-2 gap-4 md:justify-between items-center mb-4">
          <button
            className="w-full md:w-auto border border-black py-0 px-4 font-frente text-lg hover:bg-black hover:text-white transition font-normal"
            onClick={acceptAll}
          >
            Aceptar todas
          </button>
          <button
            className="w-full md:w-auto border border-black py-0 px-4 font-frente text-lg hover:bg-black hover:text-white transition font-normal"
            onClick={rejectAll}
          >
            Rechazar todas
          </button>
        </div>
        <button
          className="w-full bg-black text-white py-1 px-4 font-frente text-lg rounded hover:bg-transparent hover:text-black border border-black transition font-normal"
          onClick={() => saveConsent(localConsent)}
        >
          Guardar la configuración
        </button>
      </div>
    </div>
  );
};

export default CookieSettings; 