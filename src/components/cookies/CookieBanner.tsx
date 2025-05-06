'use client';

import React, { useEffect, useState } from 'react';
import { useCookieStore } from '../../store/cookies';

const ANIMATION_DURATION = 300; // ms

function getInitialConsent() {
  if (typeof window !== 'undefined') {
    const match = document.cookie.match(/cookieConsent=([^;]+)/);
    if (match) {
      try {
        const parsed = JSON.parse(decodeURIComponent(match[1]));
        if (parsed && typeof parsed === 'object' && 'essential' in parsed) {
          return parsed;
        }
      } catch {}
    }
  }
  return { essential: true, analytics: false, marketing: false };
}
function hasValidConsentCookie() {
  if (typeof window === 'undefined') return false;
  const match = document.cookie.match(/cookieConsent=([^;]+)/);
  if (!match) return false;
  try {
    const parsed = JSON.parse(decodeURIComponent(match[1]));
    return parsed && typeof parsed === 'object' && 'essential' in parsed;
  } catch {}
  return false;
}

const CookieBanner = () => {
  const { showBanner, showSettings, acceptAll, openSettings, closeBanner } = useCookieStore();
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const show = !hasValidConsentCookie();
    useCookieStore.setState({
      showBanner: show,
      consent: getInitialConsent(),
    });
  }, []);

  useEffect(() => {
    if (showBanner) {
      setShouldRender(true);
      setTimeout(() => setIsVisible(true), 50);
    } else if (shouldRender) {
      setIsVisible(false);
      const timeout = setTimeout(() => setShouldRender(false), ANIMATION_DURATION);
      return () => clearTimeout(timeout);
    }
  }, [showBanner]);

  useEffect(() => {
    if (showBanner || showSettings) {
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
  }, [showBanner, showSettings]);

  if (!shouldRender) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
      <div className={`absolute inset-0 bg-black bg-opacity-80 pointer-events-auto transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`} />
      <div
        className={`
          relative w-full md:max-w-2xl mx-auto bg-[#F7EFE5] border border-black p-4 md:p-6 shadow-lg z-10
          transition-all duration-300
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}
        `}
        style={{ willChange: 'opacity, transform' }}
      >
        <div className="flex justify-between items-start">
          <h2 className="font-frente text-[32px] md:text-[36px] font-bold text-black">COOKIES</h2>
          <button
            className="border border-black px-2 py-1 text-black font-bold text-lg leading-none hover:bg-black hover:text-white transition"
            onClick={closeBanner}
            aria-label="Cerrar aviso de cookies"
          >
            X
          </button>
        </div>
        <p className="text-black font-economica text-[15px] md:text-[16px] mt-2 mb-4">
          En nuestra página utilizamos cookies para mejorar tu experiencia, así como con fines de análisis y marketing. Respetamos tu privacidad, por lo que te damos la opción de rechazar ciertos tipos de cookies. Haz clic en cada categoría para obtener más información y cambiar tus preferencias.
        </p>
        <hr className="border-black mb-4" />
        <div className="flex flex-col md:grid md:grid-cols-2 gap-4 md:gap-0 md:justify-between items-center">
          <button
            className="w-full md:w-auto border border-black py-0 px-4 font-economica text-lg hover:bg-black hover:text-white transition"
            onClick={acceptAll}
          >
            Aceptar todas
          </button>
          <button
            className="w-full md:w-auto font-economica text-lg underline md:ml-8"
            onClick={openSettings}
          >
            Administrar las cookies
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner; 