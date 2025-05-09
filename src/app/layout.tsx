import type { Metadata } from "next";
import "./globals.css";
import ContactSection from "../components/layout/ContactSection";
import Script from "next/script";
import CookieBanner from "../components/cookies/CookieBanner";
import CookieSettings from "../components/cookies/CookieSettings";
import TermAndConditions from "@/components/layout/TermAndConditions";
import Logos from "@/components/layout/Logos";

export const metadata: Metadata = {
  title: "Festival Cordillera 2025: 13 y 14 de Septiembre",
  description: "Bogotá recibe el Festival Cordillera 2025 el 13 y 14 de septiembre. Disfruta artistas únicos, diversidad cultural y conexión con la tierra.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="bg-black">
      <head>
        <Script id="gtm-script" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-5ZVQ5VN');`}
        </Script>
      </head>
      <body className="h-screen w-full">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5ZVQ5VN"
            height="0" width="0" style={{ display: "none", visibility: "hidden" }}></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {children}
        <ContactSection />
        <Logos />
        <TermAndConditions />
        <CookieBanner />
        <CookieSettings />
      </body>
    </html>
  );
}
