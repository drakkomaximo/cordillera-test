'use client';

import React, { useState, useEffect } from 'react';
import { useCookieStore, CookieConsent } from '../../store/cookies';

const CookieSettings = () => {
  const {
    showSettings,
    consent,
    saveConsent,
    acceptAll,
    rejectAll,
    closeSettings,
  } = useCookieStore();
  const [localConsent, setLocalConsent] = useState<CookieConsent>(consent);

  // Bloquear scroll cuando el modal está visible (clase y estilo inline)
  useEffect(() => {
    if (showSettings) {
      document.body.classList.add('overflow-hidden');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.classList.remove('overflow-hidden');
      document.body.style.overflow = '';
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
      document.body.style.overflow = '';
    };
  }, [showSettings]);

  // Estado para acordeones
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const toggleAccordion = (key: string) => {
    setOpenAccordion(openAccordion === key ? null : key);
  };

  if (!showSettings) return null;

  const handleSwitch = (key: keyof CookieConsent) => {
    if (key === 'essential') return; // Essential siempre activo
    setLocalConsent((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
      <div className="bg-[#F7EFE5] border border-black w-full max-w-xl p-6 shadow-lg relative z-10">
        <button
          className="absolute top-4 right-4 border border-black px-2 py-1 text-black font-bold text-lg leading-none hover:bg-black hover:text-white transition"
          onClick={closeSettings}
          aria-label="Cerrar configuración de cookies"
        >
          X
        </button>
        <h2 className="font-frente text-[32px] md:text-[36px] font-bold text-black mb-2">ADMINISTRAR COOKIES</h2>
        <p className="text-black font-economica text-[15px] md:text-[16px] mb-4">
          En nuestra página utilizamos cookies para mejorar tu experiencia, así como con fines de análisis y marketing. Respetamos tu privacidad, por lo que te damos la opción de rechazar ciertos tipos de cookies. Haz clic en cada categoría para obtener más información y cambiar tus preferencias. Al bloquear ciertos tipos de cookies, es posible que algunas experiencias en el sitio web y límite los servicios que te podemos prestar.
        </p>
        <div className="border-b border-black mb-4" />
        {/* Essential - Acordeón */}
        <div className="border-b border-black">
          <button
            className="flex items-center w-full py-2 focus:outline-none"
            onClick={() => toggleAccordion('essential')}
            aria-expanded={openAccordion === 'essential'}
          >
            <span className="mr-2">{openAccordion === 'essential' ? '↡' : '↠'}</span>
            <span className="font-economica text-lg font-bold">Cookies esenciales</span>
            <span className="ml-auto text-green-700 font-economica font-bold">Siempre activas</span>
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${openAccordion === 'essential' ? 'max-h-40' : 'max-h-0'}`}
            style={{}}
          >
            <p className="text-xs font-economica text-black px-6 pb-2 pt-1">
              Estas cookies son necesarias para que el sitio funcione correctamente y no se pueden desactivar.
            </p>
          </div>
        </div>
        {/* Analytics - Acordeón */}
        <div className="border-b border-black">
          <button
            className="flex items-center w-full py-2 focus:outline-none"
            onClick={() => toggleAccordion('analytics')}
            aria-expanded={openAccordion === 'analytics'}
          >
            <span className="mr-2">{openAccordion === 'analytics' ? '↡' : '↠'}</span>
            <span className="font-economica text-lg font-bold">Cookies analíticas</span>
            <span className="ml-auto">
              <button
                className={`w-12 h-6 rounded-full border-2 border-black flex items-center transition ${localConsent.analytics ? 'bg-green-400' : 'bg-gray-300'}`}
                onClick={e => { e.stopPropagation(); handleSwitch('analytics'); }}
                aria-pressed={localConsent.analytics}
              >
                <span className={`block w-5 h-5 bg-white border border-black rounded-full shadow transform transition ${localConsent.analytics ? 'translate-x-6' : ''}`}></span>
              </button>
            </span>
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${openAccordion === 'analytics' ? 'max-h-40' : 'max-h-0'}`}
            style={{}}
          >
            <p className="text-xs font-economica text-black px-6 pb-2 pt-1">
              Nos ayudan a entender cómo interactúas con el sitio para mejorarlo.
            </p>
          </div>
        </div>
        {/* Marketing - Acordeón */}
        <div className="border-b border-black">
          <button
            className="flex items-center w-full py-2 focus:outline-none"
            onClick={() => toggleAccordion('marketing')}
            aria-expanded={openAccordion === 'marketing'}
          >
            <span className="mr-2">{openAccordion === 'marketing' ? '↡' : '↠'}</span>
            <span className="font-economica text-lg font-bold">Cookies de marketing</span>
            <span className="ml-auto">
              <button
                className={`w-12 h-6 rounded-full border-2 border-black flex items-center transition ${localConsent.marketing ? 'bg-green-400' : 'bg-gray-300'}`}
                onClick={e => { e.stopPropagation(); handleSwitch('marketing'); }}
                aria-pressed={localConsent.marketing}
              >
                <span className={`block w-5 h-5 bg-white border border-black rounded-full shadow transform transition ${localConsent.marketing ? 'translate-x-6' : ''}`}></span>
              </button>
            </span>
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${openAccordion === 'marketing' ? 'max-h-40' : 'max-h-0'}`}
            style={{}}
          >
            <p className="text-xs font-economica text-black px-6 pb-2 pt-1">
              Se usan para mostrarte publicidad relevante y personalizada.
            </p>
          </div>
        </div>
        <div className="border-b border-black my-4" />
        <div className="flex flex-col md:flex-row gap-4 md:gap-0 md:justify-between items-center mb-4">
          <button
            className="w-full md:w-auto border border-black py-2 px-4 font-economica text-lg hover:bg-black hover:text-white transition"
            onClick={acceptAll}
          >
            Aceptar todas
          </button>
          <button
            className="w-full md:w-auto border border-black py-2 px-4 font-economica text-lg hover:bg-black hover:text-white transition"
            onClick={rejectAll}
          >
            Rechazar todas
          </button>
        </div>
        <button
          className="w-full bg-black text-white py-2 px-4 font-economica text-lg rounded hover:bg-gray-800 transition"
          onClick={() => saveConsent(localConsent)}
        >
          Guardar la configuración
        </button>
      </div>
    </div>
  );
};

export default CookieSettings; 