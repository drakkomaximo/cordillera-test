/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        economica: ['Economica', 'sans-serif'],
        frente: ['Frente Nacional', 'sans-serif'],
      },
      fontSize: {
        // Headings
        'h1-desktop': ['65px', { lineHeight: '65px' }],
        'h1-mobile': ['52px', { lineHeight: '52px' }],
        'h2-desktop': ['52px', { lineHeight: '52px' }],
        'h2-mobile': ['32px', { lineHeight: '32px' }],
        'h3-desktop': ['36px', { lineHeight: '36px' }],
        'h3-mobile': ['20px', { lineHeight: '20px' }],
        // Paragraphs
        'p-desktop': ['20px', { lineHeight: '32px' }],
        'p-mobile': ['16px', { lineHeight: '24px' }],
        // CTA
        'cta-desktop': ['30px', { lineHeight: '30px' }],
        'cta-mobile': ['20px', { lineHeight: '20px' }],
      },
      colors: {
        ultra: '#101010',      // Ultra Dark
        maindark: '#1E1A1A',  // Main Dark
        mainlight: '#E9DDB5', // Main Light
        accentcyan: '#00D9DD', // Accent Cyan
        fuchsia: '#E900B5',   // Fuchsia
        scarlet: '#FA3F3E',   // Scarlet
        tangerine: '#F77701', // Tangerine
        sunshine: '#0ED1D6',  // Sunshine
        success: '#00B389',   // Success
        error: '#E03A3A',     // Error
        warning: '#FDB400',   // Warning
        info: '#00A9E0',      // Info
      },
    },
  },
  plugins: [],
} 