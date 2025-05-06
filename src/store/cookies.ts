import { create } from 'zustand';

export type CookieConsent = {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
};

interface CookieStore {
  showBanner: boolean;
  showSettings: boolean;
  consent: CookieConsent;
  acceptAll: () => void;
  rejectAll: () => void;
  openSettings: () => void;
  closeSettings: () => void;
  closeBanner: () => void;
  saveConsent: (consent: CookieConsent) => void;
}

const defaultConsent: CookieConsent = {
  essential: true,
  analytics: false,
  marketing: false,
};

function persistConsent(consent: CookieConsent) {
  let cookie = `cookieConsent=${encodeURIComponent(JSON.stringify(consent))}; path=/; max-age=31536000`;
  if (typeof window !== 'undefined' && window.location.protocol === 'https:') {
    cookie += '; Secure; SameSite=Lax';
  }
  document.cookie = cookie;
  console.log('[persistConsent] cookieConsent set:', cookie);
}

export const useCookieStore = create<CookieStore>((set) => ({
  showBanner: false,
  showSettings: false,
  consent: defaultConsent,
  acceptAll: () => {
    const consent = { essential: true, analytics: true, marketing: true };
    persistConsent(consent);
    set({ consent, showBanner: false, showSettings: false });
  },
  rejectAll: () => {
    const consent = { essential: true, analytics: false, marketing: false };
    persistConsent(consent);
    set({ consent, showBanner: false, showSettings: false });
  },
  openSettings: () => set({ showSettings: true }),
  closeSettings: () => set({ showSettings: false }),
  closeBanner: () => set({ showBanner: false }),
  saveConsent: (consent) => {
    persistConsent(consent);
    set({ consent, showBanner: false, showSettings: false });
  },
})); 