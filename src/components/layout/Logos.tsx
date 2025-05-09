import Image from "next/image";

export default function Logos() {
  return (
    <div className="py-[33px] md:py-[120px]">
      <Image className='w-full md:hidden' src='/footer-sponsors-mobile.png' alt='footer-sponsors-mobile' width={375} height={100} />
      <Image className='w-full hidden md:block max-w-[1080px] mx-auto' src='/footer-sponsors-desktop.png' alt='footer-sponsors-desktop' width={1080} height={100} />
    </div>
  );
}
