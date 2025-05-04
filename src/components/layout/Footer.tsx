import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-maindark text-mainlight w-full pt-12 pb-8 px-4 md:px-16">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* Logos de patrocinadores y aliados */}
        <div className="w-full p-6 md:p-12 flex flex-col items-center mb-8">
          <Image
            src="/footer-sponsors-logos.png"
            alt="Logos de patrocinadores y aliados en el footer"
            width={900}
            height={400}
            className="w-full h-auto object-contain"
            priority
          />
        </div>
        <div className="w-full flex flex-col md:flex-row justify-between items-end mt-8">
          {/* Links legales */}
          <ul className="flex flex-col gap-2 text-mainlight text-sm md:text-base mb-8 md:mb-0">
            <li><a href="#" className="hover:text-accentcyan transition-colors">Política de privacidad</a></li>
            <li><a href="#" className="hover:text-accentcyan transition-colors">Términos y condiciones</a></li>
            <li><a href="#" className="hover:text-accentcyan transition-colors">Administrar cookies</a></li>
          </ul>
          {/* Logo Festival Cordillera */}
          <div className="flex-shrink-0">
            <Image
              src="/footer-festival-logo.png"
              alt="Logo del Festival Cordillera en el footer"
              width={260}
              height={80}
              className="h-20 w-auto object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </footer>
  );
} 