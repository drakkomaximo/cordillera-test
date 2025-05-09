import Image from 'next/image';
import Button from '@/components/ui/Button';
import OutlinedTitle from '@/components/ui/OutlinedTitle';

const PropheciesBanner = ({ active = true }: { active?: boolean }) => {
  if (!active) return null;

  return (
    <section className="relative w-full max-w-[1440px] lg:h-[960px] mx-auto flex flex-col bg-black overflow-hidden rounded-lg mt-12 px-0 py-12">
      <div className="relative z-20 w-full flex justify-center mb-8">
        <OutlinedTitle blueOutline className="!text-left md:text-center mx-auto pl-6 md:pl-0 text-[52px] md:text-[56px] lg:text-[85px] md:px-4 lg:px-0">
          PROFECÍAS CORDILLERA
        </OutlinedTitle>
      </div>
      <div className="absolute inset-0 left-[40px] md:left-[80px] -top-[80px] md:top-[150px] z-0 flex items-center">
        <Image
          src="/prophecy-pet-stage-2.png"
          alt="Profecía Cordillera"
          width={900}
          height={600}
          className="object-contain max-w-[53vw] min-w-[300px] pointer-events-none select-none"
          style={{ left: 0 }}
          priority
        />
      </div>
      <div className="relative z-10 flex flex-col items-start justify-center ml-auto w-full sm:w-[60%] lg:w-[50%] px-6 md:px-8 lg:pr-24 pt-40 sm:pt-12 lg:pt-48 pb-0 md:mb-12">
        <h3 className="text-h2-mobile md:text-[64px] md:leading-[120%] text-mainlight font-frente mb-2 uppercase">
          LOREM IPSUM DOLOR SIT AMET, <br /> CONSECTETUR
        </h3>
        <p className="text-p-mobile md:text-p-desktop text-mainlight/80 font-economica mb-12 mt-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.
        </p>
        <a href="https://paramopresenta.jebbit.com/nyj3fn0s?L=Full+Page" target="_blank" rel="noopener noreferrer" className="w-full">
          <Button className="w-full font-frente font-normal pb-5">PARTICIPAR</Button>
        </a>
      </div>
    </section>
  );
};

export default PropheciesBanner; 